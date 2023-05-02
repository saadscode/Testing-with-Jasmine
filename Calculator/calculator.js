window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });

    const resetButton = document.getElementById("reset-button");
    resetButton.addEventListener("click", function(e) {
      e.preventDefault();
      form.reset();
      updateMonthly("");
    });
  }
});

function getCurrentUIValues() {
  const amountInput = document.getElementById("loan-amount");
  const yearsInput = document.getElementById("loan-years");
  const rateInput = document.getElementById("loan-rate");

  // Validate input values
  const amount = parseFloat(amountInput.value);
  const years = parseInt(yearsInput.value);
  const rate = parseFloat(rateInput.value);
  if (isNaN(amount) || isNaN(years) || isNaN(rate) || amount < 0 || years < 0 || rate < 0) {
    throw new Error("Invalid input values");
  }

  return {
    amount: amount,
    years: years,
    rate: rate,
  }
}

function setupIntialValues() {
  const initialValues = {amount: 100000, years: 10, rate: 4.5};
  const amountInput = document.getElementById("loan-amount");
  const yearsInput = document.getElementById("loan-years");
  const rateInput = document.getElementById("loan-rate");
  amountInput.value = initialValues.amount;
  yearsInput.value = initialValues.years;
  rateInput.value = initialValues.rate;
  update();
}

function update() {
  const values = getCurrentUIValues();
  console.log(`getCurrentUIValues: ${JSON.stringify(values)}`);
  const monthlyPayment = calculateMonthlyPayment(values);
  if (!isNaN(monthlyPayment)) {
    updateMonthly(monthlyPayment.toFixed(2));
  } else {
    console.error("Monthly payment is not a number");
  }
}

function calculateMonthlyPayment(values) {
  const { amount, years, rate } = values;
  if (amount === 0 || years === 0 || rate === 0) {
    return 0;
  }
  const monthlyRate = rate / 1200;
  const numPayments = years * 12;
  const numerator = amount * monthlyRate;
  const denominator = 1 - Math.pow(1 + monthlyRate, -numPayments);
  let monthlyPayment = numerator / denominator;
  monthlyPayment = Math.round(monthlyPayment * 100) / 100;
  return monthlyPayment;
}


function updateMonthly(monthly) {
  const monthlyPayment = document.getElementById("monthly-payment");
  monthlyPayment.innerText = "$" + monthly;
}
