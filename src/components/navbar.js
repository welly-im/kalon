import { useState } from "react";
import Link from "next/link";
import "../app/globals.css";

export default function Navbar() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <nav
      className="navbar fixed-bottom bg-light w-100"
      style={{ maxWidth: "430px", left: "50%", transform: "translateX(-50%)" }}
    >
      <div className="container d-flex justify-content-around">
        <Link href="/" className="btn btn-outline-primary">
          🏠
        </Link>
        <button
          className="btn btn-outline-primary"
          onClick={() => setShowPopup(!showPopup)}
        >
          🧮
        </button>
        <Link href="#" className="btn btn-outline-primary">
          ℹ️
        </Link>
      </div>
      {showPopup && (
        <div
          className="position-fixed bottom-0 start-50 translate-middle-x bg-white p-3 shadow-lg p-3 bg-light popup-animated d-flex flex-column align-items-center"
          style={{ width: "350px" }}
        >
          <h5>Menu</h5>
          <Link
            href="#"
            className="btn btn-primary w-100 mb-2"
            onClick={() => setShowPopup(false)}
          >
            Kalkulator Standar
          </Link>
          <button
            className="btn btn-dark w-25 align-items-center"
            onClick={() => setShowPopup(false)}
          >
            ⬇️
          </button>
        </div>
      )}
    </nav>
  );
}
