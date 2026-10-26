# মেসার্স রাহাত নিয়ম ট্রেডার্স — Website

Static website for **M/S Rahat Niom Traders**, a hardware shop at Burirhat Montur Mil, Rangpur 5400, Bangladesh.
Plain HTML/CSS/JS with no build step. It is ready for GitHub Pages.

## Structure

```
index.html           page content (Bangla)
assets/css/style.css styles (mobile-first)
assets/js/main.js    menu, WhatsApp links, gallery lightbox, scroll effects
assets/img/          optimized WebP photos, favicon, social preview image
photo/               original photos (not used by the site)
```

## Publish on GitHub Pages

1. Create a new repository on GitHub, e.g. `rahat-niom-traders`.
2. Push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/rahat-niom-traders.git
   git push -u origin main
   ```
3. On GitHub, open **Settings → Pages**, set **Source** to *Deploy from a branch*, and choose branch `main` and folder `/ (root)`.
4. After a minute the site will be live at `https://<your-username>.github.io/rahat-niom-traders/`.

After the site is live, change the `og:image` meta tag in `index.html` to the full URL
(`https://<your-username>.github.io/rahat-niom-traders/assets/img/og-image.jpg`) so Facebook and WhatsApp link previews show the shop photo.

## Editing

- **Phone / WhatsApp:** search `8801311851315` in `index.html` and `assets/js/main.js`.
- **Products:** each category is an `<article class="cat-card">` block in `index.html`.
- **New photos:** add them to `assets/img/` (WebP or JPG, about 1000px wide) and reference them in `index.html`.

## Credits

Mini fan photo: “Kipas portable”, Wikimedia Commons, CC BY-SA 4.0.
