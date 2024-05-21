import {Button, InputAdornment, TextField} from "@mui/material";
import {useState} from "react";

function ConversionBlock() {

    const [celsius, setCelsius] = useState(0);
    const [fahrenheit, setFahrenheit] = useState(0);
    const fahrenheitField = document.getElementById("fahrenheit");
    const celsiusField = document.getElementById("celsius");

    function changeCelsius(e) {
        setFahrenheit(Number(e.target.value) * 9/5 + 32);
        setCelsius(Number(e.target.value));
    }

    function changeFahrenheit(e) {
        setCelsius((Number(e.target.value) - 32) * 5/9);
        setFahrenheit(Number(e.target.value));
    }

    function handleTemp() {
        if (celsiusField) {
            celsiusField.value = celsius.toFixed(1);
            fahrenheitField.style.color = "green";
        }
        if (fahrenheitField) {
            fahrenheitField.value = fahrenheit.toFixed(1);
            celsiusField.style.color = "green";
        }
    }

    function setPrevValue(e) {
        if (fahrenheitField && e.target.getAttribute("id") === "celsius") {
            e.target.value = celsius.toFixed(1);
            if (fahrenheitField && Number(fahrenheitField.value) !== fahrenheit) fahrenheitField.style.color = "red";
        } else if (celsiusField && e.target.getAttribute("id") === "fahrenheit") {
            e.target.value = fahrenheit.toFixed(1);
            if (celsiusField && Number(celsiusField.value) !== celsius) celsiusField.style.color = "red";
        }
    }

    return (
        <>
            <br/>
            <TextField
                label="Celsius:"
                onChange={(e) => changeCelsius(e)}
                onFocus={(e) => e.target.value = ""}
                onBlur={(e) => setPrevValue(e)}
                id="celsius"
                sx={{ m: 1, width: '25ch' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">°C</InputAdornment>,
                }}
            />
            <TextField
                label="Fahrenheit:"
                onChange={(e) => changeFahrenheit(e)}
                onFocus={(e) => e.target.value = ""}
                onBlur={(e) => setPrevValue(e)}
                id="fahrenheit"
                sx={{ m: 1, width: '25ch' }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">°F</InputAdornment>,
                }}
            />
            <br/>
            <Button onClick={() => handleTemp()} className="convert-btn"  variant="contained">Convert</Button>
        </>

    )
}
export default ConversionBlock;