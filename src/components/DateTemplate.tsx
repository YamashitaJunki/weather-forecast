import { getDisplayDate } from "../lib/getDisplayDate";

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

export function CurrentDate({ children }: CurrentDateIn): CurrentDateOut {
  const { month, day, dayofweek, hour, minute, dayname } =
    getDisplayDate(children);

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
  const { hour, minute } = getDisplayDate(children);

  return (
    <div suppressHydrationWarning={true}>
      日の出：{hour}時{minute}分
    </div>
  );
}

export function SunsetDate({ children }: CurrentDateIn): CurrentDateOut {
  const { hour, minute } = getDisplayDate(children);

  return (
    <div suppressHydrationWarning={true}>
      日の入：{hour}時{minute}分
    </div>
  );
}

export function FutureDate({ children }: FutureDateIn): FutureDateOut {
  const { month, day, dayofweek, hour, dayname } = getDisplayDate(children);

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
  const { month, day, dayofweek, dayname } = getDisplayDate(children);

  return (
    <div>
      {month}月{day}日(
      {dayname[dayofweek]})
    </div>
  );
}
