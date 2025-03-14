"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Reorder, motion } from "framer-motion";

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

      {/* Gunakan div biasa agar tidak ada error */}
      <Reorder.Group
        axis="y"
        values={order}
        onReorder={setOrder}
        className="w-100"
        as="div"
      >
        {order.map((key) => {
          const Component = components[key];

          if (!Component) return null; // Mencegah error jika komponen tidak ditemukan

          return (
            <Reorder.Item key={key} value={key} as="div">
              <motion.div
                className="w-100 mb-2 p-2 bg-white shadow-sm rounded"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                layout
                layoutTransition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <Component />
              </motion.div>
              <hr className="w-100" />
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </div>
  );
}
