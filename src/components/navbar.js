import { useState } from "react";
import Link from "next/link";
import "../app/globals.css";

export default function Navbar() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <nav
      className="navbar fixed-bottom w-100 card-bibit"
      style={{ 
        maxWidth: "430px", 
        left: "50%", 
        transform: "translateX(-50%)",
        borderRadius: "20px 20px 0 0",
        border: "none",
        borderTop: "1px solid var(--bibit-border)",
        padding: "12px 0"
      }}
    >
      <div className="container d-flex justify-content-around">
        <Link 
          href="/" 
          className="btn-bibit-secondary d-flex flex-column align-items-center"
          style={{ 
            border: "none", 
            background: "none", 
            padding: "8px 16px",
            textDecoration: "none",
            minWidth: "60px"
          }}
        >
          <span style={{ fontSize: "20px", marginBottom: "4px" }}>🏠</span>
          <small style={{ fontSize: "10px", color: "var(--bibit-text-secondary)" }}>Beranda</small>
        </Link>
        <button
          className="btn-bibit-secondary d-flex flex-column align-items-center"
          style={{ 
            border: "none", 
            background: "none", 
            padding: "8px 16px",
            minWidth: "60px"
          }}
          onClick={() => setShowPopup(!showPopup)}
        >
          <span style={{ fontSize: "20px", marginBottom: "4px" }}>🧮</span>
          <small style={{ fontSize: "10px", color: "var(--bibit-text-secondary)" }}>Alat</small>
        </button>
        <Link 
          href="#" 
          className="btn-bibit-secondary d-flex flex-column align-items-center"
          style={{ 
            border: "none", 
            background: "none", 
            padding: "8px 16px",
            textDecoration: "none",
            minWidth: "60px"
          }}
        >
          <span style={{ fontSize: "20px", marginBottom: "4px" }}>ℹ️</span>
          <small style={{ fontSize: "10px", color: "var(--bibit-text-secondary)" }}>Info</small>
        </Link>
      </div>
      {showPopup && (
        <div
          className="position-fixed bottom-0 start-50 translate-middle-x card-bibit p-4 popup-animated d-flex flex-column"
          style={{ 
            width: "350px", 
            marginBottom: "80px",
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
          }}
        >
          <h6 className="mb-3 text-center" style={{ color: "var(--bibit-text-primary)", fontWeight: "600" }}>
            Alat Kalkulator
          </h6>
          <Link
            href="#"
            className="btn-bibit-primary w-100 mb-3"
            onClick={() => setShowPopup(false)}
            style={{ textDecoration: "none" }}
          >
            Kalkulator Standar
          </Link>
          <button
            className="btn-bibit-secondary align-self-center"
            onClick={() => setShowPopup(false)}
            style={{ 
              width: "40px",
              height: "40px",
              borderRadius: "20px",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            ✕
          </button>
        </div>
      )}
    </nav>
  );
}
