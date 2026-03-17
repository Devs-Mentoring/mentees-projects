import React from "react";
import { ChevronDown as ChevronDownIcon } from "react-bootstrap-icons";
import { useSelect, UseSelectProps } from "downshift";
import clsx from "clsx";

import { CurrentQueryType } from "../../globals/contexts/LibraryContext";

import "./style.scss";

function Select(props: UseSelectProps<CurrentQueryType>) {
  const { items, selectedItem } = props;

  const { isOpen, getToggleButtonProps, getMenuProps, getItemProps } =
    useSelect({ ...props });

  return (
    <div className="select-wrapper rounded-1">
      <div className="select" {...getToggleButtonProps()}>
        <span>
          {selectedItem?.queryKey && selectedItem?.queryKey.length > 0
            ? selectedItem.queryKey
            : " "}
        </span>
        <span className="px-2">
          <ChevronDownIcon
            className={clsx("select-icon", { "select-icon_rotate": isOpen })}
          />
        </span>
      </div>
      <ul
        className={clsx("select-list", {
          "select-list_hidden": !isOpen,
        })}
        {...getMenuProps()}
      >
        {isOpen &&
          items.map((item, index) => {
            return (
              <li
                className={selectedItem === item ? "fw-bold" : ""}
                key={`${item.queryKey}${index}`}
                {...getItemProps({ item, index })}
              >
                <span>{item.queryKey}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Select;
