import { getRssFeed, ParsedFeedType } from "../functions/feedApi";
import { useInfiniteQuery } from "@tanstack/react-query";

const CORS_PROXY = "https://corsproxy.io/?";
const ignUrl = "https://www.ign.com/rss/articles/feed?tags=games";
const initialUrl = CORS_PROXY + ignUrl;

type FeedStateType = {
  feedItems: ParsedFeedType[];
  nextUrl: string | null;
};

const useRssFeed = () => {
  const {
    data,
    isLoading,
    isInitialLoading,
    hasNextPage,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery<FeedStateType>({
    queryKey: ["rssFeed", initialUrl],
    queryFn: ({ pageParam = initialUrl }) => getRssFeed(pageParam),
    getNextPageParam: (nextPage) => nextPage.nextUrl,
  });

  return {
    data,
    isLoading,
    isInitialLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
  };
};

export default useRssFeed;
