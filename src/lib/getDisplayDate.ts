import { AppException } from "../lib/AppException";

type GetDisplayDateIn = number;
type GetDisplayDateOut = {
  month: number;
  day: number;
  dayofweek: number;
  hour: number;
  minute: number;
  second: number;
  dayname: Array<string>;
};

export const getDisplayDate = (time: GetDisplayDateIn): GetDisplayDateOut => {
  // 曜日を日〜土の漢字で表示させるための定義
  const dayname = ["日", "月", "火", "水", "木", "金", "土"];

  try {
    const parsed = new Date(time * 1000);
    return {
      month: parsed.getMonth() + 1,
      day: parsed.getDate(),
      dayofweek: parsed.getDay(),
      hour: parsed.getHours(),
      minute: parsed.getMinutes(),
      second: parsed.getSeconds(),
      dayname: dayname,
    };
  } catch (errorMessage) {
    throw new AppException(
      time,
      "DateTemplateファイルの_getDisplayDate関数に入るtimeの値が日付形式ではありません。"
    );
  }
};
