import React from "react";
import { Link } from "react-router-dom";
import { Image, Card } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";

import PlatformIconRow from "../PlatformIconRow/PlatformIconRow";
import MetaCriticBadge from "../MetaCriticBadge/MetaCriticBadge";

import { Game } from "globals/types/rawgTypes";
import { LIBRARY_ROUTE } from "../../MainRoute";

import "./style.scss";

type PropTypes = {
  game: Game;
};

function GameTile(props: PropTypes) {
  const { game } = props;
  const { name, background_image, platforms, slug, metacritic } = game;

  return (
    <Fade>
      <Link to={`${LIBRARY_ROUTE}/${slug}`}>
        <Card>
          <div className="img-container">
            <Image src={background_image} alt="game-img" />
          </div>
          <div className="rating-container">
            <MetaCriticBadge metaCriticRating={metacritic} color="primary" />
          </div>
          <Card.Header>
            <Card.Title>{name}</Card.Title>
            <PlatformIconRow platforms={platforms} />
          </Card.Header>
        </Card>
      </Link>
    </Fade>
  );
}

export default GameTile;
