// Sliders on the experience page (one per service). Each slider is fully independent:
// its own buttons, bullets, auto-advance timer and videos.
$('.slider').each(function () {
  var $this = $(this);
  var $group = $this.find('.slide_group');
  var $slides = $this.find('.slide');
  var $videos = $this.find('video');
  // The controls (arrows + bullets) are the sibling .Controllers block right after the slider.
  var $controls = $this.next('.Controllers');
  var $bulletHolder = $controls.find('.slide_buttons');
  var bulletArray = [];

  var currentIndex = 0;
  var timeout = null;
  var delay = 5000;
  var videoPlaying = false;

  function pauseVideos() {
    $videos.each(function () {
      if (!this.paused) this.pause();
    });
  }

  function move(newIndex) {
    var animateLeft, slideLeft;

    if ($group.is(':animated') || currentIndex === newIndex) {
      advance();
      return;
    }

    pauseVideos();

    bulletArray[currentIndex].removeClass('active');
    bulletArray[newIndex].addClass('active');

    if (newIndex > currentIndex) {
      slideLeft = '100%';
      animateLeft = '-100%';
    } else {
      slideLeft = '-100%';
      animateLeft = '100%';
    }

    $slides.eq(newIndex).css({ display: 'block', left: slideLeft });
    $group.animate({ left: animateLeft }, function () {
      $slides.eq(currentIndex).css({ display: 'none' });
      $slides.eq(newIndex).css({ left: 0 });
      $group.css({ left: 0 });
      currentIndex = newIndex;
      advance();
    });
  }

  function next() {
    move(currentIndex < $slides.length - 1 ? currentIndex + 1 : 0);
  }

  function previous() {
    move(currentIndex !== 0 ? currentIndex - 1 : $slides.length - 1);
  }

  function stop() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  }

  // Auto-advance, unless a video of this slider is playing.
  function advance() {
    stop();
    if (videoPlaying) return;
    timeout = setTimeout(next, delay);
  }

  $videos.on('play', function () {
    videoPlaying = true;
    stop();
  });
  $videos.on('pause ended', function () {
    videoPlaying = false;
    advance();
  });

  $controls.find('.next_btn').on('click', next);
  $controls.find('.previous_btn').on('click', previous);

  $slides.each(function (index) {
    var $button = $('<a class="slide_btn" role="button"> &bull;</a>');
    $button.attr('aria-label', 'Diapositive ' + (index + 1));
    if (index === currentIndex) {
      $button.addClass('active');
    }
    $button.on('click', function () {
      move(index);
    }).appendTo($bulletHolder);
    bulletArray.push($button);
  });

  advance();
});
