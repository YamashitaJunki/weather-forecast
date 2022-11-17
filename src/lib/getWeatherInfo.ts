import { AppException } from "../lib/AppException";
import { availableCities } from "../lib/availableCities";

type WeatherIconData = {
  icon: string;
  description: string;
};
type Current = {
  sys: {
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<WeatherIconData>;
  dt: number;
};
type Future = {
  list: Array<{
    weather: Array<WeatherIconData>;
    main: {
      temp: number;
    };
    dt: number;
  }>;
};
type GetWeatherInfoOut = Array<{
  city: string;
  current: Current;
  future: Future;
}>;
type WeekFuture = {
  current: {
    dt: number;
  };
  daily: Array<{
    weather: Array<WeatherIconData>;
    temp: {
      min: number;
      max: number;
    };
    dt: number;
  }>;
};
type GetWeekWeatherInfoOut = Array<{
  city: string;
  future: WeekFuture;
}>;

const citiesList = availableCities();
const APIKEY = process.env.OPEN_WEATHER_API_KEY;
if (!APIKEY) {
  throw new AppException("APIKEY", "環境変数が入っていません");
}

export const getWeatherInfo = async (): Promise<GetWeatherInfoOut> => {
  const responses = await Promise.all(
    Object.keys(citiesList).map(async (key) => {
      const current = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${key}&units=metric&appid=${APIKEY}`
      );
      if (!current) {
        throw new AppException(current, "fetchの結果が空です");
      }
      if (current.status !== 200) {
        throw new AppException(current.status, "fetchに失敗しました");
      }
      const future = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${key}&units=metric&appid=${APIKEY}`
      );
      if (!future) {
        throw new AppException(future, "fetchの結果が空です");
      }
      if (future.status !== 200) {
        throw new AppException(future.status, "fetchに失敗しました");
      }
      return {
        city: key,
        current: (await current.json()) as Current,
        future: (await future.json()) as Future,
      };
    })
  );

  return responses;
};

export const getWeekWeatherInfo = async (): Promise<GetWeekWeatherInfoOut> => {
  const responses = await Promise.all(
    Object.keys(citiesList).map(async (key) => {
      const city = citiesList[key];
      const future = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&units=metric&lang=ja&appid=${APIKEY}`
      );
      if (!future) {
        throw new AppException(future, "fetchの結果が空です");
      }
      if (future.status !== 200) {
        throw new AppException(future.status, "fetchに失敗しました");
      }
      return {
        city: key,
        future: (await future.json()) as WeekFuture,
      };
    })
  );

  return responses;
};
