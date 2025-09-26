'use client';

import React from "react";

export default function InfoItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-bold uppercase text-gray-500 tracking-wider">{label}</div>
      <div className="text-sm text-gray-800">{value}</div>
    </div>
  );
}
