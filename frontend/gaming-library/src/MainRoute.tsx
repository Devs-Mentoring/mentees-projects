import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import GameDetail from "components/GameDetail/GameDetail";
import GameLibrary from "pages/GameLibrary/GameLibrary";
import NotFound from "pages/NotFound/NotFound";
import Home from "pages/Home/Home";
import LibContextProvider from "globals/contexts/LibraryContext";

export const HOME_ROUTE = "/";
export const LIBRARY_ROUTE = "/lib";

function MainRoute() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== LIBRARY_ROUTE && window.scrollY !== 0) {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return (
    <>
      <Routes>
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={`${LIBRARY_ROUTE}/*`} element={<LibContextProvider />}>
          <Route index element={<GameLibrary />} />
          <Route path={`:id`} element={<GameDetail />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default MainRoute;
