# JEEF – Site officiel de la Junior Entreprise ENSA Fès

Site vitrine de **JEEF** (Junior Entreprise ENSA Fès), notre start-up étudiante qui réalise des
projets logiciels et matériels pour des entreprises et des administrations : développement web,
applications mobiles, UI/UX design, études de marché et product design.

Le site est écrit **uniquement en HTML, CSS et JavaScript** (pas de framework, pas de build) et
est hébergé sur GitHub Pages :

**https://benisalla.github.io/jeef-website/**

---

## Pages

| Page | Fichier | Contenu |
|------|---------|---------|
| Accueil | `index.html` | Vidéo d'accueil, présentation de la JE, chiffres clés, garanties, méthode de travail |
| Offres et services | `service_offer.html` | Les 5 prestations proposées |
| Expériences | `experience.html` | Réalisations par prestation, avec des diaporamas d'images et de vidéos |
| Événements | `event.html` | Les événements organisés par la JEEF, avec galeries photos |
| À propos | `about.html` | La CJEM, qui sommes-nous, et les cellules (formation, événement, prospection, innovation, communication) |
| Splash | `splash.html` | Animation du logo (page autonome) |
| 404 | `404.html` | Page « introuvable » servie par GitHub Pages |
| Design system | `system-design.html` | Palette de couleurs et typographie utilisées par le site (page interne) |

Chaque page partage la même barre de navigation (responsive, menu latéral sur mobile), le même
pied de page et un bouton de bascule clair / sombre (le choix est mémorisé entre les pages).

## Structure du projet

```
.
├── index.html, about.html, event.html, experience.html, service_offer.html
├── splash.html, system-design.html
├── styles/
│   ├── style.css              # variables, reset, utilitaires, nav bar, thème, composants partagés
│   ├── home.styles.css        # page d'accueil
│   ├── event.style.css        # page événements (cube animé, galeries)
│   ├── experiences.style.css  # page expériences (prisme animé, diaporamas)
│   ├── service.style.css      # offres & services + pied de page
│   └── splash.style.css
├── js/
│   ├── navBar.js              # menu mobile + barre de navigation fixe au défilement
│   ├── index.js               # thème clair/sombre (persisté) + diaporamas de la page événements
│   ├── experiences.js         # diaporamas image/vidéo de la page expériences (jQuery)
│   └── about.js               # effet "machine à écrire" + cartes retournables sur mobile
├── img/                       # images, icônes, favicon
├── video/                     # vidéo d'accueil et vidéos de démonstration
└── font-awesome/              # Font Awesome 4 (local)
```

Dépendances externes chargées par CDN : Google Fonts (Poppins, Roboto), Font Awesome 6
(page À propos) et jQuery 2.1.3 (page Expériences).

## Lancer le site en local

Aucune installation n'est nécessaire. Ouvrez simplement `index.html` dans un navigateur, ou servez
le dossier avec un petit serveur statique pour que les vidéos se chargent correctement :

```bash
git clone https://github.com/benisalla/jeef-website.git
cd jeef-website
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Déploiement

Le site est publié automatiquement par GitHub Pages depuis la racine de la branche `master`.
Tout commit poussé sur `master` est en ligne quelques minutes plus tard.

## Design

* Couleurs : rouge principal `#f54d4d`, bleu secondaire `#37a9e1`, fond dégradé `#1b212c → #1f2153`.
  Toutes les couleurs sont des variables CSS (`--clr-*`) définies dans `styles/style.css` et
  redéfinies par `js/index.js` pour le thème clair.
* Typographie : Poppins pour les titres, Roboto pour le texte. Les tailles sont des variables
  (`--fs-200` à `--fs-900`) adaptées par media queries.
* La page `system-design.html` sert de référence visuelle.

## Équipe

Ce site a été conçu et développé par l'équipe de JEEF :

* **Ayoube Algharass**
* **Mohamed Ahbari**
* **Bilal El Badaoui**
* **Houssam El Biade**
* **Ismail Ben Alla** – [@benisalla](https://github.com/benisalla)

Contact : houssam.jeef@gmail.com · [Facebook](https://www.facebook.com/JEEF.OFF) ·
[LinkedIn](https://www.linkedin.com/company/junior-entreprise-ensa-fes/) ·
[Instagram](https://www.instagram.com/jeef.off/)

## Historique

Voir [CHANGELOG.md](CHANGELOG.md).
