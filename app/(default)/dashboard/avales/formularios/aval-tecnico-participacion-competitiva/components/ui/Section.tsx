'use client';

import React from "react";

export default function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        {icon && <span className="text-2xl">{icon}</span>}
        <h3 className="font-bold text-lg text-gray-800 uppercase tracking-wide">{title}</h3>
      </div>
      <div className="pl-2">{children}</div>
    </section>
  );
}
