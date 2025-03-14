"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import Persen from "./persen";
import BerapaPersen from "./pageBerapaPersen";
import PerubahanPersen from "./perubahanPersen";
import HitungDividenDariJumlahLot from "./pageHitungDividenDariJumlahLot";

export default function Home() {
  return (
    <div
      className="container d-flex flex-column align-items-center bg-light shadow p-2 bg-body"
      style={{ height: "auto", maxWidth: "430px", margin: "0 auto" }}
    >
      <h6 className="mt-3">Kalkulator Invest Saham</h6>
      <Persen />
      <BerapaPersen />
      <PerubahanPersen />
      <HitungDividenDariJumlahLot />
      {/* <Navbar /> */}
    </div>
  );
}
