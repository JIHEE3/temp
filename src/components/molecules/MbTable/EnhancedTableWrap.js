import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { withStyles } from '@material-ui/styles';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExit';
import GetAppIcon from '@material-ui/icons/GetApp';

import MbTooltip from 'components/atoms/MbTooltip';
import SearchInput from 'components/molecules/SearchInput';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    padding: 0,
    minHeight: 58,
    height: 58,
    display: 'flex',
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  actions: {
    color: theme.palette.text.secondary,
    display: 'flex',
    marginLeft: 'auto',
  },
  title: {
    flex: '0 0 auto',
  },
  searchWrap: {
    marginLeft: 25,
  },
}));

const EnhancedTableToolbar = props => {
  const { t } = useTranslation();
  const classes = useToolbarStyles();
  const {
    numSelected,
    title,
    columnSetButton,
    hasExcel,
    screenMode,
    handleExcelDonload,
    handleScreenMode,
  } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {/* 컬럼설정, 복사 등등 */}
      {columnSetButton}
      {/* 검색 */}
      <div className={classes.searchWrap}>
        <SearchInput placeholder={t('검색어를 입력하세요.')} />
      </div>
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} {t('선택')}
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            {title}
          </Typography>
        )}
      </div>
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <MbTooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </MbTooltip>
        ) : (
          <>
            {hasExcel && (
              <MbTooltip title={t('엑셀 다운로드')}>
                <IconButton
                  aria-label={t('엑셀 다운로드')}
                  onClick={handleExcelDonload}
                >
                  <GetAppIcon />
                </IconButton>
              </MbTooltip>
            )}

            {screenMode === '' ? (
              <MbTooltip title={t('전체 화면')}>
                <IconButton
                  aria-label={t('전체 화면')}
                  onClick={handleScreenMode}
                >
                  <FullscreenIcon />
                </IconButton>
              </MbTooltip>
            ) : (
              <MbTooltip title={t('부분 화면')}>
                <IconButton
                  aria-label={t('부분 화면')}
                  onClick={handleScreenMode}
                >
                  <FullscreenExitIcon />
                </IconButton>
              </MbTooltip>
            )}
          </>
        )}
      </div>
    </Toolbar>
  );
};

const useStyles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    borderTop: theme.palette.box.border,
  },
  columnSet: props => {
    const { headCells } = props;
    const result = {};

    if (typeof headCells === 'undefined') {
      return null;
    }
    for (let headCell of headCells.values()) {
      const { id, className, displayFlag } = headCell;
      if (id === 'SEQ') {
        continue;
      }
      if (displayFlag) {
        result[`& .${className}`] = {
          display: 'table-cell',
        };
      } else {
        result[`& .${className}`] = {
          display: 'none',
        };
      }
    }
    return result;
  },
});

export default withStyles(useStyles)(
  class EnhancedTableWrap extends React.Component {
    render() {
      const {
        className = '',
        classes,
        selectedCnt,
        columnSetButton,
        title = '',
        hasExcel,
        screenMode,
        handleExcelDonload,
        handleScreenMode,
        children,
        ...rest
      } = this.props;

      return (
        <div
          className={clsx(
            'mb-EnhancedTableWrap',
            classes.root,
            classes.columnSet,
            className
          )}
          {...rest}
        >
          <EnhancedTableToolbar
            numSelected={selectedCnt}
            title={title}
            columnSetButton={columnSetButton}
            hasExcel={hasExcel}
            screenMode={screenMode}
            handleExcelDonload={handleExcelDonload}
            handleScreenMode={handleScreenMode}
          />
          {children}
        </div>
      );
    }
  }
);
