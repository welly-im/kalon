"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";

export default function Home() {
  return (
    <div
      className="container d-flex flex-column align-items-center bg-light shadow p-3 bg-body"
      style={{ height: "100vh", maxWidth: "430px", margin: "0 auto" }}
    >
      <h2 className="mt-3">KALON📱</h2>
      <h6 className="mt-3">Kalkulator Online</h6>
      <div className="mt-3 w-100 px-3">
        {/* <Link href="/calculator" className="btn btn-primary w-100 mb-2">
          Kalkulator
        </Link>
        <Link href="/about" className="btn btn-secondary w-100">
          Tentang
        </Link> */}

        <p> Project Gabut </p>

        <Navbar />
      </div>
    </div>
  );
}
