const amount = document.getElementById("amountValue");
const fromList = document.getElementById("from");
const toList = document.getElementById("to");

// Fetch the list of currencies and populate dropdowns
async function fetchCurrencyList() {
    const url = "https://v6.exchangerate-api.com/v6/32ea18a74aa02a1715388cb6/latest/USD";
    try {
        const response = await fetch(url);
        const data = await response.json();
        const currencyList = Object.keys(data.conversion_rates);
        populateCurrencyDropdown(currencyList);
    } catch (error) {
        console.error("Error fetching currency list:", error);
    }
}

// Populate the dropdowns with currency options
function populateCurrencyDropdown(currencyList) {
    currencyList.forEach((code) => {
        const option1 = document.createElement("option");
        option1.value = code;
        option1.textContent = code;
        fromList.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = code;
        option2.textContent = code;
        toList.appendChild(option2);
    });
}

// Fetch exchange rate data for the selected currencies
async function fetchApiData(fromCurrency) {
    const url = `https://v6.exchangerate-api.com/v6/32ea18a74aa02a1715388cb6/latest/${fromCurrency}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // Log the entire response to verify
        return data.conversion_rates;
    } catch (error) {
        console.error("Error fetching currency data:", error);
    }
}

// Convert the amount based on selected currencies
async function convertCurrency() {
    const fromCurrency = fromList.value;
    const toCurrency = toList.value;
    const amountValue = parseFloat(amount.value);

    if (!fromCurrency || !toCurrency || isNaN(amountValue)) {
        alert("Please select currencies and enter a valid amount.");
        return;
    }

    const conversionRates = await fetchApiData(fromCurrency);
    const rate = conversionRates[toCurrency];
    const convertedAmount = (amountValue * rate).toFixed(2);

    alert(`Converted Amount: ${convertedAmount} ${toCurrency}`);
}

// Initialize the currency converter
fetchCurrencyList();

// Add event listener for conversion
document.getElementById("convertButton").addEventListener("click", convertCurrency);
