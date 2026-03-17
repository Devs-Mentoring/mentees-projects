import React from "react";
import clsx from "clsx";

import "./style.scss";

type PropTypes = {
  metaCriticRating: number | undefined;
  color: "primary" | "secondary";
};

function MetaCriticBadge(props: PropTypes) {
  const { metaCriticRating, color } = props;

  return (
    <span
      className={clsx("metacritic-badge_wrapper", {
        "metacritic-badge_primary": color === "primary",
        "metacritic-badge_secondary": color === "secondary",
      })}
    >
      {metaCriticRating ? metaCriticRating + "%" : "---"}
    </span>
  );
}

export default MetaCriticBadge;
