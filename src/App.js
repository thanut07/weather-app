import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import TextField from "./component/TextFeild";
export default function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [city, setCity] = useState("");
    // const [weatherData, setWeatherData] = useState<any>(null);
    const [error, setError] = useState("");
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const apiKey = "04b51d4d7ecf042f49db16204f2a4f86";
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            console.log("location is: ", lat, lon);
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=en`;
            fetch(url)
                .then((res) => res.json())
                .then((resData) => {
                console.log(resData);
                setData(resData);
                setLoading(false);
            })
                .catch((err) => console.log("feth error", err));
            // setLoading(false);
        });
    }, []);
    const fetchWeatherByCity = (cityName) => {
        const apiKey = "04b51d4d7ecf042f49db16204f2a4f86";
        setLoading(true);
        setError("");
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=en`)
            .then((res) => {
            if (!res.ok)
                throw new Error("City not found");
            return res.json();
        })
            .then((resData) => {
            setData(resData);
            setLoading(false);
        })
            .catch((err) => {
            setError(err.message);
            setData(null);
            setLoading(false);
        });
    };
    const handleSearch = () => {
        if (city.trim()) {
            fetchWeatherByCity(city.trim());
        }
    };
    function formatDate(date) {
        return date.toLocaleDateString("en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }
    const today = new Date();
    const nextDays = [];
    for (let i = 0; i < 5; i++) {
        const next = new Date(today);
        next.setDate(today.getDate() + i);
        nextDays.push(formatDate(next));
    }
    //   const dailyData = data.list.filter((item: any) =>
    //   item.dt_txt.includes("12:00:00")
    // );
    if (loading)
        return _jsx("div", { children: "Loading..." });
    if (!data || !data.list)
        return _jsx("div", { children: " No data " });
    const firstItem = data.list[7];
    const secondItem = data.list[15];
    const thirdItem = data.list[23];
    const fourthItem = data.list[31];
    const fifthItem = data.list[39];
    if (error) {
        console.log(error);
    }
    return (_jsxs("section", { className: "w-full min-h-screen flex flex-col justify-center items-center", children: [_jsxs("div", { className: "w-full md:w-6/12 bg-white p-6 rounded-xl shadow-lg", children: [_jsxs("h3", { className: "w-full text-end flex items-center gap-2 py-4", children: [_jsx("div", { className: "w-8/12 md:w-9/12 lg:w-10/12 pad-main", children: _jsx(TextField, { id: "search", name: "search", placeholder: "search city...", iconsearch: true, value: city, onChange: (e) => setCity(e.target.value) }) }), _jsx("button", { onClick: handleSearch, className: "w-4/12 md:w-3/12 lg:w-2/12 rounded-lg bg-blue-950 text-white p-2", children: "search" })] }), _jsxs("h3", { className: "font-bold", children: [" ", data.city.name, " "] }), _jsxs("div", { className: "w-full flex flex-wrap items-center", children: [_jsx("div", { className: "w-full md:w-6/12 flex justify-center", children: _jsx("img", { className: "w-6/12 lg:w-8/12", src: `https://openweathermap.org/img/wn/${firstItem.weather[0].icon}@2x.png` }) }), _jsxs("div", { className: "w-full md:w-6/12 flex flex-col gap-2", children: [_jsxs("p", { children: [" ", firstItem.weather[0].description, " "] }), _jsxs("p", { className: "text-2xl lg:text-5xl font-bold", children: [firstItem.main.temp, " \u00B0C"] }), _jsxs("p", { className: "text-black/40", children: [" ", nextDays[0], " "] })] })] })] }), _jsxs("div", { className: "w-full md:w-6/12 grid grid-cols-2 lg:grid-cols-4 mt-4 gap-2", children: [_jsxs("div", { className: "p-2 bg-white shadow-lg rounded-xl", children: [_jsx("div", { className: "w-full flex justify-center", children: _jsx("img", { className: "w-6/12 lg:w-8/12", src: `https://openweathermap.org/img/wn/${secondItem.weather[0].icon}@2x.png` }) }), _jsxs("p", { className: "text-center font-bold", children: [secondItem.main.temp, " \u00B0C"] }), _jsx("p", { className: "text-xs", children: secondItem.weather[0].description }), _jsx("p", { className: "text-black/40 text-xs", children: nextDays[1] })] }), _jsxs("div", { className: "p-2 bg-white shadow-lg rounded-xl", children: [_jsx("div", { className: "w-full flex justify-center", children: _jsx("img", { className: "w-6/12 lg:w-8/12", src: `https://openweathermap.org/img/wn/${thirdItem.weather[0].icon}@2x.png` }) }), _jsxs("p", { className: "text-center font-bold ", children: [thirdItem.main.temp, " \u00B0C"] }), _jsx("p", { className: "text-xs", children: thirdItem.weather[0].description }), _jsx("p", { className: "text-black/40 text-xs", children: nextDays[2] })] }), _jsxs("div", { className: "p-2 bg-white shadow-lg rounded-xl", children: [_jsx("div", { className: "w-full flex justify-center", children: _jsx("img", { className: "w-6/12 lg:w-8/12", src: `https://openweathermap.org/img/wn/${fourthItem.weather[0].icon}@2x.png` }) }), _jsxs("p", { className: "text-center font-bold ", children: [fourthItem.main.temp, " \u00B0C"] }), _jsx("p", { className: "text-xs", children: fourthItem.weather[0].description }), _jsx("p", { className: "text-black/40 text-xs", children: nextDays[3] })] }), _jsxs("div", { className: "p-2 bg-white shadow-lg rounded-xl", children: [_jsx("div", { className: "w-full flex justify-center", children: _jsx("img", { className: "w-6/12 lg:w-8/12", src: `https://openweathermap.org/img/wn/${fifthItem.weather[0].icon}@2x.png` }) }), _jsxs("p", { className: "text-center font-bold ", children: [fifthItem.main.temp, " \u00B0C"] }), _jsx("p", { className: "text-xs", children: fifthItem.weather[0].description }), _jsx("p", { className: "text-black/40 text-xs", children: nextDays[4] })] })] })] }));
}
