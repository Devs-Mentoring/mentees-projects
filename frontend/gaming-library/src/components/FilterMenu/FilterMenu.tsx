import React, { FormEvent } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { UseSelectStateChange } from "downshift";
import { Button, Form } from "react-bootstrap";

import {
  CurrentQueryType,
  useLibContext,
} from "../../globals/contexts/LibraryContext";
import {
  initialFilteringParams,
  useFilterContext,
} from "../../globals/contexts/FilterContext";
import {
  genres,
  platform,
  publishers,
} from "../../globals/constants/rawgParams";
import { formatParams } from "../../globals/functions/rawgApi";
import { currentQueryConvert } from "../../globals/functions/helpers";
import Select from "../Select/Select";
import Multiselect from "../Multiselect/Multiselect";
import FilterSlider from "../FilterSlider/FilterSlider";
import ReleaseDateInput from "../ReleaseDateInput/ReleaseDateInput";
import FilterChipBox from "../FilterChipBox/FitlerChipBox";
import "./style.scss";

type PropTypes = {
  open: boolean;
  handleClose: () => void;
};

function FilterMenu(props: PropTypes) {
  const { open, handleClose } = props;
  const { setCurrentQuery } = useLibContext();
  const { filteringParams, setFilteringParams } = useFilterContext();

  const onSelectItem = (
    e: UseSelectStateChange<CurrentQueryType>,
    label: string,
  ) => {
    const { selectedItem } = e;
    const arr = [...filteringParams[label]];
    if (
      !arr.length ||
      (selectedItem && arr[0].queryKey !== selectedItem.queryKey)
    ) {
      arr[0] = selectedItem as CurrentQueryType;
      setFilteringParams((prevState) => ({ ...prevState, [`${label}`]: arr }));
    }
  };

  const handleReset = () => {
    setFilteringParams(initialFilteringParams);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentQuery({
      queryKey: "filter",
      params: formatParams(filteringParams) + "&search_precise=true",
    });
  };

  return (
    <Offcanvas show={open} onHide={handleClose} placement="end" backdrop={true}>
      <Form onSubmit={handleSubmit} className="filter-form">
        <Offcanvas.Header>
          <Offcanvas.Title>Filtering</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="offcanvas-body-item">
            <label id="genres">Genre:</label>
            <Multiselect labelId="genres" items={currentQueryConvert(genres)} />
          </div>
          <div className="offcanvas-body-item">
            <label id="platforms">Platforms:</label>
            <Multiselect
              labelId="platforms"
              items={currentQueryConvert(platform)}
            />
          </div>
          <div className="offcanvas-body-item">
            <label id="publishers">Publishers:</label>
            <Select
              labelId="publishers"
              selectedItem={filteringParams.publishers[0]}
              items={currentQueryConvert(publishers)}
              onSelectedItemChange={(e) => onSelectItem(e, "publishers")}
            />
          </div>
          <div className="offcanvas-body-item">
            <label htmlFor="critic-rating-slider">Critic rating:</label>
            {/*Select with multiple or input from user between 0-100*/}
            <FilterSlider />
          </div>
          <div className="offcanvas-body-item">
            <label htmlFor="release-year-input">Release date between:</label>
            {/*Date range input*/}
            <ReleaseDateInput />
          </div>
          <FilterChipBox />
        </Offcanvas.Body>
        <div className="offcanvas_button-wrapper">
          <Button type="submit" variant="secondary">
            Confirm
          </Button>
          <Button
            type="button"
            variant="outline-secondary"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </Form>
    </Offcanvas>
  );
}

export default FilterMenu;
