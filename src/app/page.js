"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useMemo, useState } from "react";
import { useMemo, useState } from "react";

import Persen from "./persen";
import InvestmentProjectionCalculator from "./investmentProjectionCalculator";
import BerapaPersen from "./pageBerapaPersen";
import PerubahanPersen from "./perubahanPersen";
import HitungDividenDariJumlahLot from "./pageHitungDividenDariJumlahLot";
import HitungLotDividen from "./pageHitungLotDividen";
import DcaCalculator from "./dcaCalculator";
import IpoAraArbCalculator from "./ipoAraArbCalculator";

const components = {
  Persen,
  PerubahanPersen,
  HitungDividenDariJumlahLot,
  HitungLotDividen,
  BerapaPersen,
};

const toolMeta = {
  Persen: {
    title: "Kalkulator Persentase",
    icon: "📊",
    description: "Hitung X% dari sebuah nilai.",
  },
  PerubahanPersen: {
    title: "Perubahan Persentase",
    icon: "📈",
    description: "Selisih persen dan nominal.",
  },
  HitungDividenDariJumlahLot: {
    title: "Dividen dari Lot",
    icon: "💰",
    description: "Dividen, modal, dan yield.",
  },
  HitungLotDividen: {
    title: "Lot dari Modal",
    icon: "🎯",
    description: "Lot bisa dibeli + dividen.",
  },
  BerapaPersen: {
    title: "Berapa Persen?",
    icon: "🧮",
    description: "Persentase sebuah nilai ke total.",
  },
};

const toolMeta = {
  Persen: {
    title: "Kalkulator Persentase",
    icon: "📊",
    description: "Hitung X% dari sebuah nilai.",
  },
  PerubahanPersen: {
    title: "Perubahan Persentase",
    icon: "📈",
    description: "Selisih persen dan nominal.",
  },
  HitungDividenDariJumlahLot: {
    title: "Dividen dari Lot",
    icon: "💰",
    description: "Dividen, modal, dan yield.",
  },
  HitungLotDividen: {
    title: "Lot dari Modal",
    icon: "🎯",
    description: "Lot bisa dibeli + dividen.",
  },
  BerapaPersen: {
    title: "Berapa Persen?",
    icon: "🧮",
    description: "Persentase sebuah nilai ke total.",
  },
};

const defaultOrder = [
  "Persen",
  "PerubahanPersen",
  "HitungDividenDariJumlahLot",
  "HitungLotDividen",
  "BerapaPersen",
];

const views = [
  { id: "home", label: "Semua alat", icon: "🧰" },
  { id: "projection", label: "Proyeksi Investasi", icon: "📈" },
  { id: "dca", label: "Kalkulator DCA", icon: "📊" },
  { id: "ipo", label: "Kalkulator ARA/ARB", icon: "🧾" },
];

export default function Home() {
  const [activeView, setActiveView] = useState("home");
  const [showQuickPanel, setShowQuickPanel] = useState(false);

  const stats = useMemo(
    () => ({
      totalTools: defaultOrder.length + 2, // + DCA & IPO tools
      quickActions: 3,
    }),
    []
  );
  const [activeView, setActiveView] = useState("home");
  const [showQuickPanel, setShowQuickPanel] = useState(false);

  const stats = useMemo(
    () => ({
      totalTools: defaultOrder.length + 2, // + DCA & IPO tools
      quickActions: 3,
    }),
    []
  );

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="hero-card">
          <div className="hero-head">
            <div>
              <div className="badge-pill">Kalon v2</div>
              <h1 className="hero-title">Kalkulator Investasi</h1>
              <p className="hero-subtitle">
                Alat hitung saham yang cepat, ringkas, dan enak dipakai di mana pun.
              </p>
              {/* <div className="hero-meta">
                <span className="meta-chip">{stats.totalTools} alat siap pakai</span>
                <span className="meta-chip">Nyaman di mobile & desktop</span>
                <span className="meta-chip">Hasil instan tanpa reload</span>
              </div> */}
            </div>
            <div className="hero-actions">
    <div className="app-shell">
      <div className="app-container">
        <header className="hero-card">
          <div className="hero-head">
            <div>
              <div className="badge-pill">Kalon v2</div>
              <h1 className="hero-title">Kalkulator Investasi</h1>
              <p className="hero-subtitle">
                Alat hitung saham yang cepat, ringkas, dan enak dipakai di mana pun.
              </p>
              {/* <div className="hero-meta">
                <span className="meta-chip">{stats.totalTools} alat siap pakai</span>
                <span className="meta-chip">Nyaman di mobile & desktop</span>
                <span className="meta-chip">Hasil instan tanpa reload</span>
              </div> */}
            </div>
            <div className="hero-actions">
              <button
                type="button"
                className="cta-primary"
                onClick={() => setActiveView("home")}
                type="button"
                className="cta-primary"
                onClick={() => setActiveView("home")}
              >
                🚀 Mulai hitung
                🚀 Mulai hitung
              </button>
              <button
                type="button"
                className="cta-ghost"
                onClick={() => setShowQuickPanel(true)}
                type="button"
                className="cta-ghost"
                onClick={() => setShowQuickPanel(true)}
              >
                ⚡ Panel cepat
                ⚡ Panel cepat
              </button>
            </div>
          </div>
        </header>

        <nav className="view-switcher" aria-label="Pilih kategori alat">
          {views.map((view) => (
            <button
              key={view.id}
              type="button"
              className={`view-chip ${activeView === view.id ? "is-active" : ""}`}
              onClick={() => setActiveView(view.id)}
            >
              <span className="view-icon">{view.icon}</span>
              <span>{view.label}</span>
            </button>
          ))}
        </nav>

        <main className="content-grid">
          {activeView === "home" && (
            <div className="tool-grid">
              {defaultOrder.map((key) => {
                const Component = components[key];
                if (!Component) return null;
                return (
                  <section key={key} id={`tool-${key}`} className="tool-card">
                    <div className="tool-card__head">
                      <div className="tool-card__title">
                        <span className="tool-icon">{toolMeta[key]?.icon || "✨"}</span>
                        <div>
                          <h3>{toolMeta[key]?.title || key}</h3>
                          <p>{toolMeta[key]?.description}</p>
                        </div>
                      </div>
                      <div className="pill">Kalkulator</div>
                    </div>
                    <div className="tool-card__body">
                      <Component />
                    </div>
                  </section>
                );
              })}
            </div>
          )}

          {activeView === "dca" && (
            <section className="tool-card tool-card--wide">
              <div className="tool-card__head">
                <div className="tool-card__title">
                  <span className="tool-icon">📊</span>
                  <div>
                    <h3>Kalkulator Dollar Cost Averaging</h3>
                    <p>Lacak pembelian, rata-rata harga, dan total modal tanpa ribet.</p>
                  </div>
                </div>
                <div className="pill pill--accent">DCA</div>
              </div>
              <div className="tool-card__body">
                <DcaCalculator />
              </div>
            </section>
          )}

          {activeView === "ipo" && (
            <section className="tool-card tool-card--wide">
              <div className="tool-card__head">
                <div className="tool-card__title">
                  <span className="tool-icon">🧾</span>
                  <div>
                    <h3>Kalkulator ARA / ARB IPO</h3>
                    <p>Simulasikan skenario ARA/ARB IPO dengan cepat.</p>
                  </div>
                </div>
                <div className="pill pill--accent">IPO</div>
              </div>
              <div className="tool-card__body">
                <IpoAraArbCalculator />
              </div>
            </section>
          )}

          {activeView === "projection" && (
            <section className="tool-card tool-card--wide">
              <div className="tool-card__head">
                <div className="tool-card__title">
                  <span className="tool-icon">📈</span>
                  <div>
                    <h3>Proyeksi Investasi Tahunan</h3>
                    <p>Hitung proyeksi investasi berdasarkan target bunga, reinvest, dan tahun.</p>
                  </div>
                </div>
                <div className="pill pill--accent">Proyeksi</div>
              </div>
              <div className="tool-card__body">
                <InvestmentProjectionCalculator />
              </div>
            </section>
          )}
        </main>
      </div>

      {showQuickPanel && (
        <div className="quick-panel__backdrop" role="presentation">
          <div className="quick-panel card-bibit">
            <div className="quick-panel__head">
              <div>
                <p className="badge-pill">Navigasi cepat</p>
                <h4>Pilih kalkulator</h4>
                <small>Langsung buka alat yang dibutuhkan.</small>
              </div>
              <button
                type="button"
                className="cta-ghost"
                onClick={() => setShowQuickPanel(false)}
              >
                ✕
              </button>
            </div>

            <div className="quick-panel__grid">
              {views.map((view) => (
                <button
                  key={view.id}
                  type="button"
                  className="quick-link"
                  onClick={() => {
                    setActiveView(view.id);
                    setShowQuickPanel(false);
                  }}
                >
                  <span className="quick-link__icon">{view.icon}</span>
                  <div>
                    <strong>{view.label}</strong> <br />
                    <small>Buka tampilan {view.label.toLowerCase()}</small>
                  </div>
                </button>
              ))}

              {defaultOrder.map((key) => (
                <button
                  key={key}
                  type="button"
                  className="quick-link"
                  onClick={() => {
                    setActiveView("home");
                    setShowQuickPanel(false);
                    const el = document?.querySelector(`#tool-${key}`);
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }}
                >
                  <span className="quick-link__icon">{toolMeta[key]?.icon || "✨"}</span>
                  <div>
                    <strong>{toolMeta[key]?.title || key}</strong> <br />
                    <small>{toolMeta[key]?.description}</small>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      )}
    </div>
  );
}
