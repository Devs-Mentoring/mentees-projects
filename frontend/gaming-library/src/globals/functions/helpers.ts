import { CurrentQueryType } from "../contexts/LibraryContext";

export function currentQueryConvert(
  obj: Record<string, string>,
): CurrentQueryType[] {
  return Object.entries(obj).map((entry) => {
    return { queryKey: entry[0], params: entry[1] };
  });
}

export const getCurrentMonth = function () {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  } else {
    return month;
  }
};

export const getCurrentDay = function () {
  const day = new Date().getDate();
  if (day < 10) {
    return `0${day}`;
  } else {
    return day;
  }
};
