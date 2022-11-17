import { getWeatherInfo, getWeekWeatherInfo } from "./getWeatherInfo";
import { AppException } from "../lib/AppException";

export type CityWeather = Array<{
  city: string;
  current: GetWeatherInfoCurrent;
  futures: Array<{
    fetchedDate: number;
    iconDescription: string;
    icon: string;
    temperature: {
      measure: number;
    };
  }>;
}>;

export type FilterWeatherInfos = Array<{
  fetchedDate: number;
}>;

type CurrentFuture = {
  icon: string;
  iconDescription: string;
  temperature: {
    measure: number;
  };
  fetchedDate: number;
};

export type GetWeatherInfoCurrent = {
  fetchedDate: number;
  icon: string;
  iconDescription: string;
  temperature: {
    measure: number;
    feelsLike: number;
  };
  humidity: number;
  windSpeed: number;
  sunrise: number;
  sunset: number;
};

type cityWeatherControllerOut = Array<{
  city: string;
  current: GetWeatherInfoCurrent;
  futures: Array<CurrentFuture>;
}>;

type WeekFuture = {
  icon: string;
  iconDescription: string;
  temperature: {
    minMeasure: number;
    maxMeasure: number;
  };
  fetchedDate: number;
};

type cityWeekWeatherControllerOut = Array<{
  city: string;
  futures: Array<WeekFuture>;
  currentTimes: number;
  data: {
    labels: Array<Array<number>>;
    datasets: Array<{
      data: {
        labels: Array<number>;
      };
    }>;
  };
}>;

type FilterWeatherInfosBetweenCurrentTimeToSecondIn = number;

export class CityWeatherController {
  static async excute(): Promise<cityWeatherControllerOut> {
    const responses = await getWeatherInfo();
    const result = responses.map(({ city, current, future }) => {
      const weatherInfos = future.list.map((weatherInfo) => {
        return {
          icon: weatherInfo.weather[0].icon,
          iconDescription: weatherInfo.weather[0].description,
          temperature: {
            measure: Math.round(weatherInfo.main.temp),
          },
          fetchedDate: weatherInfo.dt,
        };
      });
      const futures = _filterWeatherInfosBetweenCurrentTimeTo(
        weatherInfos,
        24 * 60 * 60
      );
      if (futures.length !== 8) {
        throw new AppException(
          futures.length,
          "3時間ごと24時間以内で正しくフィルターできていない可能性あり、またはAPI取得元が3時間ごとのデータから仕様が変わった可能性あり。"
        );
      }
      return {
        city: city,
        current: {
          temperature: {
            measure: Math.round(current.main.temp),
            feelsLike: Math.round(current.main.feels_like),
          },
          humidity: Math.round(current.main.humidity),
          windSpeed: current.wind.speed,
          icon: current.weather[0].icon,
          iconDescription: current.weather[0].description,
          fetchedDate: current.dt,
          sunrise: current.sys.sunrise,
          sunset: current.sys.sunset,
        },
        futures: futures,
      };
    });

    return result;
  }
}
export class CityWeekWeatherController {
  static async excute(): Promise<cityWeekWeatherControllerOut> {
    const responses = await getWeekWeatherInfo();
    const result = responses.map(({ city, future }) => {
      const weatherInfos = future.daily.map((weatherInfo) => {
        return {
          icon: weatherInfo.weather[0].icon,
          iconDescription: weatherInfo.weather[0].description,
          temperature: {
            minMeasure: Math.round(weatherInfo.temp.min),
            maxMeasure: Math.round(weatherInfo.temp.max),
          },
          fetchedDate: weatherInfo.dt,
        };
      });
      const currentTimes = future.current.dt;
      const futures = _filterWeatherInfosBetweenCurrentTimeTo(
        weatherInfos,
        24 * 60 * 60 * 7
      );
      if (futures.length !== 7) {
        throw new AppException(
          futures.length,
          "明日以降、1週間以内のデータで正しくフィルターできていない可能性あり、またはAPI取得元が7日後までのデータから仕様が変わった可能性あり"
        );
      }

      const data = {
        labels: futures.map((day) => {
          return [day.fetchedDate];
        }),
        datasets: [
          {
            data: {
              labels: futures.map((day) => {
                return day.temperature.maxMeasure;
              }),
            },
          },
        ],
      };
      return {
        city: city,
        futures: futures,
        currentTimes: currentTimes,
        data: data,
      };
    });
    return result;
  }
}

/**
 * 天気情報の取得日時と、現在時刻〜指定秒数が一致する天気情報を抽出する
 */
const _filterWeatherInfosBetweenCurrentTimeTo = <
  FilterWeatherInfosBetweenCurrentTimeToFirstIn extends
    | CurrentFuture
    | WeekFuture
>(
  weatherInfos: Array<FilterWeatherInfosBetweenCurrentTimeToFirstIn>,
  second: FilterWeatherInfosBetweenCurrentTimeToSecondIn
): Array<FilterWeatherInfosBetweenCurrentTimeToFirstIn> => {
  if (!weatherInfos || weatherInfos.length === 0) {
    throw new AppException(
      Number(weatherInfos.length),
      "天気情報の一覧は必須項目です。"
    );
  }
  if (second <= 0 || !Number.isInteger(second)) {
    throw new AppException(second, "指定秒数は自然数を指定してください。");
  }
  const currentSecond = new Date().getTime() / 1000;
  const endSecond = currentSecond + second;
  const filteredWeatherInfos = weatherInfos.filter((weatherInfo) => {
    return (
      currentSecond < weatherInfo.fetchedDate &&
      weatherInfo.fetchedDate < endSecond
    );
  });

  return filteredWeatherInfos;
};
