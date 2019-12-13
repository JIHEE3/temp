import React from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from 'components/molecules/Snackbar/SnackbarContentWrapper';
import JoinForm from './JoinForm';
import { member, register } from 'lib/api/member';

let form = {
  id: '',
  password: '',
  confirmPassword: '',
  name: '',
  email: '',
  phoneNumber: '',
  department: '',
  rank: '',
};
const Join = ({ history }) => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = React.useState({});
  const [alert, setAlert] = React.useState({
    open: false,
    message: '필수 정보를 정확히 입력해주세요.',
  });

  /**
   * join form validation 체크
   * @param {string} name validation 체크할 form data 이름
   * @param {string} value 값
   */
  const validationCheck = (name, value) => {
    const newErrorMessage = { ...errorMessage };
    let message = '';

    switch (name) {
      case 'id':
        if (value === '') {
          message = '아이디를 입력해 주세요.';
        } else {
          const regexp = /^[a-z0-9+]*$/;
          if (!regexp.test(value)) {
            message = '영문 소문자, 숫자 조합으로 입력해 주세요.';
          }
        }
        break;
      case 'password':
        if (value === '') {
          message = '비밀번호를 입력해 주세요.';
        } else {
          const regexp = /^[A-Za-z0-9~!@#$%^&*()_+|<>?:{}+]{8,14}$/;
          if (!regexp.test(value)) {
            message = '8 ~ 14자 영문 대 소문자, 숫자, 특수문자를 사용하세요.';
          }

          if (form.confirmPassword !== '' && value === form.confirmPassword) {
            delete newErrorMessage.confirmPassword;
          } else if (message === '') {
            newErrorMessage.confirmPassword = '비밀번호가 일치하지 않습니다.';
          }
        }
        break;
      case 'confirmPassword':
        if (value === '') {
          message = '비밀번호를 입력해 주세요.';
        } else if (value !== form.password) {
          message = '비밀번호가 일치하지 않습니다.';
        }
        break;
      case 'name':
        if (value === '') {
          message = '이름을 입력해 주세요.';
        } else {
          const regexp = /^[A-Za-z가-힣+]*$/;
          if (!regexp.test(value)) {
            message = '한글과 영문 대 소문자를 입력해주세요.';
          }
        }
        break;
      case 'email':
        if (value === '') {
          message = '이메일을 입력해 주세요.';
        }
        break;
      case 'phoneNumber':
        if (value === '') {
          message = '휴대폰 번호를 입력해 주세요.';
        } else if (value.length !== 11) {
          message = '휴대폰 번호 11자리를 입력해 주세요.';
        } else {
          const regexp = /^[0-9+]{11}$/;
          if (!regexp.test(value)) {
            message = '숫자를 제외한 텍스트는 입력 불가입니다.';
          }
        }
        break;
      // 소속 부서, 직급 text 입력 임시, 추후 선택으로 변경해야함
      case 'department':
        if (value === '') {
          message = '소속 부서를 입력해 주세요.';
        }
        break;
      case 'rank':
        if (value === '') {
          message = '직급을 입력해 주세요.';
        }
        break;
      default:
        break;
    }

    if (message === '') {
      delete newErrorMessage[name];
    } else {
      newErrorMessage[name] = message;
    }

    setErrorMessage({
      ...newErrorMessage,
    });
  };

  /**
   * 회원 정보 입력 이벤트
   * @param {string} name
   */
  const handleChange = name => event => {
    const { value } = event.target;
    form = { ...form, [name]: value };
    setAlert({ open: false });
    validationCheck(name, value);
  };

  const handleBlur = name => event => {
    validationCheck(name, event.target.value);
    if (name === 'id') {
      idCheck();
    }
  };

  /**
   * 등록 버튼
   */
  const handleSubmit = () => {
    if (Object.keys(errorMessage).length !== 0) {
      // form 입력값에 오류가 있으면
      setAlert({ open: true });
    } else {
      let isOk = true;
      for (let item in form) {
        if (form.hasOwnProperty(item) && form[item] === '') {
          isOk = false;
          break;
        }
      }
      if (isOk) {
        const {
          id,
          password,
          confirmPassword,
          name,
          email,
          phoneNumber,
          department,
          rank,
        } = form;
        register({
          userId: id,
          password,
          passwordConfirm: confirmPassword,
          name,
          email: `${email}@enliple.com`,
          phone: phoneNumber,
          department,
          rank,
        })
          .then(response => {
            const { data } = response;
            if (data.success) {
              history.push(`/join/${id}`);
            }
          })
          .catch(error => {
            console.log(error);
            setAlert({
              open: true,
              message: error,
            });
          });
      } else {
        setAlert({ open: true });
      }
    }
  };

  /**
   * id 중복확인
   */
  const idCheck = () => {
    const { id } = form;
    if (id !== '') {
      member(id).then(response => {
        const { data } = response;
        if (!data.success) {
          console.log(data.message);
          setErrorMessage({ ...errorMessage, id: data.message });
        }
      });
    }
  };

  return (
    <>
      <JoinForm
        onChange={handleChange}
        onBlur={handleBlur}
        onSubmit={handleSubmit}
        errorMessage={errorMessage}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={alert.open}
        autoHideDuration={3000}
      >
        <SnackbarContentWrapper
          variant="warning"
          message={
            alert.message === undefined
              ? t('필수 정보를 정확히 입력해주세요.')
              : alert.message
          }
        />
      </Snackbar>
    </>
  );
};

export default withRouter(Join);
