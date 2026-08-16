# TSARANORO VALLEY GUIDE — version nettoyée

## Fichiers
- `index.html` : site public
- `admin.html` : administration
- `app.js` / `admin.js` : fonctionnement
- `style.css` : design responsive
- `assets/` : images et favicon
- `404.html`, `robots.txt`, `sitemap.xml`, `netlify.toml` : publication

## Test local
Ne pas ouvrir `index.html` depuis WinRAR ou avec `file:///`.
1. Extraire tout le dossier.
2. Ouvrir le dossier dans VS Code.
3. Lancer un serveur local (Live Server, ou `python -m http.server`).
4. Ouvrir l'adresse `http://localhost:...`.

## Publication
Le dossier peut être déployé comme site statique sur Netlify, Cloudflare Pages ou GitHub Pages.

## Administration
Adresse après publication : `/admin.html`.

⚠️ Cette version conserve le fonctionnement localStorage de l'ancien projet. Les réservations enregistrées dans l'Admin sont donc locales au navigateur. Le bouton WhatsApp ouvre la demande de réservation sur le numéro configuré. Pour que les réservations de tous les visiteurs arrivent dans un même tableau Admin depuis Internet, il faut connecter une base de données/authentification serveur (par exemple Supabase) et configurer ses règles de sécurité. Un mot de passe écrit dans un JavaScript statique ne constitue pas une authentification serveur sécurisée.

## Numéro WhatsApp
Le projet utilise le numéro `+261345919532`. À remplacer dans `app.js` si nécessaire.

## Après publication
Remplacer l'adresse fictive `https://YOUR-DOMAIN.example/` dans `sitemap.xml` par le vrai domaine, puis soumettre le sitemap à Google Search Console.
