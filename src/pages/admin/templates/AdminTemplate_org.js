import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AdminNav from 'components/organisms/Nav/AdminNav';
import HeaderContainer from 'components/organisms/Header/HeaderContainer';

const adminTemplateStyles = makeStyles({
  root: {
    display: 'grid'
  },
  mainSplit: {
    display: 'grid',
    gridTemplateColumns: '250px 1fr'
  }
});

const AdminTemplate = ({ children }) => {
  const classes = adminTemplateStyles();

  return (
    <div className={classes.root}>
      <HeaderContainer />
      <div className={classes.mainSplit}>
        <AdminNav />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AdminTemplate;
