/**
 * fetch header
 * @param {function} func fetch 수행할 api
 * @return {Promise}
 */
export function fetchHeader(func) {
  // get table headers
  return new Promise((resolve, reject) => {
    func()
      .then(response => {
        const { data } = response.data;
        // 해더 셋팅
        const headCells = data.map(head => {
          const { id, label, orderFlag, type, format, displayFlag } = head;
          /**
           * class name 추가해서 해당 class name 으로 css 넣어서 td 에 일괄 적용될 수 있도록 수정하기
           */
          return {
            id,
            label,
            orderFlag,
            numeric: type === 'number' ? true : false,
            format,
            displayFlag,
          };
        });
        resolve(headCells);
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
