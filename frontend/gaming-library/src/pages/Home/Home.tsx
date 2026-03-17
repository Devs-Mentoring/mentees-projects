import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { Fade } from "react-awesome-reveal";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import NewsTile from "../../components/NewsTile/NewsTile";
import HomeCarousel from "../../components/HomeCarousel/HomeCarousel";

import useRssFeed from "../../globals/hooks/useRssFeed";
import { RawgApiService } from "../../globals/functions/rawgApi";
import { rawgParams } from "../../globals/constants/rawgParams";
import { GamesResultsType } from "../../globals/types/rawgTypes";

import "./style.scss";

function Home() {
  const {
    data,
    isLoading: isRssLoading,
    isInitialLoading: isRssInitialLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useRssFeed();
  const { getRawgData } = RawgApiService;

  const colEndRef = useRef(null);

  const {
    data: upcomingGamesData,
    isLoading: isUpcomingGamesLoading,
    isInitialLoading: isUpcomingGamesInitialLoading,
  } = useQuery<GamesResultsType>({
    queryKey: ["upcoming-games-home"],
    queryFn: () =>
      getRawgData(`/games?page_size=6${rawgParams["Upcoming Games"]}`),
  });

  const isInitialLoading = isRssInitialLoading || isUpcomingGamesInitialLoading;

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

    if (colEndRef.current && hasNextPage) {
      observer.observe(colEndRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [isRssLoading, hasNextPage]);

  return (
    <Container fluid="true" className="home-container">
      {isInitialLoading ? (
        <LoadingSpinner />
      ) : (
        <Fade>
          <section className="carousel-section">
            {isUpcomingGamesLoading && !isUpcomingGamesInitialLoading ? (
              <LoadingSpinner />
            ) : (
              <HomeCarousel data={upcomingGamesData?.results || []} />
            )}
          </section>
          <h1>IGN News</h1>
          <section className="news-section">
            <Fade>
              {data?.pages &&
                data.pages.map((pages) => {
                  return pages.feedItems.map((item) => {
                    return <NewsTile key={`${item.title}tile`} data={item} />;
                  });
                })}
            </Fade>
          </section>
          {(isRssLoading || isFetching) && !isRssInitialLoading && (
            <div className="loading-spacing">
              <LoadingSpinner />
            </div>
          )}
        </Fade>
      )}
      {data && <span ref={colEndRef} />}
    </Container>
  );
}

export default Home;
