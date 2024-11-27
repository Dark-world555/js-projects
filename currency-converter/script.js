const API_URL = "https://api.exchangerate-api.com/v4/latest/";

const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertButton = document.getElementById("convert");
const swapButton = document.getElementById("swap");
const rateDisplay = document.getElementById("rate");
const resultDisplay = document.getElementById("result");
const loadingSpinner = document.getElementById("loading");

// Populate currency dropdowns
async function populateCurrencyDropdowns() {
  showLoading(true);
  try {
    const response = await fetch(API_URL + "USD");
    const data = await response.json();

    const currencies = Object.keys(data.rates);
    currencies.forEach(currency => {
      const option1 = document.createElement("option");
      const option2 = document.createElement("option");

      option1.value = currency;
      option1.textContent = currency;

      option2.value = currency;
      option2.textContent = currency;

      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });

    // Set defaults
    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  } catch (error) {
    alert("Failed to fetch currency data. Please try again later.");
  } finally {
    showLoading(false);
  }
}

// Convert currency
async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    resultDisplay.textContent = "Please enter a valid amount.";
    return;
  }

  const from = fromCurrency.value;
  const to = toCurrency.value;

  showLoading(true);
  try {
    const response = await fetch(API_URL + from);
    const data = await response.json();
    const rate = data.rates[to];
    const convertedAmount = (amount * rate).toFixed(2);

    // Display result and rate
    resultDisplay.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
    rateDisplay.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
  } catch (error) {
    resultDisplay.textContent = "Error converting currency. Please try again.";
  } finally {
    showLoading(false);
  }
}

// Swap currencies
function swapCurrencies() {
  const temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;

  // Recalculate after swapping
  if (amountInput.value) {
    convertCurrency();
  }
}

// Show/Hide Loading Spinner
function showLoading(isLoading) {
  loadingSpinner.style.display = isLoading ? "block" : "none";
}

// Event listeners
convertButton.addEventListener("click", convertCurrency);
swapButton.addEventListener("click", swapCurrencies);
window.addEventListener("load", populateCurrencyDropdowns);
