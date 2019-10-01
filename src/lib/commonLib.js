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
          const { id, label, orderFlag, type, format } = head;
          return {
            id,
            label,
            orderFlag,
            numeric: type === 'number' ? true : false,
            format
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
