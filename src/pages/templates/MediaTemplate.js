import React from "react";

import MediaNav from "components/organisms/Nav/MediaNav";
import HeaderContainer from "components/organisms/Header/HeaderContainer";

const MediaTemplate = ({ children }) => {
  return (
    <>
      <HeaderContainer />
      <MediaNav />
      {children}
    </>
  );
};

export default MediaTemplate;
