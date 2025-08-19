'use client';

import React, { useLayoutEffect, useRef } from 'react';

type Props = Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (v: string) => void;
  minRows?: number;
  maxRows?: number;
};

export default function AutoTextarea({
  value,
  onChange,
  minRows = 1,
  maxRows,
  className = '',
  ...rest
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = '0px';
    const lineHeight = parseInt(getComputedStyle(el).lineHeight || '20', 10);
    const scroll = el.scrollHeight;
    let rows = Math.ceil(scroll / lineHeight);
    if (minRows) rows = Math.max(rows, minRows);
    if (maxRows) rows = Math.min(rows, maxRows);
    el.style.height = `${rows * lineHeight}px`;
  }, [value, minRows, maxRows]);

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`form-textarea w-full resize-none overflow-hidden min-h-[40px] ${className}`}
      {...rest}
    />
  );
}
