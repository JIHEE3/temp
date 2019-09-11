import React from "react";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";

const useStyles = makeStyles({
  root: {
    width: "100%"
  }
});

const MediaNav = ({ history, location }) => {
  const { pathname = "/media/management" } = location;
  const classes = useStyles();
  const [value, setValue] = React.useState(pathname);

  if (value !== pathname) {
    setValue(pathname);
  }

  function handleChange(event, newValue) {
    setValue(newValue);
    history.push(newValue);
  }

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
      showLabels
    >
      <BottomNavigationAction
        label='광고관리'
        value='/media/management'
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label='일자별통계'
        value='/media/statistics'
        icon={<FavoriteIcon />}
      />
    </BottomNavigation>
  );
};

export default withRouter(MediaNav);
