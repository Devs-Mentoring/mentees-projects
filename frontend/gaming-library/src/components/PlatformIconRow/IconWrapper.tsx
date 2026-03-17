import React from "react";

type PropTypes = {
  icon: JSX.Element;
};

function IconWrapper(props: PropTypes) {
  const { icon } = props;
  return <li className="mx-1">{icon}</li>;
}

export default IconWrapper;
