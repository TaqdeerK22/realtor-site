"use client";

import { useState } from "react";

export default function MortgageCalculator({ price }: { price: number }) {
  const [downPayment, setDownPayment] = useState(price * 0.2);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(25);

  const loanAmount = price - downPayment;
  const monthlyRate = rate / 100 / 12;
  const totalPayments = years * 12;

  const monthlyPayment =
    loanAmount *
    (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1);

  return (
    <section style={{ marginTop: "40px", padding: "24px", background: "white", borderRadius: "12px" }}>
      <h2>Mortgage Calculator</h2>

      <div style={{ display: "grid", gap: "12px", maxWidth: "500px" }}>
        <label>
          Down Payment
          <input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} style={{ width: "100%", padding: "12px" }} />
        </label>

        <label>
          Interest Rate %
          <input type="number" value={rate} onChange={(e) => setRate(Number(e.target.value))} style={{ width: "100%", padding: "12px" }} />
        </label>

        <label>
          Amortization Years
          <input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} style={{ width: "100%", padding: "12px" }} />
        </label>
      </div>

      <h3>
        Estimated Monthly Payment: ${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </h3>
    </section>
  );
}
