import React from "react";

import AdminNav from "components/organisms/Nav/AdminNav";
import HeaderContainer from "components/organisms/Header/HeaderContainer";

const AdminTemplate = ({ children }) => {
  return (
    <>
      <HeaderContainer />
      <AdminNav />
      {children}
    </>
  );
};

export default AdminTemplate;
