"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

import Persen from "./persen";
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

const defaultOrder = [
  "Persen",
  "PerubahanPersen",
  "HitungDividenDariJumlahLot",
  "HitungLotDividen",
  "BerapaPersen",
];

export default function Home() {
  const [activePage, setActivePage] = useState("home");
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="container position-relative p-0"
      style={{ 
        maxWidth: "430px", 
        margin: "0 auto",
        backgroundColor: "var(--bibit-surface)",
        minHeight: "100vh",
        paddingBottom: "100px"
      }}
    >
      {/* Header */}
      <div 
        className="card-bibit p-4 mb-3"
        style={{ 
          borderRadius: "0 0 24px 24px",
          background: "linear-gradient(135deg, var(--bibit-primary) 0%, var(--bibit-primary-dark) 100%)",
          border: "none",
          color: "white"
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="m-0" style={{ fontWeight: "700" }}>Kalkulator Investasi</h5>
          <button
            className="btn"
            style={{ 
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              color: "white",
              borderRadius: "12px",
              padding: "8px 12px"
            }}
            onClick={() => setShowMenu(!showMenu)}
          >
            ☰
          </button>
        </div>
        <p className="m-0" style={{ opacity: "0.9", fontSize: "14px" }}>
          Alat untuk perhitungan investasi saham Anda v.23092025
        </p>
      </div>

      {/* Menu Dropdown */}
      {showMenu && (
        <div
          className="position-absolute card-bibit p-3 popup-animated"
          style={{ 
            width: "340px", 
            zIndex: 999, 
            top: "70px", 
            right: "16px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            borderRadius: "16px"
          }}
        >
          <ul className="list-unstyled mb-0">
            <li className="mb-2">
              <button
                className="btn w-100 text-start p-2"
                style={{ 
                  background: activePage === "home" ? "var(--bibit-secondary)" : "transparent",
                  border: "none",
                  borderRadius: "12px",
                  color: "var(--bibit-text-primary)"
                }}
                onClick={() => {
                  setActivePage("home");
                  setShowMenu(false);
                }}
              >
                🏠 <strong style={{ marginLeft: "8px" }}>Alat Kalkulator</strong>
              </button>
            </li>
            <li>
              <button
                className="btn w-100 text-start p-2"
                style={{ 
                  background: activePage === "dca" ? "var(--bibit-secondary)" : "transparent",
                  border: "none",
                  borderRadius: "12px",
                  color: "var(--bibit-text-primary)"
                }}
                onClick={() => {
                  setActivePage("dca");
                  setShowMenu(false);
                }}
              >
                📊 <strong style={{ marginLeft: "8px" }}>Kalkulator DCA</strong>
              </button>
            </li>
                <li className="mt-2">
                  <button
                    className="btn w-100 text-start p-2"
                    style={{ 
                      background: activePage === "ipo" ? "var(--bibit-secondary)" : "transparent",
                      border: "none",
                      borderRadius: "12px",
                      color: "var(--bibit-text-primary)"
                    }}
                    onClick={() => {
                      setActivePage("ipo");
                      setShowMenu(false);
                    }}
                  >
                    🧾 <strong style={{ marginLeft: "8px" }}>Kalkulator ARA/ARB</strong>
                  </button>
                </li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className="px-3">{/* Content container */}

        {/* Calculator Tools Section */}
        <div
          style={{
            display: activePage === "home" ? "block" : "none",
            width: "100%",
          }}
        >
          {defaultOrder.map((key, index) => {
            const Component = components[key];
            if (!Component) return null;

            return (
              <div
                key={key}
                className="card-bibit mb-3 p-4"
                style={{ border: "1px solid var(--bibit-border)" }}
              >
                <Component />
              </div>
            );
          })}
        </div>

        {/* DCA Calculator Section */}
        <div
          className="w-100"
          style={{
            display: activePage === "dca" ? "block" : "none",
          }}
        >
          <div className="card-bibit p-4">
            <DcaCalculator />
          </div>
        </div>

        {/* IPO ARA/ARB Calculator Section */}
        <div
          className="w-100"
          style={{
            display: activePage === "ipo" ? "block" : "none",
          }}
        >
          <div className="card-bibit p-4">
            <IpoAraArbCalculator />
          </div>
        </div>
      </div>
    </div>
  );
}
