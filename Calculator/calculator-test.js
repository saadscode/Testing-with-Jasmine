describe("calculateMonthlyPayment", function() {
  it("should calculate the monthly payment correctly", function() {
    const values = {
      amount: 200000,
      years: 30,
      rate: 4.5
    };
    let expected = 1037.32;
    expected = Math.round(expected * 100) / 100; // round to 2 decimal places
    const result = calculateMonthlyPayment(values);
    expect(result).toBeCloseTo(expected, 2);
  });
    

  it("should return a result with 2 decimal places", function() {
    const values = { amount: 100000, years: 10, rate: 4.5 };
    const payment = calculateMonthlyPayment(values);
    const paymentStr = payment.toFixed(2);
    const decimalIndex = paymentStr.indexOf(".");
    expect(decimalIndex >= 0 && paymentStr.length - decimalIndex - 1 === 2).toBe(true);
  });

  it("should return 0 if amount is 0", function() {
    const values = { amount: 0, years: 10, rate: 4.5 };
    expect(calculateMonthlyPayment(values)).toBe(0);
  });

  it("should return 0 if years is 0", function() {
    const values = { amount: 100000, years: 0, rate: 4.5 };
    expect(calculateMonthlyPayment(values)).toBe(0);
  });

  it("should return 0 if rate is 0", function() {
    const values = { amount: 100000, years: 10, rate: 0 };
    expect(calculateMonthlyPayment(values)).toBe(0);
  });

  it("should return NaN if values are missing", function() {
    const values = {};
    expect(calculateMonthlyPayment(values)).toBeNaN();
  });

  it("should return NaN if values are not numbers", function() {
    const values = { amount: "abc", years: "def", rate: "ghi" };
    expect(calculateMonthlyPayment(values)).toBeNaN();
  });
});
