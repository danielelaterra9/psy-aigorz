# Sophie Aigroz - Psychologue FSP

Site web statique pour Sophie Aigroz, Psychologue FSP à Saxon, Valais.

## Structure des fichiers

```
/
├── index.html    # Page principale
├── styles.css    # Feuille de style
├── script.js     # JavaScript (interactions)
└── README.md     # Ce fichier
```

## Déploiement sur GitHub Pages

1. Créez un nouveau repository sur GitHub
2. Uploadez les 3 fichiers (index.html, styles.css, script.js)
3. Allez dans **Settings** → **Pages**
4. Sous "Source", sélectionnez **main** branch
5. Cliquez **Save**
6. Votre site sera disponible à `https://[username].github.io/[repo-name]`

## Déploiement sur Infomaniak

1. Connectez-vous à votre compte Infomaniak
2. Allez dans **Hébergement Web**
3. Utilisez le **Gestionnaire de fichiers** ou **FTP**
4. Uploadez les 3 fichiers à la racine de votre hébergement
5. Configurez le domaine `www.psy-aigroz.ch`

## Formulaire de contact

Le formulaire utilise **Formspree** (https://formspree.io) pour envoyer les messages directement à sophie.aigroz@gmail.com.

- ID Formspree: `mykbedbo`
- Les messages arrivent par email
- Aucun serveur backend requis

## Technologies utilisées

- HTML5 sémantique
- CSS3 (variables CSS, flexbox, grid)
- JavaScript vanilla (pas de framework)
- Google Fonts (Playfair Display, Mulish)
- Lucide Icons (CDN)
- Formspree (formulaire de contact)

## Personnalisation

### Modifier les couleurs
Dans `styles.css`, modifiez les variables CSS :
```css
:root {
    --color-accent: #D4A59A;        /* Beige rosé */
    --color-accent-hover: #C99589;  /* Beige rosé foncé */
}
```

### Modifier le formulaire Formspree
Dans `index.html` et `script.js`, remplacez l'URL :
```
https://formspree.io/f/mykbedbo
```

## Support

Site créé avec Emergent Agent.
