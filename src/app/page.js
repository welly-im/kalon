"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Reorder, motion, useDragControls } from "framer-motion";

import Persen from "./persen";
import BerapaPersen from "./pageBerapaPersen";
import PerubahanPersen from "./perubahanPersen";
import HitungDividenDariJumlahLot from "./pageHitungDividenDariJumlahLot";
import HitungLotDividen from "./pageHitungLotDividen";

const components = {
  Persen,
  BerapaPersen,
  PerubahanPersen,
  HitungDividenDariJumlahLot,
  HitungLotDividen,
};

const defaultOrder = [
  "Persen",
  "BerapaPersen",
  "PerubahanPersen",
  "HitungDividenDariJumlahLot",
  "HitungLotDividen",
];

export default function Home() {
  const [order, setOrder] = useState(defaultOrder);

  useEffect(() => {
    const savedOrder = localStorage.getItem("componentOrder");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("componentOrder", JSON.stringify(order));
  }, [order]);

  return (
    <div
      className="container d-flex flex-column align-items-center bg-light shadow p-2 bg-body"
      style={{ height: "auto", maxWidth: "430px", margin: "0 auto" }}
    >
      <h6 className="mt-3">Kalkulator Invest Saham</h6>

      <Reorder.Group
        axis="y"
        values={order}
        onReorder={setOrder}
        className="w-100"
        as="div"
      >
        {order.map((key) => {
          const Component = components[key];
          const controls = useDragControls(); // Kontrol drag manual

          if (!Component) return null; // Mencegah error jika komponen tidak ditemukan

          return (
            <Reorder.Item
              key={key}
              value={key}
              as="div"
              dragListener={false} // Matikan drag di seluruh area, hanya di ikon
              dragControls={controls} // Gunakan kontrol manual
            >
              <motion.div
                className="position-relative w-100 mb-2 p-2 bg-white shadow-sm rounded"
                layout
                layoutTransition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                {/* Tombol hamburger di pojok kanan atas */}
                <motion.div
                  className="position-absolute d-flex align-items-center justify-content-center"
                  style={{
                    top: "5px",
                    right: "5px",
                    width: "32px",
                    height: "32px",
                    background: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "6px",
                    cursor: "grab",
                    zIndex: 10, // Pastikan ikon selalu di atas komponen lain
                  }}
                  onPointerDown={(e) => controls.start(e)} // Drag hanya lewat ikon ini
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="white"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2 4h12v1H2zM2 8h12v1H2zM2 12h12v1H2z" />
                  </svg>
                </motion.div>

                {/* Konten Komponen */}
                <div className="flex-grow-1">
                  <Component />
                </div>
              </motion.div>
              <hr className="w-100" />
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </div>
  );
}
