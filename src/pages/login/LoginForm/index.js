import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { logout, setUser } from 'modules/auth';
import { getMenu } from 'modules/menu';
import { login } from 'lib/api/auth';
import LoginForm from 'pages/Login/LoginForm/LoginForm';

const useStyles = makeStyles(theme => ({
  modalTitleContent: {
    marginBottom: 20,
  },
  modalConfirmButton: {
    width: 200,
    color: '#fff',
  },
}));

const LoginFormContainer = ({ history }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const localStorageId = localStorage.getItem('saveId');
  const [form, setForm] = useState({
    userId: localStorageId === null ? '' : localStorageId,
    password: '',
  });
  const [error, setError] = useState(null);
  const [saveId, setSaveId] = useState(localStorageId === null ? false : true);
  const [modalState, setModalState] = useState(false);

  const dispatch = useDispatch();

  const handleModalClose = () => {
    setModalState(false);
  };

  /**
   * id, pwd 변경 이벤트
   * @param {string} name userId || Password
   */
  const onChange = name => event => {
    setForm({ ...form, [name]: event.target.value });
  };

  /**
   * 아이디 저장 여부
   * @param {} event
   */
  const onChangeSaveId = event => {
    setSaveId(event.target.checked);
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { userId, password } = form;
    let errorMesage = '';
    if (userId === '') {
      errorMesage = 'ID를 입력하세요';
    } else if (password === '') {
      errorMesage = 'Password를 입력하세요';
    }

    if (errorMesage !== '') {
      setError(errorMesage);
      return false;
    } else {
      login({ userId, password })
        .then(response => {
          const { data: user, success } = response.data;
          if (success) {
            dispatch(setUser(user));
            dispatch(getMenu());
            try {
              localStorage.setItem('user', JSON.stringify(user));
              if (saveId) {
                localStorage.setItem('saveId', user.userid);
              } else {
                localStorage.removeItem('saveId');
              }
            } catch (e) {
              console.log('localStorage is not working');
            }
            history.push('/');
          } else {
            setModalState(true);
          }
        })
        .catch(error => {
          console.log(error);
          setError(error.message);
        });
    }
  };

  useEffect(() => {
    localStorage.removeItem('user'); // localStorage 에서 user 제거
    dispatch(logout());
  }, [dispatch]);

  return (
    <>
      <LoginForm
        form={form}
        error={error}
        saveId={saveId}
        onChange={onChange}
        onChangeCheckbox={onChangeSaveId}
        onSubmit={onSubmit}
      />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={`${classes.modal} globalModal`}
        open={modalState}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalState}>
          <div className={`${classes.paper} paper`}>
            <p className={classes.modalTitleContent}>
              {t('로그인에 실패하였습니다. 관리자에게 문의해주세요.')}
            </p>
            <Button
              variant="contained"
              color="primary"
              className={classes.modalConfirmButton}
              onClick={handleModalClose}
            >
              {t('확인')}
            </Button>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default withRouter(LoginFormContainer);
