# Changelog

## 2026-10-18 – Corrections et améliorations

Aucun changement de technologie : le site reste en HTML, CSS et JavaScript purs.

### Corrections

* **Couleurs invalides** : `hsl(var(--clr-x))` était utilisé avec des variables hexadécimales,
  ce qui rendait invisibles les bordures des cartes de l'accueil, les lignes de titre, la barre
  de défilement et plusieurs couleurs du pied de page. Remplacé par `var(--clr-x)`.
* **Diaporamas de la page Expériences** : les flèches et les puces d'un diaporama pilotaient
  tous les diaporamas de la page en même temps, le bouton « précédent » revenait toujours à la
  4ᵉ diapositive, et le défilement automatique continuait pendant la lecture d'une vidéo.
  Chaque diaporama est maintenant indépendant et se met en pause quand une vidéo joue.
* **Bascule de thème** : le script plantait sur les pages sans diaporama (`experience.html`,
  `service_offer.html`) et n'était pas chargé sur l'accueil. Le choix clair / sombre est
  désormais mémorisé (`localStorage`) et appliqué sur toutes les pages.
* **Galeries de la page Événements** : la direction d'affichage (`row-reverse`) n'était jamais
  réinitialisée après un retour en arrière.
* **Page À propos** : titre de l'onglet « Event » corrigé, attribut `tab-index` → `tabindex`,
  balise `<P>` → `<p>`, classe inexistante `fs-450` → `fs-500`, la cellule communication était
  titrée « cellule de prospection », et le texte animé affichait « nous some ? » au lieu de
  « sommes-nous ? ».
* **Références cassées** : `js/ech.js` (404) et un fichier vide `path/to/font-awesome/...`
  supprimés ; l'icône du thème était chargée depuis un site externe (uplooder.net), elle est
  maintenant locale.
* **Barre de navigation fixe** : l'espace réservé prend la vraie hauteur de la barre, la page ne
  saute plus au moment où la barre devient fixe. Le menu mobile se ferme après un clic sur un
  lien, en cliquant à côté ou avec la touche Échap.
* `service_offer.html` : lien actif du pied de page corrigé ; déclarations CSS invalides
  (`#000 5`, `#000 9`, transform dupliqué) nettoyées ; `width: 100vw` remplacé par `100%` pour
  éviter le débordement horizontal.

### Performances

* Images des galeries et icônes en `loading="lazy"` + `decoding="async"`.
* Les 10 vidéos de démonstration (≈190 Mo) ne sont plus préchargées : `preload="metadata"`.
* Script GSAP (≈70 Ko) chargé mais jamais utilisé : retiré.
* `preconnect` vers Google Fonts, gestion du défilement via `requestAnimationFrame` et écouteurs
  passifs.

### Animations

* Les animations décoratives (cube 3D des événements, plateforme de la page À propos, prisme des
  expériences, image flottante des services, circuit dessiné du pied de page) sont **mises en pause
  dès qu'elles sortent de l'écran** (`IntersectionObserver` + `animation-play-state`). Sur la page
  Événements, on passe d'environ 300 animations actives à 1 une fois le cube hors de vue.
* Sur mobile, les ~50 ombres floutées animées du cube 3D ne sont plus floutées (`filter: blur`
  animé est le coût GPU le plus élevé de tout le site) ; le cube lui-même reste identique.
* Les effets de survol (soulignement du menu, barres blanches des boutons, menu latéral mobile)
  animent désormais `transform` au lieu de `width`, `left` et `height`, ce qui évite un recalcul de
  mise en page à chaque image.
* Le prisme de la page Expériences n'utilise plus `filter: brightness()` sur 144 faces 3D : une
  superposition sombre statique donne le même rendu sans passe GPU supplémentaire.
* Les `transition: all` sont remplacées par des transitions ciblées (`color`, `opacity`,
  `transform`).

### Interface

* Lignes de titre : la règle `.line` n'était chargée que sur l'accueil ; elle est maintenant
  partagée (visible sur Offres & services).
* Boutons : texte toujours blanc sur rouge (il devenait noir en thème clair), largeur fluide,
  boutons du hero plus grands. Les boutons morts « brochure » / « site de l'événement » mènent
  maintenant vers les expériences, la page Facebook (événements) et le contact.
* Navigation et pied de page entièrement en français (« Offres & services », « Événements »,
  « À propos ») ; fautes corrigées (« les métiers du futur », « Étude de marché », « par an »…).
* Images des galeries sans déformation (`object-fit`), hero qui se fond dans la page au lieu
  d'une coupure nette, titre « Qui sommes-nous ? » qui ne déborde plus sur mobile.
* Menu mobile opaque avec liens plus grands ; ancres non masquées par la barre fixe.
* Cartes et garanties réagissent au survol ; apparition progressive des sections au défilement
  (sans JavaScript, tout reste visible).
* Barre de copyright en pied de page, page `404.html` personnalisée pour GitHub Pages.

### Améliorations

* Le bouton « Contactez-nous » ouvre un e-mail ; e-mail et téléphone du pied de page cliquables ;
  « lancez-vous » mène aux offres.
* `lang="fr"`, `<meta name="description">`, `theme-color` et favicon sur chaque page.
* Accessibilité : bouton de menu et de thème utilisables au clavier (`role`, `tabindex`,
  `aria-*`), styles `:focus-visible`, textes alternatifs descriptifs, liens sociaux avec
  `rel="noopener"`.
* Cartes retournables de la page À propos utilisables au toucher.
* README complet (pages, structure, lancement, déploiement, équipe) et ce changelog.
