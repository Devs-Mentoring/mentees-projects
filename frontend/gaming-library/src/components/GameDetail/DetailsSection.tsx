import React from "react";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

import MetaCriticBadge from "../MetaCriticBadge/MetaCriticBadge";
import { Game } from "../../globals/types/rawgTypes";

type PropTypes = {
  data: Game | undefined;
};

function DetailsSection(props: PropTypes) {
  const { data } = props;
  const rating = data?.rating || 0;
  const ratingTop = data?.rating_top || 0;
  const ratingsCount = data?.ratings_count || 0;
  const ratings = data?.ratings || [];
  const locale = window.navigator.language;
  const dateConvert =
    typeof data?.released === "string"
      ? Intl.DateTimeFormat(locale, {
          dateStyle: "medium",
          timeStyle: undefined,
        }).format(new Date(data?.released))
      : "-";

  return (
    <section className="game-detail_bottom-section">
      <div className="game-detail_row">
        <div className="game-detail_rating-summary">
          <div className="game-detail_rating-summary-row">
            <div className="game-detail_rating-summary-col">
              <span className="game-detail_main-rating">
                {rating} <span>of</span> {ratingTop}
              </span>
              <span>{ratingsCount} total reviews</span>
            </div>
            <MetaCriticBadge
              metaCriticRating={data?.metacritic}
              color="secondary"
            />
          </div>
          <div className="game-detail_rating-summary-col">
            {ratings && ratings.length ? (
              ratings.map((rating) => {
                return (
                  <div className="game-detail_rating-row" key="">
                    <span>&quot; {rating.title} &quot;</span>
                    <span className="game-detail_gauge">
                      <span style={{ width: `${rating.percent}%` }} />
                    </span>
                    <span>{rating.percent} %</span>
                  </div>
                );
              })
            ) : (
              <span>No Data</span>
            )}
          </div>
        </div>
        <div className="game-detail_details-summary">
          <div className="game-detail_grid-column">
            <span className="game-detail_grid-subheading">Release date</span>
            <span className="game-detail_grid-text">{dateConvert}</span>
          </div>
          <div className="game-detail_grid-column">
            <span className="game-detail_grid-subheading">Developed by</span>
            <span className="game-detail_grid-text">
              {data?.developers.map((d) => d.name).join(", ")}
            </span>
          </div>
          <div className="game-detail_grid-column">
            <span className="game-detail_grid-subheading">Published by</span>
            <span className="game-detail_grid-text">
              {data?.publishers.map((p) => p.name).join(", ")}
            </span>
          </div>
          <div className="game-detail_grid-column">
            <span className="game-detail_grid-subheading">Age rating</span>
            <span className="game-detail_grid-text">
              {data?.esrb_rating ? data?.esrb_rating.name : "-"}
            </span>
          </div>
          <div className="game-detail_grid-column">
            <span className="game-detail_grid-subheading">Playable on</span>
            <div className="game-detail_badge-wrapper">
              {data?.platforms.map((p) => (
                <Badge bg="secondary" key={`${p.platform.name}Badge`}>
                  {p.platform.name}
                </Badge>
              )) || <div />}
            </div>
          </div>
        </div>
      </div>
      <div className="game-detail_row game-detail_row-dark">
        <span className="game-detail_grid-subheading">Description</span>
        <span className="game-detail_grid-text fst-italic">{`" ${data?.description_raw} "`}</span>
      </div>
      <div className="game-detail_row ">
        <span className="game-detail_grid-subheading">Tags</span>
        <div className="game-detail_badge-wrapper">
          {data?.tags?.map((t) => (
            <Badge bg="secondary" key={`${t.name}Badge`}>
              {t.name}
            </Badge>
          )) || <div />}
        </div>
      </div>
      <div className="game-detail_row game-detail_row-dark">
        <span className="game-detail_grid-subheading">Websites</span>
        <div className="game-detail_link-row ">
          <span className="game-detail_grid-text">Official website</span>
          {data && data.website ? (
            <Link to={data?.website} target="_blank">
              {data?.website}
            </Link>
          ) : (
            <div>-</div>
          )}
        </div>
        <div className="game-detail_link-row ">
          <span className="game-detail_grid-text">Subreddit</span>
          {data && data.reddit_url ? (
            <Link to={data?.reddit_url} target="_blank">
              {data?.reddit_url}
            </Link>
          ) : (
            <div>-</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default DetailsSection;
