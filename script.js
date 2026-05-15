const productGrid = document.querySelector("#product-grid");
const catalogNote = document.querySelector("#catalog-note");
let demoViewer;
let lastDemoTrigger;

// Update product data in products.json. This fallback only appears when a
// browser blocks local fetches from file:// or the JSON file is unavailable.
const fallbackProducts = [
  {
    id: "bulk-file-renamer",
    name: "Bulk File Renamer",
    slug: "bulk-file-renamer",
    tagline: "Rename folders full of files in one clean pass.",
    description: "Rename many files at once with simple offline rules.",
    category: "File Utility",
    platform: "macOS",
    price: "$5",
    bundleEligible: true,
    status: "Available",
    icon: "assets/icons/bulk-file-renamer.png",
    thumbnail: "assets/icons/bulk-file-renamer.png",
    screenshot: "assets/screenshots/bulk-file-renamer.svg",
    video: "assets/videos/bulk-file-renamer.mp4",
    features: [
      "Batch rename files",
      "Preview before applying changes",
      "Add prefixes and suffixes",
      "Clean messy filenames",
      "Number files automatically",
      "Reorder naming rules",
      "Works offline",
      "No account required"
    ],
    links: {
      gumroad: "#",
      itch: "#",
      github: "#"
    }
  },
  {
    id: "csv-cleaner-toolkit",
    name: "CSV Cleaner Toolkit",
    slug: "csv-cleaner-toolkit",
    tagline: "Clean messy CSVs before upload or analysis.",
    description: "Clean messy CSV files offline before analysis or upload.",
    category: "Data Utility",
    platform: "macOS",
    price: "$5",
    bundleEligible: true,
    status: "Available",
    icon: "assets/icons/csv-cleaner-toolkit.png",
    thumbnail: "assets/icons/csv-cleaner-toolkit.png",
    screenshot: "assets/screenshots/csv-cleaner-toolkit.svg",
    video: "assets/videos/CSV CLEANER.mp4",
    features: [
      "Remove empty rows",
      "Trim whitespace",
      "Remove duplicates",
      "Clean column data",
      "Preview before export",
      "Export cleaned CSV files",
      "Works offline",
      "No account required"
    ],
    links: {
      gumroad: "https://gallonlabs.gumroad.com/l/csv-cleaner-toolkit",
      itch: "https://tinyutilitylab.itch.io/csv-cleaner-toolkit",
      github: "#"
    }
  },
  {
    id: "pdf-split-merge-utility",
    name: "PDF Split Merge Utility",
    slug: "pdf-split-merge-utility",
    tagline: "Merge, split, and organize PDFs locally.",
    description: "Merge, split, and organize PDF files locally on your Mac.",
    category: "Document Utility",
    platform: "macOS",
    price: "$5",
    bundleEligible: true,
    status: "Available",
    icon: "assets/icons/pdf-split-merge-utility.png",
    thumbnail: "assets/icons/pdf-split-merge-utility.png",
    screenshot: "assets/screenshots/pdf-split-merge-utility.svg",
    video: "assets/videos/pdf-split-merge-utility.mp4",
    features: [
      "Merge multiple PDFs",
      "Split PDFs into pages",
      "Split custom page ranges",
      "Reorder PDFs before merging",
      "Drag and drop support",
      "Dark and light mode",
      "Works offline",
      "No account required"
    ],
    links: {
      gumroad: "https://gallonlabs.gumroad.com/l/pdf-split-merge-utility",
      itch: "https://tinyutilitylab.itch.io/pdf-split-merge-utility",
      github: "#"
    }
  }
];

function isUsableLink(url) {
  return Boolean(url && url.trim() && url !== "#");
}

function createAction(label, href, muted = false) {
  const action = document.createElement("a");
  action.textContent = label;
  action.href = isUsableLink(href) ? href : "#";
  action.className = muted ? "button button-link-muted" : "button";

  if (!isUsableLink(href)) {
    action.classList.add("disabled-link");
    action.setAttribute("aria-disabled", "true");
    action.setAttribute("tabindex", "-1");
  } else {
    action.target = "_blank";
    action.rel = "noopener noreferrer";
  }

  return action;
}

function createDemoAction(product) {
  const action = createAction("Watch how it works", product.video, true);

  if (isUsableLink(product.video)) {
    action.removeAttribute("target");
    action.removeAttribute("rel");
    action.dataset.demoVideo = product.video;
    action.dataset.demoTitle = product.name;
  }

  return action;
}

function getDemoViewer() {
  if (demoViewer) {
    return demoViewer;
  }

  demoViewer = document.createElement("section");
  demoViewer.className = "demo-viewer";
  demoViewer.hidden = true;
  demoViewer.innerHTML = `
    <div class="demo-viewer-shell" role="dialog" aria-modal="true" aria-labelledby="demo-title">
      <div class="demo-viewer-top">
        <div>
          <p class="eyebrow">Product demo</p>
          <h2 id="demo-title">Tool demo</h2>
        </div>
        <button class="demo-back-button" type="button">Back to home page</button>
      </div>
      <video class="demo-video" controls playsinline preload="metadata"></video>
    </div>
  `;

  document.body.appendChild(demoViewer);

  demoViewer.querySelector(".demo-back-button").addEventListener("click", closeDemoViewer);
  demoViewer.addEventListener("click", (event) => {
    if (event.target === demoViewer) {
      closeDemoViewer();
    }
  });

  return demoViewer;
}

function openDemoViewer(videoPath, productName) {
  const viewer = getDemoViewer();
  const video = viewer.querySelector(".demo-video");
  const title = viewer.querySelector("#demo-title");

  title.textContent = productName;
  video.src = videoPath;
  viewer.hidden = false;
  document.body.classList.add("demo-open");
  viewer.querySelector(".demo-back-button").focus();
}

function closeDemoViewer() {
  const viewer = getDemoViewer();
  const video = viewer.querySelector(".demo-video");

  video.pause();
  video.removeAttribute("src");
  video.load();
  viewer.hidden = true;
  document.body.classList.remove("demo-open");
  lastDemoTrigger?.focus();
}

function createProductMedia(product) {
  const media = document.createElement("div");
  media.className = "product-media";

  const stage = document.createElement("div");
  stage.className = `animated-icon-stage ${product.id}`;
  stage.innerHTML = `
    <div class="icon-glow"></div>
    <div class="orbit-ring"></div>
    <span class="spark spark-1"></span>
    <span class="spark spark-2"></span>
    <span class="spark spark-3"></span>
  `;

  const icon = document.createElement("img");
  icon.className = "animated-product-icon";
  icon.src = product.icon;
  icon.alt = product.name;

  stage.appendChild(icon);
  media.appendChild(stage);

  return media;
}

function renderProducts(products) {
  productGrid.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const media = createProductMedia(product);

    const body = document.createElement("div");
    body.className = "product-body";

    const meta = document.createElement("div");
    meta.className = "product-meta";
    meta.innerHTML = `
      <span class="badge status">${product.status}</span>
      <span class="badge">${product.platform}</span>
      <span class="badge">${product.category}</span>
    `;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const tagline = document.createElement("p");
    tagline.className = "product-tagline";
    tagline.textContent = product.tagline;

    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.description;

    const features = document.createElement("ul");
    features.className = "feature-list";
    product.features.forEach((feature) => {
      const item = document.createElement("li");
      item.textContent = feature;
      features.appendChild(item);
    });

    const footer = document.createElement("div");
    footer.className = "product-footer";

    const price = document.createElement("div");
    price.className = "price";
    price.textContent = product.price;

    const actions = document.createElement("div");
    actions.className = "card-actions";
    actions.append(
      createAction("I want this!", product.links.gumroad),
      createDemoAction(product)
    );

    footer.append(price, actions);
    body.append(meta, title, tagline, description, features, footer);
    card.append(media, body);
    productGrid.appendChild(card);
  });
}

async function loadProducts() {
  try {
    const response = await fetch("products.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Catalog request failed: ${response.status}`);
    }

    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    catalogNote.hidden = false;
    renderProducts(fallbackProducts);
    console.info("Using fallback product catalog.", error);
  }
}

document.addEventListener("click", (event) => {
  const demoLink = event.target.closest("[data-demo-video]");

  if (!demoLink) {
    return;
  }

  event.preventDefault();
  lastDemoTrigger = demoLink;
  openDemoViewer(demoLink.dataset.demoVideo, demoLink.dataset.demoTitle);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && demoViewer && !demoViewer.hidden) {
    closeDemoViewer();
  }
});

loadProducts();
