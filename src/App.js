import { useState } from "react";
import axios from "axios";
import {
  clear,
  clouds,
  drizzle,
  humidity,
  mist,
  rain,
  snow,
  wind,
} from "./assets/index";
const images = [
  { name: "Clear", src: clear },
  { name: "Clouds", src: clouds },
  { name: "Drizzle", src: drizzle },
  { name: "Humidity", src: humidity },
  { name: "Mist", src: mist },
  { name: "Rain", src: rain },
  { name: "Snow", src: snow },
  { name: "Wind", src: wind },
];
const App = () => {
  const [data, setdata] = useState({});
  const [error, setError] = useState(null);
  const [location, setlocation] = useState("");
  const API_KEY = "4df84caa1d7698d7c2611247356c44f9";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`;

  const searchlocation = (event) => {
    if (event.key === "Enter") {
      setError(null);
      axios
        .get(url)
        .then((response) => {
          setdata(response.data);
        })
        .catch((error) => {
          setError(error.message);
        });
      setlocation("");
    }
  };

  if (error) {
    return (
      <p className="capitalize text-xl font-semibold text-center">
        {error}!! Please Refresh
      </p>
    );
  }

  let matchedImage = null;
  if (data.weather) {
    matchedImage = images.find((image) => image.name === data.weather[0].main);
  }
  return (
    <div className="relative">
      <div className="absolute top-32 left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
        <div className="w-screen text-white bg-gradient-to-r from-[#7f00ff] to-[#e100ff]  max-w-md flex-auto overflow-hidden rounded-3xl text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
          <div className="p-4">
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                type="text"
                name="city"
                id="city"
                className="block w-full rounded-md border-2 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                placeholder="Enter City Name"
                value={location}
                onChange={(event) => setlocation(event.target.value)}
                onKeyDown={searchlocation}
              />
            </div>
          </div>
          {matchedImage ? (
            <img
              src={matchedImage.src}
              alt={matchedImage.name}
              className="h-32 w-h-32 mx-auto mb-2 rounded-3xl"
            />
          ) : (
            <img
              src={clear}
              alt={clear}
              className="h-32 w-h-32 mx-auto mb-2 rounded-3xl"
            />
          )}
          <div className="text-center p-8 mt-4 text-4xl">
            {data.main ? (
              <h1 className=" font-medium ">
                {Math.round(data.main.feels_like - 273)}°c
              </h1>
            ) : (
              <h1 className=" font-medium ">Temp ( in°c)</h1>
            )}
            {data.name ? <p>{data.name}</p> : <p>City Name</p>}
          </div>
          <div className="grid grid-cols-2">
            <div className="grid grid-cols-2">
              <img src={humidity} alt="Humidty" className="ml-14 mt-8 h-8" />
              <div className="text-left p-6 pl-0">
                {data.main ? <h1>{data.main.humidity}%</h1> : "70%"}
                <p>Humidity</p>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <img src={wind} alt="WindSpeed" className="ml-14 mt-8 h-8" />
              <div className="text-left p-6 pl-0">
                {data.wind ? (
                  <h1>{data.wind.speed} Km/h</h1>
                ) : (
                  <span>5 Km/h</span>
                )}
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
