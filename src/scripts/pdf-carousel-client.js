// src/scripts/pdf-carousel-client.js
// Browser ESM module for PDF carousel
// Loads pdf.js entirely from CDN for maximum compatibility

const PDFJS_VERSION = "4.4.168";
const PDFJS_CDN = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}`;

// Dynamically load pdf.js from CDN
async function loadPdfJs() {
  if (window.pdfjsLib) return window.pdfjsLib;

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${PDFJS_CDN}/pdf.min.mjs`;
    script.type = "module";
    script.onload = () => {
      // pdf.js exposes itself on window.pdfjsLib when loaded as script
      // But with module, we need to import it differently
      import(`${PDFJS_CDN}/pdf.min.mjs`)
        .then(mod => {
          const pdfjsLib = mod;
          pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_CDN}/pdf.worker.min.mjs`;
          window.pdfjsLib = pdfjsLib;
          resolve(pdfjsLib);
        })
        .catch(reject);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default async function initPdfCarousel(host) {
  const data = host.dataset || {};
  const src = data.src || "";
  const start = parseInt(data.start || "1", 10) || 1;
  let fit = data.fit || "contain";

  const stage = host.querySelector("#stage");
  const canvas = host.querySelector("#pageCanvas");
  if (!stage || !canvas) {
    console.error("[PdfCarousel] missing stage/canvas");
    return;
  }
  const ctx = canvas.getContext("2d");
  const pageNumEl = host.querySelector("#pageNum");
  const pageCountEl = host.querySelector("#pageCount");
  const scrub = host.querySelector("#scrubber");
  const prevBtn = host.querySelector("#prevBtn");
  const nextBtn = host.querySelector("#nextBtn");
  const zoomInBtn = host.querySelector("#zoomIn");
  const zoomOutBtn = host.querySelector("#zoomOut");
  const zoomLabel = host.querySelector("#zoomLabel");
  const fitBtn = host.querySelector("#fitBtn");
  const errorMsg = host.querySelector("#errorMsg");

  let pdfDoc = null;
  let currentPage = start;
  let zoom = 1;
  let rendering = false;
  let pendingPage = null;

  const fitScaleFor = viewport => {
    const r = stage.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return 1;
    switch (fit) {
      case "width":
        return r.width / viewport.width;
      case "height":
        return r.height / viewport.height;
      case "cover":
        return Math.max(r.width / viewport.width, r.height / viewport.height);
      case "contain":
      default:
        return Math.min(r.width / viewport.width, r.height / viewport.height);
    }
  };

  const renderPage = async num => {
    if (!pdfDoc) return;
    if (rendering) {
      pendingPage = num;
      return;
    }
    rendering = true;

    try {
      const page = await pdfDoc.getPage(num);
      const baseVp = page.getViewport({ scale: 1 });
      const scale = fitScaleFor(baseVp) * zoom;
      const vp = page.getViewport({ scale });

      if (vp.width <= 1 || vp.height <= 1) {
        rendering = false;
        return;
      }

      canvas.width = Math.floor(vp.width);
      canvas.height = Math.floor(vp.height);

      const renderContext = { canvasContext: ctx, viewport: vp };
      await page.render(renderContext).promise;

      pageNumEl.textContent = String(num);
      prevBtn.disabled = num <= 1;
      nextBtn.disabled = num >= pdfDoc.numPages;
    } catch (e) {
      console.error("[PdfCarousel] render error:", e);
    }

    rendering = false;
    if (pendingPage !== null) {
      const p = pendingPage;
      pendingPage = null;
      renderPage(p);
    }
  };

  const queueRenderPage = num => {
    if (!pdfDoc) return;
    if (num < 1 || num > pdfDoc.numPages) return;
    currentPage = num;
    scrub.value = String(num);
    renderPage(num);
  };

  const updateZoomLabel = () => {
    zoomLabel.textContent = Math.round(zoom * 100) + "%";
  };

  const init = async () => {
    let pdfjsLib;
    try {
      pdfjsLib = await loadPdfJs();
    } catch (e) {
      console.error("[PdfCarousel] failed to load pdf.js:", e);
      if (errorMsg) errorMsg.style.display = "block";
      return;
    }

    try {
      pdfDoc = await pdfjsLib.getDocument(src).promise;
      if (errorMsg) errorMsg.style.display = "none";
    } catch (e) {
      console.error("[PdfCarousel] getDocument failed for", src, e);
      if (errorMsg) errorMsg.style.display = "block";
      return;
    }

    pageCountEl.textContent = String(pdfDoc.numPages);
    scrub.max = String(pdfDoc.numPages);
    scrub.value = String(Math.min(Math.max(1, start), pdfDoc.numPages));
    currentPage = parseInt(scrub.value, 10);
    updateZoomLabel();
    await renderPage(currentPage);
  };

  // Controls
  prevBtn.addEventListener("click", () => queueRenderPage(currentPage - 1));
  nextBtn.addEventListener("click", () => queueRenderPage(currentPage + 1));
  scrub.addEventListener("input", e =>
    queueRenderPage(parseInt(e.target.value, 10))
  );
  zoomInBtn.addEventListener("click", () => {
    zoom = Math.min(zoom * 1.2, 6);
    updateZoomLabel();
    renderPage(currentPage);
  });
  zoomOutBtn.addEventListener("click", () => {
    zoom = Math.max(zoom / 1.2, 0.2);
    updateZoomLabel();
    renderPage(currentPage);
  });
  fitBtn.addEventListener("click", () => {
    const modes = ["contain", "cover", "width", "height"];
    const idx = modes.indexOf(fit);
    fit = modes[(idx + 1) % modes.length];
    renderPage(currentPage);
  });

  // Keyboard
  window.addEventListener("keydown", e => {
    if (e.key === "ArrowRight" || e.key === "PageDown") {
      e.preventDefault();
      queueRenderPage(currentPage + 1);
    }
    if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      queueRenderPage(currentPage - 1);
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === "+" || e.key === "=")) {
      e.preventDefault();
      zoom = Math.min(zoom * 1.2, 6);
      updateZoomLabel();
      renderPage(currentPage);
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "-") {
      e.preventDefault();
      zoom = Math.max(zoom / 1.2, 0.2);
      updateZoomLabel();
      renderPage(currentPage);
    }
  });

  // Touch swipe
  let startX = 0,
    deltaX = 0;
  stage.addEventListener(
    "touchstart",
    e => {
      startX = e.touches[0].clientX;
      deltaX = 0;
    },
    { passive: true }
  );
  stage.addEventListener(
    "touchmove",
    e => {
      deltaX = e.touches[0].clientX - startX;
    },
    { passive: true }
  );
  stage.addEventListener("touchend", () => {
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) queueRenderPage(currentPage + 1);
      else queueRenderPage(currentPage - 1);
    }
  });

  // Re-render on resize/visibility
  let rAF = null;
  const onResize = () => {
    if (rAF) cancelAnimationFrame(rAF);
    rAF = requestAnimationFrame(() => renderPage(currentPage));
  };
  const ro = new ResizeObserver(onResize);
  ro.observe(stage);
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) renderPage(currentPage);
    });
  });
  io.observe(stage);

  init();
}
