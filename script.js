const apiUrl = 'https://open.er-api.com/v6/latest/USD';

document.addEventListener('DOMContentLoaded', () => {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencyList = Object.keys(data.rates);
            const fromCurrency = document.getElementById('fromCurrency');
            const toCurrency = document.getElementById('toCurrency');

            currencyList.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrency.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrency.appendChild(option2);
            });
        });
});

function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount <= 0 || isNaN(amount)) {
        document.getElementById('result').textContent = 'Please enter a valid amount.';
        return;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const rate = data.rates[toCurrency];
            const result = amount * rate;
            document.getElementById('result').textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
        });
}
