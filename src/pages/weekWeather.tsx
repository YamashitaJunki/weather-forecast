import { GetServerSideProps } from "next";
import Head from "next/head";
import { CityWeekWeatherController, Week } from "../lib/WeatherInfoController";
import styles from "../styles/WeekWeather.module.css";
import Image from "next/image";
import { availableCities } from "../lib/availableCities";
import { useState } from "react";
import { CitiesSelectFoam } from "../components/CitiesSelectFoam";
import { useRouter } from "next/router";
import { Line } from "react-chartjs-2";
import { CategoryScale, CoreChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Chart from "chart.js/auto";
import { _DeepPartialObject } from "chart.js/types/utils";
import Link from "next/link";

Chart.register(CategoryScale);
Chart.register(ChartDataLabels);

type GetServerSidePropsOut = {
  props: {
    weathers: { [key: string]: Week };
  };
};

type WeekWeatherIn = {
  weathers: { [key: string]: Week };
};
type WeekWeatherOut = JSX.Element;

const WeekWeather = ({ weathers }: WeekWeatherIn): WeekWeatherOut => {
  const router = useRouter();
  const [cityIndex, setCityIndex] = useState(String(router.query.cityIndex));

  return (
    <div>
      <Head>
        <title>１週間の天気予報</title>
      </Head>
      <main className={`${styles.main} delayed-image`}>
        <Image src="/weekWeather.jpeg" layout="fill" objectFit="cover" quality={100} alt="背景画像" />
        <div className={styles.box}>
          <div className={styles["box-top"]}>
            <h3 className={styles.title}>
              <div>WeeklyWeather</div>
              <div>Forecast</div>
            </h3>
            <div className={styles["top-form"]}>
              <CitiesSelectFoam setCityIndex={setCityIndex}></CitiesSelectFoam>
            </div>
          </div>
          <div className={styles["box-bottom"]}>
            <div className={styles.city}>{availableCities()[weathers[cityIndex].city].name}</div>
            <div className={styles["bottom"]}>
              <Line data={weathers[cityIndex].data} options={weathers[cityIndex].options as _DeepPartialObject<CoreChartOptions<"line">>} />
              <div className={styles.back}>
                <Link href="/">←本日の天気予報ページに戻る</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default WeekWeather;

export const getServerSideProps: GetServerSideProps = async (): Promise<GetServerSidePropsOut> => {
  const weathers = await CityWeekWeatherController();

  return {
    props: {
      weathers,
    },
  };
};
