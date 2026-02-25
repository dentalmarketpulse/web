/* Landing (Leaflet + markercluster)
   Data: assets/berlin_dentists_map.json

   Product-like map mode:
   - user enters area/address
   - we geocode via Nominatim
   - show nearest 8–15 clinics around the point
*/

const STRINGS = {
  de: {
    brand: "DentalMarketPulse",
    title: "Wettbewerbsreport für Berliner Zahnärzte",
    subtitle:
      "Monatliche Einblicke zu lokalen Wettbewerbern — Bewertungen, Preis-/Angebotssignale und SEO‑Lücken — plus 5 konkrete Handlungsempfehlungen.",
    cta: "Meinen Praxis-Report anfordern",
    ctaSample: "Muster-Beispiel ansehen",
    ctaSampleLink: "report/samples/sample-report-de.html",
    ctaPrefill: "Ich hätte gern einen individuellen Wettbewerbsreport für meine Praxis.",
    badges: ["Öffentliche Daten", "Berlin-fokussiert", "5-Punkte-Plan"],

    whatTitle: "Ihr Vorteil",
    what: [
      "Wettbewerbsübersicht: 10–15 relevante Praxen in Ihrem direkten Umfeld",
      "Trend-Analyse: Wo gewinnen oder verlieren Wettbewerber gerade Patienten?",
      "Markt-Signale: Preisänderungen und neue Leistungsangebote frühzeitig erkennen",
      "SEO-Check: Bei welchen Suchbegriffen Ihre Konkurrenz besser rankt",
      "Monatlicher Handlungsplan: 5 konkrete Maßnahmen für Ihr Praxisteam",
    ],

    mapTitle: "Wettbewerbs-Landkarte (Berlin)",
    mapHint:
      "Tipp: Geben Sie Ihren Bezirk ein, um die Wettbewerbsdichte zu analysieren.",
    mapSearchPlaceholder: "z.B. Prenzlauer Berg, Friedrichstraße 123",
    mapSearchBtn: "Suchen",
    mapShowAllBtn: "Alle anzeigen",
    mapStatusAll: (n) => `Alle Punkte: ${n}`,
    mapStatusNearest: (k, q) => `Zeige ${k} nächste Praxen zu: ${q}`,
    mapStatusError: "Adresse nicht gefunden. Bitte präziser versuchen.",

    countLabel: "Praxen auf der Karte",

    pricingTitle: "Preise",
    pricePilotName: "Pilotmonat",
    pricePilotValue: "99 €",
    pricePilotDesc: "Erster individueller Report (3–5 Werktage) + Strategie-Gespräch.",
    priceOngoingName: "Monatliches Monitoring",
    priceOngoingValue: "ab 149 €",
    priceOngoingDesc: "Laufende Überwachung von 15 Wettbewerbern + Alarm-System.",
    pricingCta: "Meinen Praxis-Report anfordern",

    faqTitle: "Häufige Fragen",
    faq: [
      {
        q: "Was genau enthält der Report?",
        a: "Eine detaillierte Analyse von 10–15 direkten Wettbewerbern in Ihrem Einzugsgebiet: Bewertungsentwicklung, Sichtbarkeit bei Google (SEO), sowie Änderungen im Leistungsangebot.",
      },
      { q: "Wie aktuell sind die Daten?", a: "Wir scannen monatlich neu. Sie erhalten jeden Monat ein Update zu Veränderungen der letzten 30 Tage, damit Sie sofort reagieren können." },
      { q: "Welchen Aufwand habe ich damit?", a: "Keinen. Wir arbeiten ausschließlich mit öffentlich verfügbaren Marktdaten. Es ist kein Zugriff auf Ihre internen Systeme oder Patientendaten nötig." },
    ],

    formNote:
      "Unverbindliche Anfrage. Wir melden uns zur Abstimmung des Analyse-Umfangs.",
    formAlert: "Vielen Dank. Wir haben Ihre Anfrage erhalten und melden uns in Kürze.",
    formTitle: "Kostenlosen Erst-Check anfordern",
    form: {
      clinic: "Name der Praxis",
      website: "Webseite (optional)",
      area: "Stadtteil / Bezirk",
      email: "Ihre E‑Mail-Adresse",
      notes: "Besonderer Fokus? (z.B. Implantologie, KFO...)",
      send: "Anfrage absenden",
    },

    legal:
      "Hinweis: Wir nutzen ausschließlich öffentliche Informationen. OpenStreetMap-Karte © OpenStreetMap-Mitwirkende.",
  },

  en: {
    brand: "DentalMarketPulse",
    title: "Berlin Dentist Competitor Intelligence Report",
    subtitle:
      "Monthly insights on nearby clinics — reviews, pricing signals, and SEO gaps — with a 5‑point action list.",
    cta: "Request My Practice Report",
    ctaSample: "View Sample Example",
    ctaSampleLink: "report/samples/sample-report.html",
    ctaPrefill: "I’d like a custom competitor report for my clinic.",
    badges: ["Public Data", "Berlin-focused", "5-Point Plan"],

    whatTitle: "Your Advantage",
    what: [
      "Competitor Overview: 10–15 relevant clinics in your immediate area",
      "Trend Analysis: Where are competitors winning or losing patients right now?",
      "Market Signals: Detect pricing changes and new service offerings early",
      "SEO Check: Which keywords your competitors rank better for",
      "Monthly Action Plan: 5 concrete measures for your practice team",
    ],

    mapTitle: "Competitor Density (Berlin)",
    mapHint: "Tip: Enter your district to analyze competitor density.",
    mapSearchPlaceholder: "e.g. Prenzlauer Berg, Friedrichstraße 123",
    mapSearchBtn: "Analyze",
    mapShowAllBtn: "Show all",
    mapStatusAll: (n) => `Total clinics: ${n}`,
    mapStatusNearest: (k, q) => `Showing ${k} nearest clinics to: ${q}`,
    mapStatusError: "Address not found. Please try a more specific location.",

    countLabel: "clinics mapped",

    pricingTitle: "Pricing",
    pricePilotName: "Pilot Month",
    pricePilotValue: "€99",
    pricePilotDesc: "First custom report (3–5 business days) + Strategy Call.",
    priceOngoingName: "Monthly Monitoring",
    priceOngoingValue: "from €149",
    priceOngoingDesc: "Ongoing tracking of 15 competitors + Alert System.",
    pricingCta: "Request My Practice Report",

    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        q: "What exactly is in the report?",
        a: "A detailed analysis of 10–15 direct competitors in your catchment area: rating velocity, SEO visibility gaps, and service offering shifts.",
      },
      { q: "How fresh is the data?", a: "We scan monthly. You receive an update on changes within the last 30 days so you can react immediately." },
      { q: "What effort is required from me?", a: "None. We work exclusively with publicly available market data. No access to your internal systems or patient data is needed." },
    ],

    formNote:
      "Non-binding request. We will contact you to confirm the analysis scope.",
    formAlert: "Thank you. We have received your request and will be in touch shortly.",
    formTitle: "Request Free Initial Check",
    form: {
      clinic: "Practice Name",
      website: "Website (optional)",
      area: "District / Area",
      email: "Your Email Address",
      notes: "Specific focus? (e.g. Implants, Ortho...)",
      send: "Submit Request",
    },

    legal:
      "Note: We only use public information. OpenStreetMap tiles © OpenStreetMap contributors.",
  },
};

function $(id) {
  return document.getElementById(id);
}

function safeText(id, text) {
  const el = $(id);
  if (el) el.textContent = text;
}

let map;
let cluster;
let currentLang = "de";
let allItems = [];
let focusMarker = null;
let focusCircle = null;

function setLanguage(lang) {
  currentLang = lang;
  const s = STRINGS[lang] || STRINGS.en;
  document.documentElement.lang = lang;

  safeText("brand", s.brand);
  safeText("title", s.title);
  safeText("subtitle", s.subtitle);
  safeText("ctaTop", s.cta);
  safeText("ctaBottom", s.cta);

  const btnSample = $("btnSample");
  if(btnSample && s.ctaSample) {
     btnSample.innerHTML = `<svg style="width:18px;height:18px;margin-right:6px;vertical-align:text-bottom" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg> ${s.ctaSample}`;
     btnSample.href = s.ctaSampleLink;
  }

  safeText("badge1", s.badges[0]);
  safeText("badge2", s.badges[1]);
  safeText("badge3", s.badges[2]);

  safeText("whatTitle", s.whatTitle);
  const ul = $("whatList");
  if (ul) {
    ul.innerHTML = "";
    for (const item of s.what) {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    }
  }

  safeText("mapTitle", s.mapTitle);
  safeText("mapHint", s.mapHint);
  safeText("pointCountLabel", s.countLabel);
  
  const mapQuery = $("mapQuery");
  if (mapQuery) mapQuery.placeholder = s.mapSearchPlaceholder;
  
  safeText("mapSearchBtn", s.mapSearchBtn);
  safeText("mapShowAllBtn", s.mapShowAllBtn);

  safeText("pricingTitle", s.pricingTitle);
  safeText("pricePilotName", s.pricePilotName);
  safeText("pricePilotValue", s.pricePilotValue);
  safeText("pricePilotDesc", s.pricePilotDesc);
  safeText("priceOngoingName", s.priceOngoingName);
  safeText("priceOngoingValue", s.priceOngoingValue);
  safeText("priceOngoingDesc", s.priceOngoingDesc);
  safeText("pricingCta", s.pricingCta);

  safeText("faqTitle", s.faqTitle);
  for (let i = 0; i < 3; i++) {
    safeText("faqQ" + (i + 1), s.faq[i].q);
    safeText("faqA" + (i + 1), s.faq[i].a);
  }

  safeText("formNote", s.formNote);
  safeText("formTitle", s.formTitle);
  safeText("labelClinic", s.form.clinic);
  safeText("labelWebsite", s.form.website);
  safeText("labelArea", s.form.area);
  safeText("labelEmail", s.form.email);
  safeText("labelNotes", s.form.notes);
  safeText("submitBtn", s.form.send);

  safeText("legal", s.legal);

  // buttons
  for (const b of document.querySelectorAll(".lang button")) {
    b.classList.toggle("active", b.dataset.lang === lang);
  }

  // Update status line if already loaded
  updateMapStatusAll();
}

function updateMapStatusAll() {
  const s = STRINGS[currentLang] || STRINGS.en;
  if (!$("mapStatus")) return;
  if (allItems.length) {
    $("mapStatus").textContent = s.mapStatusAll(allItems.length);
  }
}

async function loadPoints() {
  const resp = await fetch("assets/berlin_dentists_map.json", { cache: "no-cache" });
  const data = await resp.json();
  return data;
}

function initMap() {
  if (!$("map")) return;
  
  map = L.map("map", {
    scrollWheelZoom: false,
  }).setView([52.52, 13.405], 11);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
  }).addTo(map);

  cluster = L.markerClusterGroup({
    chunkedLoading: true,
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
  });

  map.addLayer(cluster);

  // Enable scroll zoom after user interacts (prevents annoying page-scroll hijack)
  map.once("focus", () => map.scrollWheelZoom.enable());
  map.on("click", () => map.scrollWheelZoom.enable());
}

function popupHtml(item) {
  const name = escapeHtml(item.name);
  const address = item.address
    ? `<div style="margin-top:6px; color:#b7c3e6">${escapeHtml(item.address)}</div>`
    : "";

  const links = [];
  if (item.website) {
    links.push(
      `<a href="${escapeAttr(item.website)}" target="_blank" rel="noreferrer">Website</a>`
    );
  }
  if (item.gmaps) {
    links.push(
      `<a href="${escapeAttr(item.gmaps)}" target="_blank" rel="noreferrer">Google Maps</a>`
    );
  }

  const linksHtml = links.length
    ? `<div style="margin-top:8px; display:flex; gap:10px; flex-wrap:wrap">${links.join(" ")}</div>`
    : "";

  return `<div style="min-width:220px">
    <div style="font-weight:700">${name}</div>
    ${address}
    ${linksHtml}
  </div>`;
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function escapeAttr(s) {
  return escapeHtml(s);
}

function clearFocus() {
  if (focusMarker) {
    map.removeLayer(focusMarker);
    focusMarker = null;
  }
  if (focusCircle) {
    map.removeLayer(focusCircle);
    focusCircle = null;
  }
}

function renderItems(items) {
  cluster.clearLayers();

  for (const it of items) {
    const m = L.marker([it.lat, it.lon]);
    m.bindPopup(popupHtml(it), { maxWidth: 340 });
    cluster.addLayer(m);
  }

  safeText("pointCount", `${items.length}`);

  if (items.length > 0) {
    const bounds = L.latLngBounds(items.map((x) => [x.lat, x.lon]));
    map.fitBounds(bounds.pad(0.10));
  }
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371.0088;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function nearestItems(items, lat, lon, k = 15) {
  const scored = items
    .map((it) => ({ it, d: haversineKm(lat, lon, it.lat, it.lon) }))
    .sort((a, b) => a.d - b.d);
  return scored.slice(0, k).map((x) => x.it);
}

async function geocodeBerlin(query) {
  // Bias to Berlin using viewbox + bounded
  // viewbox = left,top,right,bottom
  const viewbox = "13.0884,52.6755,13.7612,52.3383";
  const url =
    "https://nominatim.openstreetmap.org/search?" +
    new URLSearchParams({
      format: "json",
      limit: "1",
      q: query,
      bounded: "1",
      viewbox,
    }).toString();

  const resp = await fetch(url, { headers: { Accept: "application/json" } });
  const data = await resp.json();
  if (!data || !data.length) return null;
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
}

async function renderAll() {
  clearFocus();
  renderItems(allItems);
  const s = STRINGS[currentLang] || STRINGS.en;
  safeText("mapStatus", s.mapStatusAll(allItems.length));
}

async function renderNearestTo(query) {
  const s = STRINGS[currentLang] || STRINGS.en;

  const geo = await geocodeBerlin(query);
  if (!geo) {
    safeText("mapStatus", s.mapStatusError);
    return;
  }

  const items = nearestItems(allItems, geo.lat, geo.lon, 15);

  clearFocus();
  focusMarker = L.circleMarker([geo.lat, geo.lon], {
    radius: 8,
    color: "#2dd4bf",
    weight: 2,
    fillColor: "#2dd4bf",
    fillOpacity: 0.35,
  }).addTo(map);

  // Circle radius roughly covering the selected competitors (distance to farthest)
  let maxKm = 0;
  for (const it of items) {
    maxKm = Math.max(maxKm, haversineKm(geo.lat, geo.lon, it.lat, it.lon));
  }
  const radiusMeters = Math.max(1200, maxKm * 1000);
  focusCircle = L.circle([geo.lat, geo.lon], {
    radius: radiusMeters,
    color: "rgba(124,92,255,0.85)",
    weight: 2,
    fillColor: "rgba(124,92,255,0.25)",
    fillOpacity: 0.15,
  }).addTo(map);

  renderItems(items);
  safeText("mapStatus", s.mapStatusNearest(items.length, query));
}

async function renderInitial() {
  const data = await loadPoints();
  allItems = data.items || [];
  await renderAll();
}

function wireLang() {
  for (const b of document.querySelectorAll(".lang button")) {
    b.addEventListener("click", () => setLanguage(b.dataset.lang));
  }
}

function wireCTAs() {
  // Smooth-scroll to form + prefill message when CTAs are clicked
  for (const id of ["ctaTop", "ctaBottom", "pricingCta"]) {
    const el = $(id);
    if (!el) continue;
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const formCard = $("form");
      if (formCard) formCard.scrollIntoView({ behavior: "smooth", block: "center" });

      // Prefill notes section so users can just hit submit
      const notesField = $("notes");
      const s = STRINGS[currentLang] || STRINGS.en;
      if (notesField && !notesField.value) {
        notesField.value = s.ctaPrefill;
      }

      // Focus first field for convenience
      const first = $("clinic");
      if (first) first.focus();
    });
  }
}

function wireMapSearch() {
  const form = $("mapSearchForm");
  const input = $("mapQuery");
  const showAllBtn = $("mapShowAllBtn");
  if (!form || !input || !showAllBtn) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const q = (input.value || "").trim();
    if (!q) return;
    safeText("mapStatus", "…");
    await renderNearestTo(q);
  });

  showAllBtn.addEventListener("click", async () => {
    await renderAll();
  });
}

async function postToFormspree(endpoint, payload) {
  // Send as form-encoded (FormData) — more compatible with Formspree endpoints
  const form = new FormData();
  for (const k of Object.keys(payload)) form.append(k, payload[k]);
  try {
    const resp = await fetch(endpoint, {
      method: "POST",
      body: form,
      headers: { Accept: "application/json" },
    });
    return resp.ok;
  } catch (err) {
    return false;
  }
}

function wireForm() {
  const form = $("leadForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const s = STRINGS[currentLang] || STRINGS.en;

    const payload = {
      clinic: $("clinic").value,
      website: $("website").value,
      area: $("area").value,
      email: $("email").value,
      notes: $("notes").value,
      lang: currentLang,
      ts: new Date().toISOString(),
    };

    const endpoint = form.dataset.formEndpoint || "";

    // 1) Prefer Formspree if configured
    if (endpoint) {
      const ok = await postToFormspree(endpoint, payload);
      if (ok) {
        // show modal confirmation
        showConfirmation(s.formAlert);
        form.reset();
        return;
      }
    }

    // 2) Fallback: mailto (no setup needed)
    const to = form.dataset.mailto || "";
    const subject = encodeURIComponent("Sample report request — DentalMarketPulse");
    const body = encodeURIComponent(
      [
        `Clinic: ${payload.clinic}`,
        `Website: ${payload.website}`,
        `Area: ${payload.area}`,
        `Email: ${payload.email}`,
        `Notes: ${payload.notes}`,
      ].join("\n")
    );

    if (to) {
      // localized mailto fallback message
      const fallbackMsg = currentLang === 'de'
        ? 'Kein direkter Server erreichbar — es öffnet sich Ihr E‑Mail-Client.'
        : "No direct server reachable — your mail client will open.";
      showConfirmation(fallbackMsg);
      setTimeout(() => {
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      }, 700);
    } else {
      showConfirmation(s.formAlert);
    }
  });
}

function showConfirmation(message) {
  const modal = $("confirmModal");
  if (!modal) return;
  safeText("modalTitle", message);
  safeText("modalBody", "Wir melden uns in Kürze per E‑Mail mit einem Beispielreport.");
  modal.setAttribute("aria-hidden", "false");

  const close = $("modalClose");
  const ok = $("modalOk");
  function hide() {
    modal.setAttribute("aria-hidden", "true");
    close.removeEventListener("click", hide);
    ok.removeEventListener("click", hide);
  }
  close.addEventListener("click", hide);
  ok.addEventListener("click", hide);
}

window.addEventListener("DOMContentLoaded", async () => {
  wireLang();
  wireCTAs();
  wireMapSearch();
  wireForm();
  setLanguage("de");
  initMap();
  await renderInitial();
});
