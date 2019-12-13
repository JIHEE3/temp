import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/pro-solid-svg-icons';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';

const useStyles = makeStyles(theme => ({
  root: {
    // minHeight: '353px',
    borderRadius: '4px',
    border: `solid 1px ${theme.palette.box.secondaryBorderColor}`,
    marginTop: '34px',
  },
  bar: {
    display: 'flex',
    height: '47px',
    alignItems: 'center',
    '&.open': {
      borderBottom: `solid 1px ${theme.palette.box.secondaryBorderColor}`,
    },
  },
  label: {
    fontSize: '16px',
    fontWeight: 400,
    color: theme.palette.common.black,
    marginLeft: '19px',
  },
  buttonWrap: {
    marginLeft: 'auto',
    height: '100%',
  },
  button: {
    minWidth: '49px',
    borderRadius: 0,
    height: 'calc(100% + 1px)',
  },
  expandButton: {
    borderLeft: `solid 1px ${theme.palette.box.secondaryBorderColor}`,
    '&.open': {
      borderBottom: '1px solid #fff',
    },
  },
  icon: {
    transition: 'all ease 0.4s',
    '&.open': {
      transform: 'rotate( -180deg )',
    },
  },
  content: {
    position: 'relative',
    padding: '10px 20px 20px 20px',
    display: 'none',
    minHeight: 50,
    '&.open': {
      display: 'block',
    },
  },
}));

const SwitchingArea = ({ title, handleRefesh, children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  /**
   * 열고 닫기 버튼
   */
  const handleExpendBttonClick = () => {
    setOpen(!open);
  };

  return (
    <div className={`mb-SwitchingArea ${classes.root}`}>
      <div className={clsx(classes.bar, { open })}>
        <div className={classes.label}>{title}</div>
        <div className={classes.buttonWrap}>
          <Button className={classes.button} onClick={handleRefesh}>
            <FontAwesomeIcon icon={faUndo} color="#4d5059" />
          </Button>
          <Button
            className={clsx(classes.button, classes.expandButton, {
              open,
            })}
            onClick={handleExpendBttonClick}
          >
            <FontAwesomeIcon
              className={clsx(classes.icon, { open })}
              icon={faChevronDown}
              color="#4d5059"
            />
          </Button>
        </div>
      </div>
      <div className={clsx(classes.content, { open })}>{children}</div>
    </div>
  );
};

export default SwitchingArea;
