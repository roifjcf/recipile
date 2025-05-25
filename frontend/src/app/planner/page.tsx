'use client';
import Navbar from "@/components/navbar";
import { loadTheme } from "@/utils/helper";
import { useEffect } from "react";

export default function Page() {
  
  useEffect(() => {
    /** Theme init */
    loadTheme();
  }, []);

  return (
  <div>
    <Navbar />
    
    <h1>meal planner page</h1>
  </div>
  )
}