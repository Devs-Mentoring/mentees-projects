import axios from "axios";

import { CurrentQueryType } from "../contexts/LibraryContext";
import { currentDay, currentMonth } from "../constants/rawgParams";

export const baseRawgUrl = "https://api.rawg.io/api";
export const rawgSubUrls = {
  game: "/games",
};

const rawgClient = axios.create({
  baseURL: baseRawgUrl,
  headers: {
    "Content-type": "application/json",
  },
});

export const formatRawgDate = (date: Date) => {
  return `${date.getFullYear()}-${currentMonth}-${currentDay}`;
};

export function formatParams(
  paramsObj: Record<string, string | CurrentQueryType[]>,
) {
  return Object.keys(paramsObj)
    .map((param) => {
      if (paramsObj[param].length === 0) {
        return "";
      }
      if (typeof paramsObj[param] === "object") {
        const par = (paramsObj[param] as CurrentQueryType[]).map((item) => {
          if (param === "dates") {
            return formatRawgDate(new Date(item.params));
          }
          return item.params;
        });
        return `&${param}=${par.join(",")}`;
      } else {
        return `&${param}=${paramsObj[param]}`;
      }
    })
    .join("");
}

async function getRawgData<T>(
  url: string,
  params?: Record<string, string>,
): Promise<T> {
  let formattedUrlString = "";

  if (params) {
    formattedUrlString =
      url +
      "?key=" +
      process.env.REACT_APP_GAMING_LIBRARY_API_KEY +
      formatParams(params);
  } else {
    formattedUrlString = `${url}&key=${process.env.REACT_APP_GAMING_LIBRARY_API_KEY}`;
  }

  const response = await rawgClient.get<T>(formattedUrlString);
  return response.data;
}

export const RawgApiService = { getRawgData };
