// GAME TYPES
export type PlatformsType = {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
};

export type TagsType = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  language: string;
  image_background: string;
};

export type GenresType = {
  id: number;
  name: string;
  slug: string;
};

export type PublishersType = {
  name: string;
};

export type DevelopersType = {
  id: number;
  image_background: string;
  name: string;
  slug: string;
};

export type EsrbRatingType = {
  id: number;
  name: string;
  slug: string;
};

export type RatingsType = {
  id: number;
  count: number;
  percent: number;
  title: string;
};

export type Game = {
  slug: string;
  name: string;
  description_raw: string;
  platforms: PlatformsType[];
  developers: DevelopersType[];
  publishers: PublishersType[];
  esrb_rating: EsrbRatingType;
  released: string;
  background_image: string;
  metacritic: number;
  id: number;
  tags?: TagsType[];
  genres: GenresType[];
  rating: number;
  ratings: RatingsType[];
  ratings_count: number;
  rating_top: number;
  reddit_url: string;
  website: string;
};

export type GamesResultsType = {
  count: number;
  next: string;
  results: Game[];
};

export type GameParams = {
  dates: string;
  kdates: string;
  ordering: string;
  metacritic: string;
  exclude_additions: string;
};

// GAME SCREENSHOTS

export type GameScreenshotType = {
  id: number;
  height: number;
  width: number;
  image: string;
};

export type GameScreenshotResultsType = {
  count: number;
  results: GameScreenshotType[];
};
