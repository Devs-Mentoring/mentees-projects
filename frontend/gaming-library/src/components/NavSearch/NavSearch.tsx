import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { Search as SearchIcon, X as CloseIcon } from "react-bootstrap-icons";
import { useMutation } from "@tanstack/react-query";

import SearchSuggestionList from "../SearchSuggestionList/SearchSuggestionList";

import { GamesResultsType } from "globals/types/rawgTypes";
import { RawgApiService, rawgSubUrls } from "../../globals/functions/rawgApi";

import "./style.scss";

function NavSearch() {
  const [input, setInput] = useState("");
  const searchRef = useRef(null);

  const searchParam = `${rawgSubUrls.game}?search=${input}&page_size=4`;

  const { getRawgData } = RawgApiService;
  const gameSearchMutation = useMutation<GamesResultsType>({
    mutationKey: [`gameSearch=${input.trim}`],
    mutationFn: () => getRawgData(searchParam),
  });

  useEffect(() => {
    const debounceFn = setTimeout(() => {
      if (input.length > 0) {
        gameSearchMutation.mutate();
      }
    }, 500);

    return () => clearTimeout(debounceFn);
  }, [input]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  // TODO redirect and add listener on enter or remove this at all
  const handleSubmit = () => {};

  const clearInput = () => setInput("");

  return (
    <InputGroup>
      <Form.Control
        ref={searchRef}
        type="input"
        onSubmit={handleSubmit}
        value={input}
        onChange={handleChange}
      />
      <span className="search-icon_wrapper">
        <SearchIcon size="15" />
      </span>
      {input.length > 0 && (
        <span className="close-icon_wrapper" onClick={clearInput}>
          <CloseIcon size="25" />
        </span>
      )}

      <SearchSuggestionList
        input={input}
        clearInput={clearInput}
        data={input.length > 0 ? gameSearchMutation.data : undefined}
        loading={gameSearchMutation.isLoading}
      />
    </InputGroup>
  );
}

export default NavSearch;
