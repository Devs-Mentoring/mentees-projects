import React from "react";
import ReactSlider from "react-slider";
import { useFilterContext } from "../../globals/contexts/FilterContext";
import "./style.scss";

function FilterSlider() {
  const { filteringParams, setFilteringParams } = useFilterContext();
  function handleChange(value: number[]) {
    const min = { queryKey: "metacritic-min", params: `${value[0]}` };
    const max = { queryKey: "metacritic-max", params: `${value[1]}` };

    setFilteringParams({ ...filteringParams, metacritic: [min, max] });
  }

  return (
    <ReactSlider
      className="slider-wrapper"
      thumbClassName="slider-thumb"
      trackClassName="slider-track"
      onAfterChange={handleChange}
      min={0}
      max={100}
      defaultValue={[0, 100]}
      value={[
        parseInt(filteringParams.metacritic[0].params),
        parseInt(filteringParams.metacritic[1].params),
      ]}
      ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
      renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
      pearling
    />
  );
}

export default FilterSlider;
