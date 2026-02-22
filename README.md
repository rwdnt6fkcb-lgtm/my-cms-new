# My CMS

Moderný CMS (Content Management System) postavený na SvelteKit + SQLite.

## Funkcie

- 📝 Správa článkov (vytváranie, úprava, mazanie)
- 🔒 Zabezpečené admin rozhranie (prihlásenie heslom)
- 🌐 Verejný blog s prehľadom článkov
- 📦 Exportovateľný na externý hosting (Node.js)

## Spustenie lokálne

```bash
npm install
npm run dev
```

Otvor <http://localhost:5173>

Admin prístup: <http://localhost:5173/admin>  
Predvolené heslo: **admin123** (zmeň v nastaveniach po prvom prihlásení)

## Nasadenie (deployment)

```bash
npm run build
ORIGIN=https://vasa-domena.sk npm start
```

`ORIGIN` musí byť nastavené na skutočnú URL webu (napr. `https://moj-blog.sk`).

Vyžaduje Node.js 18+.
