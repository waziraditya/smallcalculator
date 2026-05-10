const form = document.querySelector("#calculator-form");
const result = document.querySelector("#result");

function formatNumber(value) {
  if (Math.abs(value) < 1e-10) {
    return "0";
  }

  if (Number.isInteger(value)) {
    return String(value);
  }

  return Number(value.toFixed(4)).toString();
}

function formatRoot(real, imaginary = 0) {
  if (Math.abs(imaginary) < 1e-10) {
    return formatNumber(real);
  }

  const sign = imaginary >= 0 ? "+" : "-";
  return `${formatNumber(real)} ${sign} ${formatNumber(Math.abs(imaginary))}i`;
}

function findQuadraticZeros(a, b, c) {
  if (a === 0) {
    return "a cannot be 0 for a quadratic equation.";
  }

  const discriminant = b ** 2 - 4 * a * c;
  const denominator = 2 * a;

  if (discriminant >= 0) {
    const firstZero = (-b + Math.sqrt(discriminant)) / denominator;
    const secondZero = (-b - Math.sqrt(discriminant)) / denominator;

    return `x = ${formatRoot(firstZero)} and x = ${formatRoot(secondZero)}`;
  }

  const real = -b / denominator;
  const imaginary = Math.sqrt(Math.abs(discriminant)) / Math.abs(denominator);

  return `x = ${formatRoot(real, imaginary)} and x = ${formatRoot(real, -imaginary)}`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const a = Number(formData.get("a"));
  const b = Number(formData.get("b"));
  const c = Number(formData.get("c"));

  if (!Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)) {
    result.textContent = "Please enter valid numbers for a, b, and c.";
    return;
  }

  result.textContent = findQuadraticZeros(a, b, c);
});
