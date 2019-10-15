/**
 * @param {*} value value to check
 * @param {string | Object | Array<string | Object>} types types to validate
 */
function guard(value, types) {
  if(types == null || Array.isArray(types) && types.length === 0) {
    return;
  }

  const toCheck = [].concat(types);
  const errorIndex = toCheck.reduce((res, type, idx) => {
    if(res > -1) {
      return res;
    }

    if(typeof type === 'string' && typeof value !== type) {
      return idx;
    }

    if(!(value instanceof type)) {
      return idx;
    }

    return res;
  }, -1);

  if(errorIndex  > -1) {
    throw new TypeError(`Expected ${value} to be a ${types[errorIndex]}`);
  }
}

module.exports = guard;