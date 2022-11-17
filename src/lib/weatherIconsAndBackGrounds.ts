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
      src: "/dayClearSky.jpg",
    },
    night_clear_sky: {
      apiKey: "01n",
      iconKey: "Sunny",
      iconDetail: "晴れ",
      src: "/nightClearSky.jpg",
    },
    day_few_clouds: {
      apiKey: "02d",
      iconKey: "Partly_Cloudy_Day",
      iconDetail: "時々曇り",
      src: "/dayFewClouds.jpg",
    },
    night__few_clouds: {
      apiKey: "02n",
      iconKey: "Partly_Cloudy_Day",
      iconDetail: "時々曇り",
      src: "/nightFewClouds.jpg",
    },
    day_scattered_clouds: {
      apiKey: "03d",
      iconKey: "Cloud",
      iconDetail: "曇りがち",
      src: "/dayScatteredClouds.jpg",
    },
    night_scattered_clouds: {
      apiKey: "03n",
      iconKey: "Cloud",
      iconDetail: "曇りがち",
      src: "/nightScatteredClouds.jpg",
    },
    day_broken_clouds: {
      apiKey: "04d",
      iconKey: "Filter_Drama",
      iconDetail: "曇り",
      src: "/dayBrokenClouds.jpg",
    },
    night_broken_clouds: {
      apiKey: "04n",
      iconKey: "Filter_Drama",
      iconDetail: "曇り",
      src: "/nightBrokenClouds.jpg",
    },
    day_shower_rain: {
      apiKey: "09d",
      iconKey: "Shower",
      iconDetail: "にわか雨",
      src: "/dayShowerRain.jpg",
    },
    night_shower_rain: {
      apiKey: "09n",
      iconKey: "Shower",
      iconDetail: "にわか雨",
      src: "/nightShowerRain.jpg",
    },
    day_rain: {
      apiKey: "10d",
      iconKey: "Rainy",
      iconDetail: "雨",
      src: "/dayRain.jpg",
    },
    night_rain: {
      apiKey: "10n",
      iconKey: "Rainy",
      iconDetail: "雨",
      src: "/nightRain.jpg",
    },
    day_thunderstorm: {
      apiKey: "11d",
      iconKey: "Electric_Bolt",
      iconDetail: "雷",
      src: "/dayThunderstorm.jpg",
    },
    night_thunderstorm: {
      apiKey: "11n",
      iconKey: "Electric_Bolt",
      iconDetail: "雷",
      src: "/nightThunderstorm.jpg",
    },
    day_snow: {
      apiKey: "13d",
      iconKey: "Ac_Unit",
      iconDetail: "雪",
      src: "/daySnow.jpg",
    },
    night_snow: {
      apiKey: "13n",
      iconKey: "Ac_Unit",
      iconDetail: "雪",
      src: "/nightSnow.jpg",
    },
    day_mist: {
      apiKey: "50d",
      iconKey: "Foggy",
      iconDetail: "霧",
      src: "/dayMist.jpg",
    },
    night_mist: {
      apiKey: "50n",
      iconKey: "Foggy",
      iconDetail: "霧",
      src: "/nightMist.jpg",
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
