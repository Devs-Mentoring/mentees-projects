import React from "react";
import DatePicker from "react-datepicker";

import { useFilterContext } from "../../globals/contexts/FilterContext";
import { initialFromDate } from "../../globals/constants/rawgParams";

import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";

const dateFormat = "dd/MM/yyyy";

function formatAndValidateYearsInput(from: Date, to: Date) {
  const fromObj = {
    queryKey: "filter-dates-from",
    params: `${from}`,
  };

  const toObj = {
    queryKey: "filter-dates-to",
    params: `${to}`,
  };

  return [fromObj, toObj];
}

function ReleaseDateInput() {
  const { filteringParams, setFilteringParams } = useFilterContext();

  const handleChange = (val: Date, field: "from" | "to") => {
    const fromVal =
      field === "from" ? val : new Date(filteringParams.dates[0].params);
    const toVal =
      field === "to" ? val : new Date(filteringParams.dates[1].params);

    const newDatesObj = formatAndValidateYearsInput(fromVal, toVal);

    setFilteringParams((prev) => ({
      ...prev,
      dates: newDatesObj,
    }));
  };

  const fromVal = new Date(filteringParams.dates[0].params);
  const toVal = new Date(filteringParams.dates[1].params);

  return (
    <div className="wrapper" style={{ zIndex: "auto" }}>
      <div className="wrapper">
        <div>
          <label>From:</label>
          <DatePicker
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            className="form-control date-input"
            selected={fromVal}
            dateFormat={dateFormat}
            placeholderText="from"
            onChange={(date) => handleChange(date || initialFromDate, "from")}
          />
        </div>

        <div>
          <label>To:</label>
          <DatePicker
            className="form-control date-input"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            selected={toVal}
            dateFormat={dateFormat}
            placeholderText="to"
            onChange={(date) => handleChange(date || new Date(), "to")}
          />
        </div>
      </div>
    </div>
  );
}

export default ReleaseDateInput;
