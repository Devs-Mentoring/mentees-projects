import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { CurrentQueryType } from "./LibraryContext";
import { currentDate, initialFromDate } from "../constants/rawgParams";

export type FilteringParamsType = Record<string, CurrentQueryType[]>;

type FilterContextPropType = {
  children: JSX.Element;
};

type FilterContextType = {
  filteringParams: FilteringParamsType;
  setFilteringParams: Dispatch<SetStateAction<FilteringParamsType>>;
};

export const initialFilteringParams: FilteringParamsType = {
  genres: [],
  platform: [],
  publishers: [],
  metacritic: [
    { params: "0", queryKey: "metacritic-min" },
    { params: "100", queryKey: "metacritic-max" },
  ],
  dates: [
    { params: `${initialFromDate}`, queryKey: "filter-dates-from" },
    { params: `${currentDate}`, queryKey: "filter-dates-to" },
  ],
};

const defaultContextValue: FilterContextType = {
  filteringParams: {},
  setFilteringParams: () => null,
};

const FilterContext = createContext(defaultContextValue);

function FilterContextProvider(props: FilterContextPropType) {
  const { children } = props;
  const [filteringParams, setFilteringParams] = useState<FilteringParamsType>(
    initialFilteringParams,
  );

  const context = (): FilterContextType => {
    return {
      filteringParams: filteringParams,
      setFilteringParams: setFilteringParams,
    };
  };

  return (
    <FilterContext.Provider value={context()}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilterContext = (): FilterContextType =>
  useContext(FilterContext);

export default FilterContextProvider;
