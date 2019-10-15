/**
 * @param {*} value value to check
 * @param {string | Object | Array<string | Object>} [types] types to validate
 */
function guard(value, types) {
  if(types == null || Array.isArray(types) && types.length === 0) {
    return;
  }

  const toCheck = [].concat(types);
  /** 
   * @todo make this intersection types not union
   */
  const errorIndex = toCheck.reduce((res, type, idx) => {
    if(res > -1) {
      return res;
    }

    if(typeof type === 'string') {
      return typeof value !== type ? idx : res;
    }

    if(typeof type === 'object') {
      return !(value instanceof type) ? idx : res;
    }

    return res;
  }, -1);

  if(errorIndex  > -1) {
    throw new TypeError(`Expected ${value} to be a ${types[errorIndex]}`);
  }
}

module.exports = guard;