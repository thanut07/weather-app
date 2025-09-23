import { useEffect, useState } from "react";
import TextField from "./component/TextFeild";

export default function App() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const [city, setCity] = useState("");
  // const [weatherData, setWeatherData] = useState<any>(null);
  // const [error, setError] = useState("");

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
      setLoading(false);
    });
  }, []);

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

  if (loading) return <div>Loading...</div>;
  if (!data || !data.list) return <div> No data </div>;
  const firstItem = data.list[7];
  const secondItem = data.list[15];
  const thirdItem = data.list[23];
  const fourthItem = data.list[31];
  const fifthItem = data.list[39];

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="w-full md:w-6/12 bg-white p-6 rounded-xl shadow-lg">
        <h3 className="w-full text-end flex items-center gap-2 py-4">
          <div className="w-10/12 pad-main">
            <TextField
              id="search"
              name="search"
              placeholder="search city..."
              // value={values.search}
              // onChange={(e: ChangeEvent<HTMLInputElement>) =>
              //   setFieldValue("search", e.target.value)
              // }
              iconsearch
            />
          </div>
          <button className="w-2/12 btn-base bg-blue-950 text-white">
            search
          </button>
        </h3>

        <h3 className="font-bold"> {data.city.name} </h3>
        <div className="w-full flex flex-wrap items-center">
          <div className="w-full md:w-6/12">
            <img
              className="w-9/12"
              src={`https://openweathermap.org/img/wn/${firstItem.weather[0].icon}@2x.png`}
            />
          </div>

          <div className="w-full md:w-6/12 flex flex-col gap-3">
            <h2 className=""> {firstItem.weather[0].description} </h2>
            <h1 className="text-4xl lg:text-5xl font-bold">
              {firstItem.main.temp} ํC
            </h1>
            <h4 className="text-black/40"> {nextDays[0]} </h4>
          </div>
        </div>
      </div>

      {/* 2 */}
      <div className="w-full md:w-6/12 grid grid-cols-2 md:grid-cols-4 mt-4 gap-2">
        <div className="p-2 bg-white shadow-lg rounded-xl">
          <div className="w-full flex justify-center">
            <img
              className="w-9/12"
              src={`https://openweathermap.org/img/wn/${secondItem.weather[0].icon}@2x.png`}
            />
          </div>
          <p className="text-center font-bold"> {secondItem.main.temp} ํC </p>
          <p>{secondItem.weather[0].description}</p>
          <p className="text-black/40 text-md md:text-xs">
            {nextDays[1]}
          </p>
        </div>
        <div className="p-2 bg-white shadow-lg rounded-xl">
          <div className="w-full flex justify-center">
            <img
              className="w-9/12"
              src={`https://openweathermap.org/img/wn/${thirdItem.weather[0].icon}@2x.png`}
            />
          </div>
          <p className="text-center font-bold"> {thirdItem.main.temp} ํC </p>
          <p>{thirdItem.weather[0].description}</p>
          <p className="text-black/40 text-md md:text-xs">{nextDays[2]}</p>
        </div>
        <div className="p-2 bg-white shadow-lg rounded-xl">
          <div className="w-full flex justify-center">
            <img
              className="w-9/12"
              src={`https://openweathermap.org/img/wn/${fourthItem.weather[0].icon}@2x.png`}
            />
          </div>
          <p className="text-center font-bold"> {fourthItem.main.temp} ํC </p>
          <p>{fourthItem.weather[0].description}</p>
          <p className="text-black/40 text-md md:text-xs">
            {nextDays[3]}
          </p>
        </div>
        <div className="p-2 bg-white shadow-lg rounded-xl">
          <div className="w-full flex justify-center">
            <img
              className="w-9/12"
              src={`https://openweathermap.org/img/wn/${fifthItem.weather[0].icon}@2x.png`}
            />
          </div>
          <p className="text-center font-bold"> {fifthItem.main.temp} ํC </p>
          <p>{fifthItem.weather[0].description}</p>
          <p className="text-black/40 text-md md:text-xs">{nextDays[4]}</p>
        </div>
        {/* <div className="p-2 bg-white shadow-lg rounded-xl">
          <div className="w-full flex justify-center">
            <img
              className="w-9/12"
              src={`https://openweathermap.org/img/wn/${firstItem.weather[0].icon}@2x.png`}
            />
          </div>
          {secondItem.weather[0].description}
        </div>
        <div className="p-2 bg-white shadow-lg rounded-xl">
          <div className="w-full flex justify-center">
            <img
              className="w-9/12"
              src={`https://openweathermap.org/img/wn/${firstItem.weather[0].icon}@2x.png`}
            />
          </div>
          {secondItem.weather[0].description}
        </div>
        <div className="p-2 bg-white shadow-lg rounded-xl">
          <div className="w-full flex justify-center">
            <img
              className="w-9/12"
              src={`https://openweathermap.org/img/wn/${firstItem.weather[0].icon}@2x.png`}
            />
          </div>
          {secondItem.weather[0].description}
        </div> */}
      </div>
    </section>
  );
}
