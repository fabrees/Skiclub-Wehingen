"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SyncLoader } from 'react-spinners';

const LoadingScreen = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="mb-12">
        <SyncLoader color="#1279BF" loading={true} speedMultiplier={0.5} />
      </div>

      <p>Fehler beim Laden der Rundmail...</p>
      <Link href="/admin">
        <Button className="bg-brand-500 hover:bg-brand-600 hover:scale-105 transition duration-200 shadow-md font-bold text-white border-2 border-brand-500 mt-12">
          Erneut versuchen
        </Button>
      </Link>
    </div>
  );
};

export default LoadingScreen;
