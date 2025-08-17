'use client';

export default function DateSelect() {
  return (
    <div className="relative">
      <select className="form-select">
        <option>Últimos 7 días</option>
        <option>Últimos 30 días</option>
        <option>Este año</option>
      </select>
    </div>
  );
}
