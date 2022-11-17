import { GetServerSideProps } from "next";
import Head from "next/head";
import {
  CityWeatherController,
  GetWeatherInfoCurrent,
  CityWeather,
} from "../lib/WeatherInfoController";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { availableCities } from "../lib/availableCities";
import { useState } from "react";
import { CitiesSelectFoam } from "../components/CitiesSelectFoam";
import {
  CurrentDate,
  SunriseDate,
  SunsetDate,
  FutureDate,
} from "../components/DateTemplate";
import { getIconAndBackGroundByAPI } from "../lib/weatherIconsAndBackGrounds";

type HomeIn = {
  weathers: CityWeather;
};
type HomeOut = JSX.Element;

type GetServerSidePropsOut = {
  props: {
    weathers: Array<{
      city: string;
      current: GetWeatherInfoCurrent;
      futures: Array<{
        fetchedDate: number;
      }>;
    }>;
  };
};

const Home = ({ weathers }: HomeIn): HomeOut => {
  const [cityIndex, setCityIndex] = useState<number>(12);
  return (
    <div>
      <Head>
        <title>現在の天気予報</title>
      </Head>
      <main className={`${styles.main} delayed-image`}>
        <Image
          src={getIconAndBackGroundByAPI(weathers[cityIndex].current?.icon).src}
          layout="fill"
          objectFit="cover"
          alt="background"
        />
        <div className={styles.box}>
          <div className={styles["box-top"]}>
            <h3 className={styles.title}>WeatherForecast</h3>
            <div className={styles["top-form"]}>
              <CitiesSelectFoam
                setCityIndex={setCityIndex}
                weathers={weathers}
              ></CitiesSelectFoam>
              <div></div>
            </div>
          </div>
          <div className={styles["box-bottom"]}>
            <div className={styles["bottom-current"]}>
              <div className={styles["current-left"]}>
                <div className={styles["left-measure"]}>
                  <div className={styles["text-left"]}>
                    <div>
                      {weathers[cityIndex].current.temperature.measure}℃
                    </div>
                    <div className={styles.detail}>
                      {
                        getIconAndBackGroundByAPI(
                          weathers[cityIndex].current?.icon
                        ).iconDetail
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles["current-center"]}>
                <div className={styles["text-center"]}>
                  <div>
                    <div>
                      {availableCities()[weathers[cityIndex].city].name}
                    </div>
                    <div>
                      <CurrentDate>
                        {weathers[cityIndex].current.fetchedDate}
                      </CurrentDate>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles["current-right"]}>
                <div className={styles["text-right"]}>
                  <div>風速:{weathers[cityIndex].current.windSpeed}m/s</div>
                  <SunriseDate>
                    {weathers[cityIndex].current.sunrise}
                  </SunriseDate>
                  <SunsetDate>{weathers[cityIndex].current.sunset}</SunsetDate>
                  <div>
                    体感温度:{weathers[cityIndex].current.temperature.feelsLike}
                    ℃
                  </div>
                </div>
              </div>
            </div>
            <div className={styles["bottom-future"]}>
              <table className={styles["bottom-table"]}>
                <thead>
                  <tr>
                    {weathers[cityIndex].futures.map((day) => {
                      return (
                        <FutureDate key="index">{day.fetchedDate}</FutureDate>
                      );
                    })}
                  </tr>
                  <tr>
                    {weathers[cityIndex].futures.map((day) => {
                      return <td key="index">{day.temperature.measure}℃</td>;
                    })}
                  </tr>
                  <tr>
                    {weathers[cityIndex].futures.map((day) => {
                      return (
                        <td key="index">
                          <div className="material-symbols-outlined">
                            {getIconAndBackGroundByAPI(day.icon).iconKey}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps =
  async (): Promise<GetServerSidePropsOut> => {
    const weathers = await CityWeatherController.excute();

    return {
      props: {
        weathers,
      },
    };
  };
