// src/components/MortgageCalculator/MortgageCalculator.js
import React, { useState, useEffect } from 'react';
import './MortgageCalculator.css';

// Helper to format currency - UPDATED FOR INR
const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', { // Use 'en-IN' locale for typical Indian formatting
    style: 'currency',
    currency: 'INR', // <-- Changed from USD to INR
    minimumFractionDigits: 0, // Optional: Set to 0 to hide paise
    maximumFractionDigits: 0, // Optional: Set to 0 to hide paise
  }).format(value);
};

// Core mortgage calculation logic (remains the same)
const calculateMonthlyPayment = (principal, annualRate, years) => {
    // ... (calculation logic is unchanged) ...
    if (!principal || principal <= 0 || !annualRate || annualRate <= 0 || !years || years <= 0) {
        return 0;
    }
    const monthlyRate = (annualRate / 100) / 12;
    const numberOfPayments = years * 12;
    if (monthlyRate === 0) {
        return principal / numberOfPayments;
    }
    const monthlyPayment = principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return monthlyPayment;
};


const MortgageCalculator = () => {
  // --- State for Inputs ---
  const [propertyPrice, setPropertyPrice] = useState(5000000); // <-- Updated Default Price Example (50 Lakhs)
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTermYears, setLoanTermYears] = useState(20); // Maybe default to 20 years for India?
  const [interestRatePercent, setInterestRatePercent] = useState(8.5); // Adjusted default rate example

  // --- State for Calculated Values ---
  const [downPaymentAmount, setDownPaymentAmount] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // --- Effect to recalculate (logic remains the same) ---
  useEffect(() => {
    const price = parseFloat(propertyPrice) || 0;
    const downPercent = parseFloat(downPaymentPercent) || 0;
    const ratePercent = parseFloat(interestRatePercent) || 0;
    const years = parseInt(loanTermYears) || 0;

    const calculatedDownPayment = price * (downPercent / 100);
    const calculatedLoanAmount = price - calculatedDownPayment;

    setDownPaymentAmount(calculatedDownPayment);
    setLoanAmount(calculatedLoanAmount);

    const payment = calculateMonthlyPayment(calculatedLoanAmount, ratePercent, years);
    setMonthlyPayment(payment);

  }, [propertyPrice, downPaymentPercent, loanTermYears, interestRatePercent]);

  // --- Input Handlers (remain the same) ---
  const handlePriceChange = (e) => setPropertyPrice(e.target.value);
  const handleDownPaymentChange = (e) => setDownPaymentPercent(e.target.value);
  const handleTermChange = (e) => setLoanTermYears(e.target.value);
  const handleRateChange = (e) => setInterestRatePercent(e.target.value);

  return (
    <div className="mortgage-calculator">
      {/* Input Fields */}
      <div className="calculator-inputs">
        <div className="calc-form-group">
           {/* --- Updated Label --- */}
           <label htmlFor="propertyPrice">Property Price (₹)</label>
           <input
            type="number"
            id="propertyPrice"
            value={propertyPrice}
            onChange={handlePriceChange}
            min="0"
            step="10000" // Step might be larger for INR
           />
        </div>
        <div className="calc-form-group">
           <label htmlFor="downPayment">Down Payment (%)</label>
           <input
            type="number"
            id="downPayment"
            value={downPaymentPercent}
            onChange={handleDownPaymentChange}
            min="0"
            max="100"
            step="1"
           />
        </div>
         <div className="calc-form-group">
           <label htmlFor="loanTerm">Loan Term (Years)</label>
           <select id="loanTerm" value={loanTermYears} onChange={handleTermChange}>
              <option value="30">30</option>
              <option value="25">25</option>
              <option value="20">20</option>
              <option value="15">15</option>
              <option value="10">10</option>
              <option value="5">5</option>
           </select>
        </div>
        <div className="calc-form-group">
           <label htmlFor="interestRate">Interest Rate (%)</label>
           <input
            type="number"
            id="interestRate"
            value={interestRatePercent}
            onChange={handleRateChange}
            min="0"
            step="0.01"
           />
        </div>
      </div>

      {/* Results Display (markup remains the same, values will use INR format) */}
      <div className="calculator-results">
         <h4>Summary</h4>
         <div className="result-item">
             <span>Down Payment:</span>
             <strong>{formatCurrency(downPaymentAmount)}</strong>
         </div>
         <div className="result-item">
             <span>Loan Amount:</span>
             <strong>{formatCurrency(loanAmount)}</strong>
         </div>
         <hr />
         <div className="result-item monthly-payment">
             <span>Estimated Monthly EMI:</span> {/* Changed text slightly */}
             <strong className="payment-amount">{formatCurrency(monthlyPayment)}</strong>
         </div>
          <p className="disclaimer">(Principal & Interest only. Does not include taxes or other charges.)</p>
      </div>
    </div>
  );
};

export default MortgageCalculator;