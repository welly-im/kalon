"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";

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

  // Load dari localStorage saat pertama kali render
  useEffect(() => {
    const savedOrder = localStorage.getItem("componentOrder");
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  // Simpan ke localStorage setiap kali order berubah
  useEffect(() => {
    localStorage.setItem("componentOrder", JSON.stringify(order));
  }, [order]);

  // Fungsi drag & drop
  const handleDragStart = (index) => (event) => {
    event.dataTransfer.setData("index", index);
  };

  const handleDrop = (index) => (event) => {
    event.preventDefault();
    const fromIndex = event.dataTransfer.getData("index");
    if (fromIndex !== index) {
      const newOrder = [...order];
      const movedItem = newOrder.splice(fromIndex, 1)[0];
      newOrder.splice(index, 0, movedItem);
      setOrder(newOrder);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className="container d-flex flex-column align-items-center bg-light shadow p-2 bg-body"
      style={{ height: "auto", maxWidth: "430px", margin: "0 auto" }}
    >
      <h6 className="mt-3">Kalkulator Invest Saham</h6>
      {order.map((key, index) => {
        const Component = components[key];
        return (
          <div key={key} className="w-100">
            <div
              draggable
              onDragStart={handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={handleDrop(index)}
              className="w-100 mb-2 p-2 bg-white shadow-sm rounded"
              style={{ cursor: "grab" }}
            >
              <Component />
            </div>
            {index < order.length - 1 && <hr className="w-100" />}
          </div>
        );
      })}
    </div>
  );
}
