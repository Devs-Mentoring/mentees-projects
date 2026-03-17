import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  ListGroup,
  ListGroupItem,
  Image,
} from "react-bootstrap";
import { ChevronRight as ChevronRightIcon } from "react-bootstrap-icons";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import { GamesResultsType } from "../../globals/types/rawgTypes";
import { LIBRARY_ROUTE } from "../../MainRoute";

import "./style.scss";

type PropTypes = {
  input: string;
  clearInput: () => void;
  data: GamesResultsType | undefined;
  loading: boolean;
};

function SearchSuggestionList(props: PropTypes) {
  const { input, clearInput, data, loading } = props;
  const navigate = useNavigate();

  if (loading)
    return (
      <div className="suggestion_wrapper">
        <LoadingSpinner />
      </div>
    );

  if (!data || data.results.length === 0) {
    return (
      <div className="suggestion_wrapper">
        <span className="text_wrapper">No data</span>
      </div>
    );
  }

  const handleListItemClick = (slug: string) => {
    navigate(`${LIBRARY_ROUTE}/${slug}`);
  };

  const handleMoreCLick = () => {
    navigate(`${LIBRARY_ROUTE}`, {
      state: {
        queryKey: `gameSearch=${input.trim()}`,
        params: `search=${input}`,
      },
    });
    clearInput();
  };

  return (
    <ListGroup className="suggestion_wrapper">
      {data.results &&
        data.results.map((game) => (
          <ListGroupItem
            type="button"
            onClick={() => handleListItemClick(game.slug)}
            key={`${game.name}Suggestion`}
          >
            <div className="img_wrapper">
              <Image alt={`${game.name}_logo`} src={game.background_image} />
            </div>
            <div className="text_wrapper">
              <span>{game.name}</span>
              <span className="badge_wrapper">
                {game.genres.map((genre) => (
                  <Badge bg="secondary" key={`${genre.name}Badge`}>
                    {genre.name}
                  </Badge>
                ))}
              </span>
            </div>
          </ListGroupItem>
        ))}
      <div className="result-text_row">
        <span>Results: {data.count || "-"}</span>
        {data.count && data.count > 4 ? (
          <Button variant="secondary" onClick={handleMoreCLick}>
            More <ChevronRightIcon />
          </Button>
        ) : (
          <div />
        )}
      </div>
    </ListGroup>
  );
}

export default SearchSuggestionList;
