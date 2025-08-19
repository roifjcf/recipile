/**
 * Starter guide
 */

'use client';

import Link from "next/link";
import { loadTheme } from "@/utils/helper";
import { useEffect } from "react";

export default function Page() {

  useEffect(() => {
    /** Theme init */
    loadTheme();
  }, []);


  return (
  <div>
    <Link href="/">Back to app</Link>
    <p>Coming soon...</p>
  </div>
  );
}