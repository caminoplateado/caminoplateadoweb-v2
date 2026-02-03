(function () {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const t of document.querySelectorAll('link[rel="modulepreload"]')) i(t);
    new MutationObserver(t => {
        for (const o of t)
            if (o.type === "childList")
                for (const s of o.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && i(s)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function r(t) {
        const o = {};
        return t.integrity && (o.integrity = t.integrity), t.referrerPolicy && (o.referrerPolicy = t.referrerPolicy), t.crossOrigin === "use-credentials" ? o.credentials = "include" : t.crossOrigin === "anonymous" ? o.credentials = "omit" : o.credentials = "same-origin", o
    }

    function i(t) {
        if (t.ep) return;
        t.ep = !0;
        const o = r(t);
        fetch(t.href, o)
    }
})();
const p = [{
        id: 1,
        titulo: "Distribución Demográfica Regional",
        tipo: "mapa",
        descripcion: "Mapa interactivo sobre la densidad de población +50 en centros urbanos.",
        miniatura: "assets/thumb-mapa.jpg",
        url: "/assets/placeholder-mapa.html"
    }, {
        id: 2,
        titulo: "Tablero de Consumo Silver",
        tipo: "bi",
        descripcion: "Dashboard de Power BI con participación de consumo por sectores.",
        miniatura: "assets/thumb-bi.jpg",
        url: "/assets/placeholder-bi.html"
    }, {
        id: 3,
        titulo: "Informe: Ciudades Amigables",
        tipo: "pdf",
        descripcion: "Análisis de infraestructura en los 3 casos testigo analizados.",
        miniatura: "assets/thumb-pdf.jpg",
        url: "assets/camino_plateado_financiero_pba.pdf"
    }],
    a = (n, e = document) => e.querySelector(n);

    function f(n) {
        try {
          if (n.startsWith("http://") || n.startsWith("https://")) {
            return n;
          }
          return new URL(n, window.location.href).toString();
        } catch {
          return "about:blank";
        }
    }

function b() {
    const n = a("#resource-grid");
    if (!n) return;
    n.textContent = "";
    const e = document.createDocumentFragment();
    for (const r of p) {
        const i = document.createElement("div");
        i.className = "group cursor-pointer", i.dataset.resourceId = String(r.id), i.setAttribute("role", "button"), i.setAttribute("tabindex", "0"), i.setAttribute("aria-label", `Abrir: ${r.titulo}`);
        const t = document.createElement("div");
        t.className = "relative overflow-hidden rounded-lg aspect-video mb-4";
        const o = document.createElement("img");
        o.src = r.miniatura, o.alt = r.titulo, o.loading = "lazy", o.decoding = "async", o.className = "w-full h-full object-cover group-hover:scale-105 transition duration-500";
        const s = document.createElement("div");
        s.className = "absolute inset-0 bg-brandBlue/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center";
        const c = document.createElement("span");
        c.className = "bg-white text-brandDark px-4 py-2 rounded text-sm font-bold", c.textContent = "ABRIR", s.appendChild(c), t.appendChild(o), t.appendChild(s);
        const d = document.createElement("h4");
        d.className = "font-bold mb-1", d.textContent = r.titulo;
        const l = document.createElement("p");
        l.className = "text-sm text-gray-400", l.textContent = r.descripcion, i.appendChild(t), i.appendChild(d), i.appendChild(l), e.appendChild(i)
    }
    n.appendChild(e)
}

function m(n) {
    const e = p.find(c => c.id === n);
    if (!e) return;
    const r = a("#modal-container"),
        i = a("#modal-body"),
        t = a("#modal-title");
    if (!r || !i || !t) return;
    t.textContent = e.titulo, i.textContent = "";
    const o = document.createElement("iframe");
    o.className = "w-full h-full border-0", o.src = f(e.url), o.loading = "lazy", e.tipo !== "pdf" && o.setAttribute("allowfullscreen", ""), i.appendChild(o), r.classList.remove("hidden");
    const s = a("#modal-close");
    s && s.focus()
}

function u() {
    const n = a("#modal-container"),
        e = a("#modal-body");
    !n || !e || (n.classList.add("hidden"), e.textContent = "")
}

function g() {
    const n = a("#modal-overlay"),
        e = a("#modal-close");
    n == null || n.addEventListener("click", u), e == null || e.addEventListener("click", u), document.addEventListener("keydown", r => {
        r.key === "Escape" && u()
    })
}

function h() {
    const n = a("#mobile-menu-open"),
        e = a("#mobile-menu-close"),
        r = a("#mobile-menu");
    if (!n || !e || !r) return;
    const i = () => {
            r.classList.remove("hidden"), n.setAttribute("aria-expanded", "true")
        },
        t = () => {
            r.classList.add("hidden"), n.setAttribute("aria-expanded", "false")
        };
    n.addEventListener("click", () => {
        n.getAttribute("aria-expanded") === "true" ? t() : i()
    }), e.addEventListener("click", t), r.addEventListener("click", o => {
        const s = o.target;
        s instanceof HTMLElement && s.tagName.toLowerCase() === "a" && t()
    })
}

function y() {
    const n = a("#resource-grid");
    n && (n.addEventListener("click", e => {
        const r = e.target;
        if (!(r instanceof HTMLElement)) return;
        const i = r.closest("[data-resource-id]");
        if (!(i instanceof HTMLElement)) return;
        const t = Number(i.dataset.resourceId);
        Number.isFinite(t) && m(t)
    }), n.addEventListener("keydown", e => {
        const r = e.target;
        if (!(r instanceof HTMLElement) || e.key !== "Enter" && e.key !== " ") return;
        const i = r.closest("[data-resource-id]");
        if (!(i instanceof HTMLElement)) return;
        e.preventDefault();
        const t = Number(i.dataset.resourceId);
        Number.isFinite(t) && m(t)
    }))
}
document.addEventListener("DOMContentLoaded", () => {
    b(), y(), g(), h()
});