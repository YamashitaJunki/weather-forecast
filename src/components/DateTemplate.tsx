import { AppException } from "../lib/AppException";

type CurrentDateIn = {
  children: number;
};
type CurrentDateOut = JSX.Element;
type FutureDateIn = {
  children: number;
};
type FutureDateOut = JSX.Element;
type WeekDateIn = {
  children: number;
};
type WeekDateOut = JSX.Element;
type GetDisplayDateIn = number;
type GetDisplayDateOut = {
  month: number;
  day: number;
  dayofweek: number;
  hour: number;
  minute: number;
  second: number;
};
// 曜日を日〜土の漢字で表示させるための定義
const dayname = ["日", "月", "火", "水", "木", "金", "土"];

const _getDisplayDate = (time: GetDisplayDateIn): GetDisplayDateOut => {
  try {
    const parsed = new Date(time * 1000);
    return {
      month: parsed.getMonth() + 1,
      day: parsed.getDate(),
      dayofweek: parsed.getDay(),
      hour: parsed.getHours(),
      minute: parsed.getMinutes(),
      second: parsed.getSeconds(),
    };
  } catch (errorMessage) {
    throw new AppException(
      time,
      "DateTemplateファイルの_getDisplayDate関数に入るtimeの値が日付形式ではありません。"
    );
  }
};

export function CurrentDate({ children }: CurrentDateIn): CurrentDateOut {
  const { month, day, dayofweek, hour, minute } = _getDisplayDate(children);

  return (
    <div>
      <div>
        <div suppressHydrationWarning={true}>
          {month}/{day}({dayname[dayofweek]})
        </div>
        <div suppressHydrationWarning={true}>
          {hour}時{minute}分時点
        </div>
      </div>
    </div>
  );
}

export function SunriseDate({ children }: CurrentDateIn): CurrentDateOut {
  const { hour, minute } = _getDisplayDate(children);

  return (
    <div suppressHydrationWarning={true}>
      日の出：{hour}時{minute}分
    </div>
  );
}

export function SunsetDate({ children }: CurrentDateIn): CurrentDateOut {
  const { hour, minute } = _getDisplayDate(children);

  return (
    <div suppressHydrationWarning={true}>
      日の入：{hour}時{minute}分
    </div>
  );
}

export function FutureDate({ children }: FutureDateIn): FutureDateOut {
  const { month, day, dayofweek, hour } = _getDisplayDate(children);

  return (
    <th suppressHydrationWarning={true}>
      {month}月{day}日(
      {dayname[dayofweek]}
      )&nbsp;
      {hour}時
    </th>
  );
}
export function WeekDate({ children }: WeekDateIn): WeekDateOut {
  const { month, day, dayofweek } = _getDisplayDate(children);

  return (
    <div>
      {month}月{day}日(
      {dayname[dayofweek]})
    </div>
  );
}
