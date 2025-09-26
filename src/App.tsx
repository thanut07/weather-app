import { useEffect, useState, type ChangeEvent } from "react";
import TextField from "./component/TextFeild";

export default function App() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
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

  const fetchWeatherByCity = (cityName: string) => {
    const apiKey = "04b51d4d7ecf042f49db16204f2a4f86";
    setLoading(true);
    setError("");
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=en`
    )
      .then((res) => {
        if (!res.ok) throw new Error("City not found");
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

  function formatDate(date: Date): string {
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  const today = new Date();
  const nextDays: string[] = [];

  for (let i = 0; i < 5; i++) {
    const next = new Date(today);
    next.setDate(today.getDate() + i);
    nextDays.push(formatDate(next));
  }

  //   const dailyData = data.list.filter((item: any) =>
  //   item.dt_txt.includes("12:00:00")
  // );

  if (loading) return <div>Loading...</div>;
  if (!data || !data.list) return <div> No data </div>;
  const firstItem = data.list[7];
  const secondItem = data.list[15];
  const thirdItem = data.list[23];
  const fourthItem = data.list[31];
  const fifthItem = data.list[39];

  if (error) {
    console.log(error);
  }

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-full md:w-6/12 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="w-full text-end flex items-center gap-2 py-4">
          <div className="w-8/12 md:w-9/12 lg:w-10/12 pad-main">
            <TextField
              id="search"
              name="search"
              placeholder="search city..."
              iconsearch
              value={city}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCity(e.target.value)
              }
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-4/12 md:w-3/12 lg:w-2/12 rounded-lg bg-blue-950 text-white p-2"
          >
            search
          </button>
        </h3>

        <h3 className="font-bold"> {data.city.name} </h3>
        <div className="w-full flex flex-wrap items-center">
          <div className="w-full md:w-6/12 flex justify-center">
            <img
              className="w-6/12 lg:w-8/12"
              src={`https://openweathermap.org/img/wn/${firstItem.weather[0].icon}@2x.png`}
            />
          </div>

          <div className="w-full md:w-6/12 flex flex-col gap-2">
            <p> {firstItem.weather[0].description} </p>
            <p className="text-2xl lg:text-5xl font-bold">
              {firstItem.main.temp} &deg;C
            </p>
            <p className="text-black/40"> {nextDays[0]} </p>
          </div>
        </div>
      </div>

      {/* 2 */}
      <div className="w-full md:w-6/12 grid grid-cols-2 lg:grid-cols-4 mt-4 gap-2">
        <div className="p-2 bg-white shadow-lg rounded-xl">
          <div className="w-full flex justify-center">
            <img
              className="w-6/12 lg:w-8/12"
              src={`https://openweathermap.org/img/wn/${secondItem.weather[0].icon}@2x.png`}
            />
          </div>
          <p className="text-center font-bold">{secondItem.main.temp} &deg;C</p>
          <p className="text-xs">{secondItem.weather[0].description}</p>
          <p className="text-black/40 text-xs">{nextDays[1]}</p>
        </div>
        <div className="p-2 bg-white shadow-lg rounded-xl">
          <div className="w-full flex justify-center">
            <img
              className="w-6/12 lg:w-8/12"
              src={`https://openweathermap.org/img/wn/${thirdItem.weather[0].icon}@2x.png`}
            />
          </div>
          <p className="text-center font-bold ">{thirdItem.main.temp} &deg;C</p>
          <p className="text-xs">{thirdItem.weather[0].description}</p>
          <p className="text-black/40 text-xs">{nextDays[2]}</p>
        </div>
        <div className="p-2 bg-white shadow-lg rounded-xl">
          <div className="w-full flex justify-center">
            <img
              className="w-6/12 lg:w-8/12"
              src={`https://openweathermap.org/img/wn/${fourthItem.weather[0].icon}@2x.png`}
            />
          </div>
          <p className="text-center font-bold ">
            {fourthItem.main.temp} &deg;C
          </p>
          <p className="text-xs">{fourthItem.weather[0].description}</p>
          <p className="text-black/40 text-xs">{nextDays[3]}</p>
        </div>
        <div className="p-2 bg-white shadow-lg rounded-xl">
          <div className="w-full flex justify-center">
            <img
              className="w-6/12 lg:w-8/12"
              src={`https://openweathermap.org/img/wn/${fifthItem.weather[0].icon}@2x.png`}
            />
          </div>
          <p className="text-center font-bold ">{fifthItem.main.temp} &deg;C</p>
          <p className="text-xs">{fifthItem.weather[0].description}</p>
          <p className="text-black/40 text-xs">{nextDays[4]}</p>
        </div>
      </div>
    </section>
  );
}
