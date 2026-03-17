import React from "react";
import {
  useSelect,
  UseSelectProps,
  UseSelectState,
  UseSelectStateChangeOptions,
} from "downshift";
import { ChevronDown as ChevronDownIcon } from "react-bootstrap-icons";
import clsx from "clsx";

import { CurrentQueryType } from "../../globals/contexts/LibraryContext";
import { useFilterContext } from "../../globals/contexts/FilterContext";
import "./style.scss";

function stateReducer(
  state: UseSelectState<CurrentQueryType>,
  actionAndChanges: UseSelectStateChangeOptions<CurrentQueryType>,
) {
  const { changes, type } = actionAndChanges;
  switch (type) {
    case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
    case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
    case useSelect.stateChangeTypes.ItemClick:
      return {
        ...changes,
        isOpen: true, // keep menu open after selection.
        highlightedIndex: state.highlightedIndex,
      };
    default:
      return changes;
  }
}

function Multiselect(props: UseSelectProps<CurrentQueryType>) {
  const { labelId, ...rest } = props;
  const { filteringParams, setFilteringParams } = useFilterContext();
  const selectedItems = [...filteringParams[labelId + ""]];

  const { isOpen, getToggleButtonProps, getMenuProps, getItemProps } =
    useSelect({
      ...rest,
      labelId: labelId,
      stateReducer: stateReducer,
      onSelectedItemChange: ({ selectedItem }) => {
        if (!selectedItem) {
          return;
        }
        let newSelectedItems = [];
        const isCurrentlySelected = selectedItems.some(
          (item) => item.queryKey === selectedItem.queryKey,
        );

        if (isCurrentlySelected) {
          newSelectedItems = selectedItems.filter(
            (item) => item.queryKey !== selectedItem.queryKey,
          );
        } else {
          newSelectedItems = [...selectedItems, selectedItem];
        }

        setFilteringParams({
          ...filteringParams,
          [labelId as string]: newSelectedItems,
        });
      },
    });

  const selectItemText = selectedItems.length
    ? `${selectedItems.length} element${
        selectedItems.length > 1 ? "s" : ""
      } selected`
    : "";

  return (
    <div className="multiselect rounded-1">
      <div {...getToggleButtonProps()}>
        <span>{selectItemText}</span>
        <span className="px-2">
          <ChevronDownIcon
            className={clsx("multiselect-icon", {
              "multiselect-icon_rotate": isOpen,
            })}
          />
        </span>
      </div>
      <ul
        className={clsx("multiselect-list", {
          "multiselect-list_hidden": !isOpen,
        })}
        {...getMenuProps()}
      >
        {isOpen &&
          props.items.map((item, index) => {
            return (
              <li
                key={`${item.queryKey}`}
                {...getItemProps({
                  item,
                  index,
                  "aria-selected": selectedItems.some(
                    (i) => i.queryKey === item.queryKey,
                  ),
                })}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={selectedItems.some(
                    (i) => i.queryKey === item.queryKey,
                  )}
                  value={item.queryKey}
                  onChange={() => null}
                />
                <span>{item.queryKey}</span>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Multiselect;
