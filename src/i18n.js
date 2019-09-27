import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// 동적으로 거져오도록 변경해야 함
import ko from 'constants/resources/ko.json';
import en from 'constants/resources/en.json';

// the translations
// (tip move them in a JSON file and import them)
// const resources = {
//   en: {
//     translation: {
//       "Welcome to React": "Welcome to React and react-i18next"
//     }
//   }
// };

// i18n
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .init({
//     resources,
//     lng: 'en',
//     // lng: 'ko',

//     keySeparator: false, // we do not use keys in form messages.welcome

//     interpolation: {
//       escapeValue: false // react already safes from xss
//     }
//   });

let locale = localStorage.getItem('locale');
locale = !locale ? Intl.DateTimeFormat().resolvedOptions().locale : locale;

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: locale === 'ko' ? ko : en,
    lng: locale,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
