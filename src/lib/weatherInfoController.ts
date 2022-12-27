import { getWeatherInfo, getWeekWeatherInfo } from "./getWeatherInfo";
import { AppException } from "./AppException";
import { getDisplayDate } from "./getDisplayDate";
import { getIconAndBackGroundByAPI } from "./weatherIconsAndBackGrounds";

export type Current = {
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
};

export type FilterWeatherInfos = Array<{
  fetchedDate: number;
}>;

export type CurrentFuture = {
  icon: string;
  iconDescription: string;
  temperature: {
    measure: number;
  };
  fetchedDate: number;
};

type GetWeatherInfoCurrent = {
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

type CityWeatherControllerOut = { [key: string]: Current };

export type WeekFuture = {
  icon: string;
  iconDescription: string;
  temperature: {
    minMeasure: number;
    maxMeasure: number;
  };
  fetchedDate: number;
};

export type Week = {
  city: string;
  futures: Array<WeekFuture>;
  currentTimes: number;
  data: {
    labels: Array<string>;
    datasets: Array<{
      data: Array<number>;
      label: string;
      borderWidth: number;
      borderColor: string;
    }>;
  };
  options: {
    plugins: {
      datalabels: {
        align: string;
        font: { size: number };
        color: string;
      };
    };
    layout: {
      padding: {
        right: number;
      };
    };
    responsive: boolean;
    maintainAspectRatio: boolean;
    scales: {
      y: {
        title: {
          display: boolean;
          text: string;
          font: {
            size: number;
          };
        };
      };
    };
  };
};

type CityWeekWeatherControllerOut = { [key: string]: Week };

type FilterWeatherInfosBetweenCurrentTimeToSecondIn = number;

type WeekDateIn = number;
type WeekDateOut = string;

export const CityWeatherController = async (): Promise<CityWeatherControllerOut> => {
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
    const futures = _filterWeatherInfosBetweenCurrentTimeTo(weatherInfos, 24 * 60 * 60);
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

  const dataBox = {} as { [key: string]: Current };
  for (let i = 0; i < result.length; i++) {
    dataBox[result[i].city] = result[i];
  }
  return dataBox;
};

export const CityWeekWeatherController = async (): Promise<CityWeekWeatherControllerOut> => {
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
    const futures = _filterWeatherInfosBetweenCurrentTimeTo(weatherInfos, 24 * 60 * 60 * 7);

    const data = {
      labels: futures.map((day) => {
        const date = WeekDate(day.fetchedDate);
        const detail = getIconAndBackGroundByAPI(day.icon).iconDetail;
        const label = `${date} ${detail}`;
        return label;
      }),
      datasets: [
        {
          data: futures.map((day) => {
            return day.temperature.maxMeasure;
          }),
          label: "最高気温",
          borderWidth: 1,
          borderColor: "rgb(255,0,0)",
        },
        {
          data: futures.map((day) => {
            return day.temperature.minMeasure;
          }),
          label: "最低気温",
          borderWidth: 1,
          borderColor: "rgb(39,9,236)",
        },
      ],
    };

    const options = {
      plugins: {
        datalabels: {
          align: "right",
          font: {
            size: 15,
          },
          color: "black",
        },
      },
      layout: {
        padding: {
          right: 50,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          title: {
            display: true,
            text: "気温(℃)",
            font: {
              size: 20,
            },
          },
        },
      },
    };

    return {
      city: city,
      futures: futures,
      currentTimes: currentTimes,
      data: data,
      options: options,
    };
  });
  const dataBox = {} as { [key: string]: Week };
  for (let i = 0; i < result.length; i++) {
    dataBox[result[i].city] = result[i];
  }
  return dataBox;
};

/**
 * 天気情報の取得日時と、現在時刻〜指定秒数が一致する天気情報を抽出する
 */
const _filterWeatherInfosBetweenCurrentTimeTo = <FilterWeatherInfosBetweenCurrentTimeToFirstIn extends CurrentFuture | WeekFuture>(
  weatherInfos: Array<FilterWeatherInfosBetweenCurrentTimeToFirstIn>,
  second: FilterWeatherInfosBetweenCurrentTimeToSecondIn
): Array<FilterWeatherInfosBetweenCurrentTimeToFirstIn> => {
  if (!weatherInfos || weatherInfos.length === 0) {
    throw new AppException(Number(weatherInfos.length), "天気情報の一覧は必須項目です。");
  }
  if (second <= 0 || !Number.isInteger(second)) {
    throw new AppException(second, "指定秒数は自然数を指定してください。");
  }
  const currentSecond = new Date().getTime() / 1000;
  const endSecond = currentSecond + second;
  const filteredWeatherInfos = weatherInfos.filter((weatherInfo) => {
    return currentSecond < weatherInfo.fetchedDate && weatherInfo.fetchedDate < endSecond;
  });

  return filteredWeatherInfos;
};

function WeekDate(fetchedDate: WeekDateIn): WeekDateOut {
  const { month, day, dayofweek, dayname } = getDisplayDate(fetchedDate);
  const date = `${month}/${day}/(${dayname[dayofweek]})`;
  return date;
}
