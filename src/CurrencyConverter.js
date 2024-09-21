import { useState, useEffect } from "react";
import Axios from "axios";

function CryptoCurrencyConverter() {
    const [cryptos, setCryptos] = useState([]);
    const [amount, setAmount] = useState(1);
    const [selectedCrypto, setSelectedCrypto] = useState("bitcoin");
    const [targetCurrency, setTargetCurrency] = useState("USD");
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [error, setError] = useState(null);

    // Fetch list of cryptos
    useEffect(() => {
        Axios.get("https://api.coincap.io/v2/assets")
            .then((res) => {
                setCryptos(res.data.data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    // Handle conversion
    const convertCurrency = () => {
        // Fetch crypto price
        const crypto = cryptos.find((c) => c.id === selectedCrypto);
        const cryptoPriceUsd = crypto ? parseFloat(crypto.priceUsd) : 0;

        // Fetch exchange rates for fiat currencies
        Axios.get(`https://api.exchangerate-api.com/v4/latest/USD`)
            .then((res) => {
                const exchangeRate = res.data.rates[targetCurrency];
                const convertedValue = (amount * cryptoPriceUsd * exchangeRate).toFixed(2);
                setConvertedAmount(convertedValue);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div className="converter">
            <h1>Crypto to Fiat Converter</h1>
            <div>
                <label>Amount: </label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <div>
                <label>Cryptocurrency: </label>
                <select
                    value={selectedCrypto}
                    onChange={(e) => setSelectedCrypto(e.target.value)}
                >
                    {cryptos.map((crypto) => (
                        <option key={crypto.id} value={crypto.id}>
                            {crypto.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Target Currency: </label>
                <select
                    value={targetCurrency}
                    onChange={(e) => setTargetCurrency(e.target.value)}
                >
                    <option value="USD">USD</option>
                    <option value="THB">THB (Thai Baht)</option>
                    <option value="LAK">LAK (Lao Kip)</option>
                </select>
            </div>
            <button onClick={convertCurrency}>Convert</button>

            {convertedAmount && (
                <p>
                    {amount} {selectedCrypto} = {convertedAmount} {targetCurrency}
                </p>
            )}

            {error && <p>Error: {error}</p>}
            <style jsx>
    {`
    .converter {
    text-align: center;
    margin-top: 20px;
}

.converter label {
    margin-right: 10px;
}

.converter input,
.converter select {
    margin-bottom: 15px;
    padding: 5px;
    width: 150px;
}

.converter button {
    padding: 5px 15px;
    cursor: pointer;
}

    `}
</style>
        </div>
    );
}

export default CryptoCurrencyConverter;

            

