# AutomatorLabs Landing Page

A clean static landing page for AutomatorLabs, a catalog of downloadable offline desktop utility apps.

This is a plain HTML, CSS, and JavaScript project. There is no backend, no React, no build step, no login, and no payment integration in this v1.

## Folder structure

```text
AutomatorLabs Landing Page/
├── index.html
├── success.html
├── styles.css
├── script.js
├── products.json
├── README.md
├── assets/
│   ├── icons/
│   ├── thumbnails/
│   └── screenshots/
```

## How products.json works

Product cards are not hardcoded in `index.html`.

`products.json` stores the catalog data. `script.js` loads that JSON file and dynamically renders the product cards inside the Tools section.

Each product includes:

- `id`
- `name`
- `slug`
- `tagline`
- `description`
- `category`
- `platform`
- `price`
- `bundleEligible`
- `status`
- `icon`
- `thumbnail`
- `screenshot`
- `features`
- `links.gumroad`
- `links.itch`
- `links.github`

Product cards are generated from this data. The current media area uses the PNG `icon` to render an animated icon stage. The `Buy Now` button points to `links.gumroad`. `links.itch` and `links.github` stay in the data for future or backup use, but they are not shown on the main product cards.

Placeholder links can use `"#"` or an empty string. The page will show those actions as disabled.

Icons should use PNG assets in `assets/icons`.

## How to add a new product

1. Add a PNG icon to `assets/icons`.
2. Add artwork files to `assets/thumbnails` and `assets/screenshots`.
3. Open `products.json`.
4. Copy one existing product object.
5. Change the product fields, feature list, asset paths, Gumroad checkout link, and backup links.
6. Save the file and refresh the page.

No HTML changes are needed for new product cards.

## How to preview locally

You can try opening `index.html` directly in a browser.

Some browsers block `fetch("products.json")` when viewing files from `file://`. If that happens, the page uses the fallback product data inside `script.js` and shows a small notice below the catalog.

For the closest Netlify-style preview, run a tiny local server from this folder:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## How to deploy on Netlify

1. Push this folder to a GitHub repository.
2. In Netlify, create a new site from that repository.
3. Leave the build command empty.
4. Set the publish directory to the project root.
5. Deploy.

Because this is a static site, Netlify can serve it directly.

## Checkout

Gumroad is currently used for checkout. The main sales flow is:

```text
Landing page -> Buy Now -> Gumroad checkout
```

Stripe or direct checkout may be added later, but this v1 has no backend, cart, login, or payment code.

## Newsletter

The newsletter form uses Netlify Forms:

```html
<form name="newsletter" method="POST" data-netlify="true" class="newsletter-form">
```

It is static HTML and does not need a backend in this project. Form submissions only work after the site is deployed on Netlify with form detection enabled. When previewing locally, the form markup appears normally, but submissions will not be collected.

Successful newsletter submissions redirect to `success.html`, a custom branded thank-you page.

## Future automation plan

1. Each app gets its own `product.json`.
2. A sync script merges all product metadata.
3. The landing page updates `products.json`.
4. A GitHub push triggers Netlify auto-deploy.
