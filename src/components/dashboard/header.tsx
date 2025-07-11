"use client";

import { Sun } from "lucide-react";
import { SettingsSheet } from "./settings-sheet";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2">
        <Sun className="h-7 w-7 text-accent" />
        <h1 className="font-headline text-2xl font-bold text-primary">
          SolarView
        </h1>
      </div>
      <div className="ml-auto">
        <SettingsSheet />
      </div>
    </header>
  );
}
