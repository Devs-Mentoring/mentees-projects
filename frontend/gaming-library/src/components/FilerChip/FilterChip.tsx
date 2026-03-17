import React from "react";
import { XLg as CloseIcon } from "react-bootstrap-icons";

import "./style.scss";
import { Button } from "react-bootstrap";

type PropTypes = {
  value: string;
  onClose: () => void;
};

function FilterChip(props: PropTypes) {
  const { value, onClose } = props;

  return (
    <div className="filter-chip_wrapper">
      <span className="filter-chip_text small">{value}</span>
      <Button onClick={onClose} className="filter-chip_btn p-1">
        <CloseIcon />
      </Button>
    </div>
  );
}

export default FilterChip;
