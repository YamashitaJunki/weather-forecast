import { AppException } from "./AppException";

type weatherIconsAndBackGroundsOut = {
  [index: string]: {
    apiKey: string;
    iconKey: string;
    iconDetail: string;
    src: string;
  };
};
type getIconAndBackGroundByAPIIn = string;
type getIconAndBackGroundByAPIOut = {
  apiKey: string;
  iconKey: string;
  iconDetail: string;
  src: string;
};

export const weatherIconsAndBackGrounds =
  (): weatherIconsAndBackGroundsOut => ({
    day_clear_sky: {
      apiKey: "01d",
      iconKey: "Sunny",
      iconDetail: "晴れ",
      src: "/dayClearSky.jpeg",
    },
    night_clear_sky: {
      apiKey: "01n",
      iconKey: "Sunny",
      iconDetail: "晴れ",
      src: "/nightClearSky.jpeg",
    },
    day_few_clouds: {
      apiKey: "02d",
      iconKey: "Partly_Cloudy_Day",
      iconDetail: "時々曇り",
      src: "/dayFewClouds.jpeg",
    },
    night__few_clouds: {
      apiKey: "02n",
      iconKey: "Partly_Cloudy_Day",
      iconDetail: "時々曇り",
      src: "/nightFewClouds.jpeg",
    },
    day_scattered_clouds: {
      apiKey: "03d",
      iconKey: "Cloud",
      iconDetail: "曇りがち",
      src: "/dayScatteredClouds.jpeg",
    },
    night_scattered_clouds: {
      apiKey: "03n",
      iconKey: "Cloud",
      iconDetail: "曇りがち",
      src: "/nightScatteredClouds.jpeg",
    },
    day_broken_clouds: {
      apiKey: "04d",
      iconKey: "Filter_Drama",
      iconDetail: "曇り",
      src: "/dayBrokenClouds.jpeg",
    },
    night_broken_clouds: {
      apiKey: "04n",
      iconKey: "Filter_Drama",
      iconDetail: "曇り",
      src: "/nightBrokenClouds.jpeg",
    },
    day_shower_rain: {
      apiKey: "09d",
      iconKey: "Shower",
      iconDetail: "にわか雨",
      src: "/dayShowerRain.jpeg",
    },
    night_shower_rain: {
      apiKey: "09n",
      iconKey: "Shower",
      iconDetail: "にわか雨",
      src: "/nightShowerRain.jpeg",
    },
    day_rain: {
      apiKey: "10d",
      iconKey: "Rainy",
      iconDetail: "雨",
      src: "/dayRain.jpeg",
    },
    night_rain: {
      apiKey: "10n",
      iconKey: "Rainy",
      iconDetail: "雨",
      src: "/nightRain.jpeg",
    },
    day_thunderstorm: {
      apiKey: "11d",
      iconKey: "Electric_Bolt",
      iconDetail: "雷",
      src: "/dayThunderstorm.jpeg",
    },
    night_thunderstorm: {
      apiKey: "11n",
      iconKey: "Electric_Bolt",
      iconDetail: "雷",
      src: "/nightThunderstorm.jpeg",
    },
    day_snow: {
      apiKey: "13d",
      iconKey: "Ac_Unit",
      iconDetail: "雪",
      src: "/daySnow.jpeg",
    },
    night_snow: {
      apiKey: "13n",
      iconKey: "Ac_Unit",
      iconDetail: "雪",
      src: "/nightSnow.jpeg",
    },
    day_mist: {
      apiKey: "50d",
      iconKey: "Foggy",
      iconDetail: "霧",
      src: "/dayMist.jpeg",
    },
    night_mist: {
      apiKey: "50n",
      iconKey: "Foggy",
      iconDetail: "霧",
      src: "/nightMist.jpeg",
    },
  });

export const getIconAndBackGroundByAPI = (
  apiKey: getIconAndBackGroundByAPIIn
): getIconAndBackGroundByAPIOut => {
  if (!apiKey) {
    throw new AppException(apiKey, "apiKeyが入っていません。");
  }
  const weatherIconsAndBackGroundsList = weatherIconsAndBackGrounds();
  const founds = Object.keys(weatherIconsAndBackGroundsList).filter(
    (key) => apiKey === weatherIconsAndBackGroundsList[key].apiKey
  );
  if (!founds || founds.length === 0) {
    throw new AppException(founds.length, "存在なし。");
  } else if (founds.length > 1) {
    throw new AppException(
      founds.length,
      "iconKeyが複数設定されている可能性あり。"
    );
  } else {
    return weatherIconsAndBackGroundsList[founds.toString()];
  }
};
