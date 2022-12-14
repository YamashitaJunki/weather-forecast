import { Dispatch, SetStateAction, useRef, useState } from "react";
import { availableCities } from "../lib/availableCities";
import styles from "../styles/Home.module.css";

type CitiesSelectFoamIn = {
  setCityIndex: Dispatch<SetStateAction<string>>;
};
type CitiesSelectFoamOut = JSX.Element;
type getPrefNameInFirst = string | undefined;
type getPrefNameOut = string;

const citiesList = availableCities();
export const CitiesSelectFoam = ({
  setCityIndex,
}: CitiesSelectFoamIn): CitiesSelectFoamOut => {
  const [error, seterror] = useState("");
  const inputEl = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    const value = inputEl.current?.value;
    const includeList = Object.keys(citiesList).filter(
      (city) => citiesList[city].name === value
    );
    if (includeList.length === 1) {
      setCityIndex(getPrefName(value));
      seterror("");
    } else if (includeList.length !== 1) {
      seterror("正しく都道府県を入力してください");
    }
  };

  return (
    <div>
      <input
        ref={inputEl}
        id="name"
        type="search"
        list="item"
        placeholder="例：北海道/札幌市"
        autoComplete="off"
      />
      <datalist id="item">
        {Object.entries(citiesList).map((city) => {
          return <option key="index" value={city[1].name}></option>;
        })}
      </datalist>
      <button onClick={handleClick} className={styles.submit}>
        送信
      </button>
      <div className={styles["explanation-text"]}>
        <div>各都道府県&#40;県庁所在地&#41;の天気予報がご覧いただけます。</div>
        <div>「〇〇県/〇〇市」の形で入力し「送信」ボタンを押してください。</div>
        <div>都道府県名や都市名を一部入力すると予測変換にて表示されます。</div>
      </div>
      <div className={styles["error-text"]}>{error}</div>
    </div>
  );
};

const getPrefName = (name: getPrefNameInFirst): getPrefNameOut => {
  let reading = "";
  Object.entries(citiesList).forEach((city) => {
    if (name == city[1].name) {
      reading = city[0];
    }
  });
  return reading;
};
