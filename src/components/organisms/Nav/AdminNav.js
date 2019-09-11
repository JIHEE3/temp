import React from "react";
import { withRouter } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FolderIcon from "@material-ui/icons/Folder";
import RestoreIcon from "@material-ui/icons/Restore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const useStyles = makeStyles({
  root: {
    width: "100%"
  }
});

const AdminNav = ({ history, location }) => {
  const { pathname = "/admin/management" } = location;
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
        label='관리상품관리'
        value='/admin/management'
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label='통계'
        value='/admin/statistics'
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label='애드익스(외부연동)'
        value='/admin/admix'
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label='광고송출리스트'
        value='/admin/mediaLive'
        icon={<FolderIcon />}
      />
      <BottomNavigationAction
        label='이미지검수'
        value='/admin/checkImg'
        icon={<RestoreIcon />}
      />
      <BottomNavigationAction
        label='기타'
        value='/admin/etc'
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label='RTB'
        value='/admin/RTB'
        icon={<LocationOnIcon />}
      />
    </BottomNavigation>
  );
};

export default withRouter(AdminNav);
