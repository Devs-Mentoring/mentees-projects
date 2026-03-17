import React from "react";
import { useFilterContext } from "../../globals/contexts/FilterContext";
import FilterChip from "../FilerChip/FilterChip";
import "./style.scss";

function FilterChipBox() {
  const { filteringParams, setFilteringParams } = useFilterContext();

  const render = Object.entries(filteringParams).map((item) => {
    const paramName = item[0];
    const queries = item[1];
    const onClose = (itemName: string) => {
      const filteredParams = filteringParams[paramName].filter(
        (i) => i.queryKey !== itemName
      );
      setFilteringParams({ ...filteringParams, [paramName]: filteredParams });
    };

    return queries.map((query) => {
      if (
        query.queryKey === "filter-dates-from" ||
        query.queryKey === "filter-dates-to" ||
        query.queryKey === "metacritic-min" ||
        query.queryKey === "metacritic-max"
      )
        return null;
      return (
        <FilterChip
          key={`${query.queryKey}Chip`}
          value={query.queryKey}
          onClose={() => onClose(query.queryKey)}
        />
      );
    });
  });
  return <div className="chip-wrapper p-2 rounded-1">{render.flat(1)}</div>;
}

export default FilterChipBox;
