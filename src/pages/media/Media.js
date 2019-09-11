import React from "react";
import { Route } from "react-router-dom";

import MediaTemplate from "pages/media/templates/MediaTemplate";

const Admin = () => {
  return (
    <MediaTemplate>
      <Route path='/media' render={() => `media`} />
    </MediaTemplate>
  );
};

export default Admin;
