import numeral from 'numeral';
import moment from 'moment';

export const onlyNumber = /^[0-9\b]+$/;

export function makeHeadData(data = [], addColumnList = new Map()) {
  const headCells = new Map();
  // 화면에서 추가하는 컬럼 json값 변환해서 반환해주는
  const returnAddColumJson = columnData => {
    const { id, label, align = 'center', makeRowFunc } = columnData;
    return {
      id,
      data: {
        id,
        label,
        align,
        displayFlag: true,
        className: `mb-${under2camel(id)}`,
        isAddColumn: true,
        makeRowFunc,
      },
    };
  };

  for (let i = 0; i < data.length; i++) {
    const head = data[i];
    const { id, label, orderFlag, type, format, displayFlag } = head;
    const addColumn = addColumnList.get(i);
    if (typeof addColumn !== 'undefined') {
      const { id, data } = returnAddColumJson(addColumn);
      headCells.set(id, data);
    }

    const align =
      type === 'number'
        ? 'right'
        : type === null || type === 'date'
        ? 'center'
        : 'left';

    headCells.set(id, {
      id,
      label,
      align,
      orderFlag,
      type,
      format,
      displayFlag,
      className: `mb-${under2camel(id)}`,
    });
  }

  // 화면에서 테이블 뒷컬럼에 추가해야 하는경우
  if (typeof addColumnList.get(-1) !== 'undefined') {
    for (let i = -1; i < addColumnList.size; i--) {
      const addColumn = addColumnList.get(i);

      if (typeof addColumn !== 'undefined') {
        const { id, data } = returnAddColumJson(addColumn);
        headCells.set(id, data);
      } else {
        // 더이상 없으므로 끝냄
        break;
      }
    }
  }
  return headCells;
}

/**
 * fetch header
 * @param {function} func fetch 수행할 api
 * @param {Map} addColumnList 화면에서 추가할 column list
 * @return {Promise}
 */
export function fetchHeader(func, addColumnList, uri) {
  // get table headers
  return new Promise((resolve, reject) => {
    func({ uri })
      .then(response => {
        const { data } = response.data;
        resolve(makeHeadData(data, addColumnList));
      })
      .catch(error => {
        reject(error);
      });
  });
}

/**
 * underbar -> camel
 * @param {string} str
 */
export function under2camel(str) {
  return str.toLowerCase().replace(/(_[a-z])/g, function(arg) {
    return arg.toUpperCase().replace('_', '');
  });
}

/**
 * type, format 별 변환
 * @param {*} data
 * @param {*} type
 * @param {*} format
 */
export function makeRowColumn(data, type, format) {
  let result = data;

  if (type === 'number') {
    result = numeral(data).format(format);
  } else if (type === 'date') {
    if (!isNaN(data)) {
      if (String(data).length === 8) {
        // 년월일으로만 넘어와야..
        result = moment(data, 'YYYYMMDD').format(format.toUpperCase());
      } else {
        result = moment(data).format(format.toUpperCase());
      }
    }
  }

  return result;
}

/**
 * 응답받은 파일데이터 > 다운로드 처리
 * @param {JSON} response
 */
export function fileDownload(response) {
  let fileName = response.headers['content-disposition'];
  fileName = decodeURI(fileName.slice(fileName.lastIndexOf(`'`) + 1));

  const blob = new Blob([response.data], {
    type: 'application/octet-stream',
  });
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    // ie
    window.navigator.msSaveOrOpenBlob(blob, fileName);
  } else {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

/**
 * talbe head 정보 사용할때 head 정보 바뀌어 undefined 에러 방지 위함
 * @param {Map} mapObj
 * @param {} key
 */
export function getHeadObj(mapObj, key) {
  const value = mapObj.get(key);
  return value ? value : {};
}

/**
 * 두자리수 월, 일 반환
 * @param {int} number
 * @param {boolean} isMonth
 */
export function twoDigits(number, isMonth = false) {
  if (isMonth) {
    number += 1;
  }
  if (number < 10) {
    return `0${number}`;
  }
  return number;
}

/**
 * moment 객체 값 숫자로 반환
 * @param {Object} momentObj
 */
export function getDate(momentObj) {
  const { years: sYears, months: sMonths, date: sDate } = momentObj.toObject();

  return `${sYears}${twoDigits(sMonths, true)}${twoDigits(sDate)}`;
}

/**
 * locaile 별 format 정보 return
 * @param {string} locale
 */
export function getFormat(locale) {
  return locale === 'ko'
    ? 'YYYY-MM-DD'
    : moment.localeData().longDateFormat('L');
}

export function toPercent(decimal, fixed = 0) {
  return `${decimal.toFixed(fixed)}%`;
}

export function numberFormatter(decimal) {
  return numeral(decimal).format();
}

/**
 * 그래프 데이터 만드는 공통 부분
 */
export const makeGraph = ({
  data,
  customize,
  primitiveData,
  referenceLine = {},
}) => {
  const { bar, line } = data;
  const dataKeys = {};
  const keyLabel = {};
  const tempGraphData = {};
  const graphData = [];
  let customizeData = {};
  const stackId = [];
  const referenceData = {};

  if (typeof bar !== 'undefined') {
    dataKeys['bar'] = bar;
  }

  if (typeof line !== 'undefined') {
    dataKeys['line'] = line;
  }

  if (typeof customize !== 'undefined') {
    customizeData = customize;
  }

  for (let kind in data) {
    if (data.hasOwnProperty(kind)) {
      const keys = data[kind];
      for (let i = 0; i < keys.length; i++) {
        const curKey = keys[i];
        if (kind === 'bar') {
          stackId.push(curKey);
        }

        keyLabel[curKey] = primitiveData[curKey].title;
        tempGraphData[curKey] = primitiveData[curKey].data;
      }
    }
  }

  // graph data 담는 곳
  for (let key in tempGraphData) {
    if (tempGraphData.hasOwnProperty(key)) {
      // 평균 값 선 넣기 위해
      let average = false;
      let sum = 0;
      let count = 0;
      if (typeof referenceLine[key] !== 'undefined') {
        if (referenceLine[key].type === 'average') {
          average = true;
        }
      }

      for (let i = 0; i < tempGraphData[key].length; i++) {
        const curGraphData = tempGraphData[key][i];
        let { name, val } = curGraphData;
        if (
          typeof customize !== 'undefined' &&
          typeof customize[key] !== 'undefined'
        ) {
          if (customize[key].isPercent) {
            val *= 100;
          }

          if (typeof customize[key].keyLabel !== 'undefined') {
            keyLabel[key] = customize[key].keyLabel;
          }
        }

        // 평균값 구하기
        if (average) {
          sum += Number(val);
          count++;
        }

        graphData[i] = {
          ...graphData[i],
          name,
          [key]: val,
        };
      }

      if (average) {
        const { label, visibleValue = false } = referenceLine[key];
        const y = sum / count;

        referenceData[key] = {
          y,
          label: visibleValue
            ? `${label}(${numeral(y).format('0,00')})`
            : label,
        };
      }
    }
  }

  return {
    graphData,
    dataKeys,
    customizeData,
    keyLabel,
    stackId,
    referenceData,
  };
};

/**
 * option 리스트 만들어주는 함수
 * @param {Array} data option list 만들 array
 * @param {string} optionLabelKey option에 나올 label key 값
 * @param {string} optionValueKey option value key 값
 */
export const makeOptionList = (data, optionLabelKey, optionValueKey) => {
  if (typeof data === 'undefined') {
    return [];
  }
  const result = [...data];
  const defaultOption = { [optionLabelKey]: '전체', [optionValueKey]: null };

  // 전체 라는 option 추가
  result.unshift(defaultOption);

  return result;
};

export const weeksConversion = e => {
  return e.toString().replace(/\B(?=(\d{1})+(?!\d))/g, ',');
};
