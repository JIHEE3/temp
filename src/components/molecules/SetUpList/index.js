import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/pro-regular-svg-icons';

import MbButton from 'components/atoms/MbButton';
import PopoverFooter from 'components/atoms/PopoverFooter';
import TableToolBarIconButton from 'components/atoms/TableToolBarIconButton';
import MbCheckList from 'components/molecules/MbCheckList';

const useStyles = makeStyles(theme => ({
  popover: {
    maxWidth: 500,
    borderRadius: 4,
    boxShadow: '-0.8px -0.6px 11px 0 rgba(16,17,21,0.05)',
    border: 'solid 1px',
    borderColor: theme.palette.primary.deep,
    padding: 20,
  },
  buttonIcon: {
    fontSize: 18,
  },
  columnTitle: {
    fontSize: 16,
    textAlign: 'left',
  },
  columnNotice: {
    lineHeight: 3,
    textAlign: 'left',
    color: theme.palette.primary.deep,
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  resetButton: {
    fontSize: 15,
  },
}));

/**
 * 컬럼 커스텀 버튼
 * @param {json} props
 */
let saveBtnDisabled = true;
export default function SetUpList({
  list,
  title,
  popoverTitle,
  popoverNotice,
  saveButtonTitle,
  handleSaveCustomSet,
  icon,
}) {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [customColumn, setCustomColumn] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    saveBtnDisabled = true;
  });

  useEffect(() => {
    if (list.size !== 0) {
      setCustomColumn(new Map(list));
    }
  }, [list]);

  /**
   * 컬럼 숨김 popover 열기
   */
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * 컬럼 설정 list 클릭
   * @param {string} id 컬럼 아이디
   */
  const handleSetColumn = id => () => {
    const newCustomColumn = new Map(customColumn);
    const column = newCustomColumn.get(id);
    newCustomColumn.set(id, { ...column, displayFlag: !column.displayFlag });

    // 기존 값과 비교
    for (let item of list.values()) {
      const { id, displayFlag } = item;
      if (newCustomColumn.get(id).displayFlag !== displayFlag) {
        saveBtnDisabled = false;
        continue;
      }
    }
    setCustomColumn(newCustomColumn);
  };

  /**
   * 컬럼 설정 저장
   */
  const handleSaveClick = () => {
    handleSaveCustomSet(customColumn);
    setAnchorEl(null);
  };

  /**
   * 선택초기화
   */
  const handleResetClick = () => {
    if (list.size !== 0) {
      setCustomColumn(new Map(list));
    }
  };

  const makeList = () => {
    const result = [];
    for (let item of customColumn.values()) {
      const { id, label } = item;

      if (id === 'SEQ') {
        continue;
      }

      result.push(
        <MbCheckList
          key={id}
          onClick={handleSetColumn(id)}
          checked={customColumn.get(id).displayFlag === true}
          label={label}
        />
      );
    }
    return result;
  };

  return (
    <>
      <TableToolBarIconButton
        aria-label={title}
        onClick={handleClick}
        icon={
          !icon ? (
            <FontAwesomeIcon
              icon={faList}
              color={theme.palette.primary.main}
              className={classes.buttonIcon}
            />
          ) : (
            icon
          )
        }
        label={title}
        color={theme.palette.primary.main}
      />
      <Popover
        classes={{ paper: classes.popover }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Typography gutterBottom>
          <span className={classes.columnTitle}>{popoverTitle}</span>
          <span className={classes.columnNotice}>* {popoverNotice}</span>
        </Typography>
        {Boolean(customColumn) && (
          <div className={classes.list}>{makeList()}</div>
        )}
        <PopoverFooter>
          <Button className={classes.resetButton} onClick={handleResetClick}>
            {t('초기화')}
          </Button>
          <MbButton
            color={theme.palette.primary.deep}
            disabled={saveBtnDisabled}
            onClick={handleSaveClick}
          >
            {saveButtonTitle}
          </MbButton>
        </PopoverFooter>
      </Popover>
    </>
  );
}
