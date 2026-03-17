import React, { useId, useRef, useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  CurrentQueryType,
  useLibContext,
} from "globals/contexts/LibraryContext";
import { UseSelectStateChange } from "downshift";
import { Filter as FilterIcon } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

import GameTile from "components/GameTile/GameTile";
import LoadingSpinner from "components/LoadingSpinner/LoadingSpinner";
import Select from "../../components/Select/Select";
import FilterMenu from "../../components/FilterMenu/FilterMenu";
import FilterContextProvider from "../../globals/contexts/FilterContext";

import { RawgApiService } from "globals/functions/rawgApi";
import { GamesResultsType } from "globals/types/rawgTypes";
import { rawgParams } from "globals/constants/rawgParams";
import { currentQueryConvert } from "../../globals/functions/helpers";
import "./style.scss";

function GameLibrary() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentQuery, setCurrentQuery, initialUrl } = useLibContext();

  const id = useId();
  const gameRef = useRef<HTMLDivElement>(null);

  const { getRawgData } = RawgApiService;
  const { data, isLoading, error, fetchNextPage, isFetching, hasNextPage } =
    useInfiniteQuery<GamesResultsType>({
      queryKey: [currentQuery.queryKey, initialUrl],
      queryFn: ({ pageParam = initialUrl }) => getRawgData(pageParam),
      getNextPageParam: (lastPage) => lastPage.next,
    });

  const handleClose = () => {
    setMenuOpen(false);
  };

  const handleSelect = (e: UseSelectStateChange<CurrentQueryType>) => {
    const { selectedItem } = e;
    setCurrentQuery(selectedItem as CurrentQueryType);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!hasNextPage) return;
          if (entry.isIntersecting) {
            fetchNextPage();
          }
        });
      },
      {
        rootMargin: "0px 0px 400px 0px",
      },
    );

    if (gameRef.current && hasNextPage) {
      observer.observe(gameRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isLoading, hasNextPage]);

  if (error) return <div>{`Request Failed - ${error}`}</div>;

  const selectItems = currentQueryConvert(rawgParams);

  return (
    <section className="section-wrapper">
      <div className="filtering-wrapper">
        <Select
          items={selectItems}
          onSelectedItemChange={(e) => handleSelect(e)}
          defaultSelectedItem={selectItems[0]}
          selectedItem={selectItems.find(
            (i) => i.queryKey === currentQuery.queryKey,
          )}
        />
        <Button
          className="filtering-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FilterIcon size="30" />
        </Button>
      </div>

      {!isLoading && data?.pages && (
        <>
          <div className="tiles-wrapper">
            {data.pages.map((group) => {
              return group.results.map((game) => {
                return <GameTile game={game} key={`${id}${game.name}`} />;
              });
            })}
            {data?.pages[0].count === 0 && (
              <div className="no-more">No Results</div>
            )}
          </div>
          {!hasNextPage && !isFetching && data?.pages?.[0]?.count > 0 && (
            <div className="no-more">No more entries</div>
          )}
        </>
      )}

      {data && <span ref={gameRef} />}
      {isFetching && <LoadingSpinner />}

      <FilterContextProvider>
        <FilterMenu open={menuOpen} handleClose={handleClose} />
      </FilterContextProvider>
    </section>
  );
}

export default GameLibrary;
