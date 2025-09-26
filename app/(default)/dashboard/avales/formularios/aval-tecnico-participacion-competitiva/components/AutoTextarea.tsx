'use client';

import React, { useLayoutEffect, useRef } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  minRows?: number;
  maxRows?: number;
  className?: string;
  placeholder?: string;
};

export default function AutoTextarea({
  value,
  onChange,
  minRows = 1,
  maxRows,
  className = "",
  ...rest
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "0px";
    const lineHeight = parseInt(getComputedStyle(el).lineHeight || "20", 10);
    const rows = Math.ceil(el.scrollHeight / lineHeight);
    const finalRows = Math.min(maxRows ?? rows, Math.max(rows, minRows ?? 1));
    el.style.height = `${finalRows * lineHeight}px`;
  }, [value, minRows, maxRows]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-3 border border-gray-200 rounded-xl resize-none overflow-hidden min-h-[48px]
        focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
        placeholder:text-gray-400 bg-white ${className}`}
      {...rest}
    />
  );
}
