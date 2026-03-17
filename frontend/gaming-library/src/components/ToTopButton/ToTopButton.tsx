import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { ChevronUp as ChevronUpIcon } from "react-bootstrap-icons";

import "./style.scss";

function ToTopButton() {
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      window.scrollY > 300 ? setShowBtn(true) : setShowBtn(false);
    };

    window.addEventListener("scroll", handleVisibility);

    return () => {
      window.removeEventListener("scroll", handleVisibility);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      className={`to-top-btn ${showBtn ? "scale_in" : "scale_out"}`}
      onClick={handleScrollToTop}
    >
      <ChevronUpIcon size={25} />
    </Button>
  );
}

export default ToTopButton;
