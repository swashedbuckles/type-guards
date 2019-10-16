module.exports = {
  guard,
  match,
  verify
};

/**
 * @param {*} value value to check
 * @param {string | Object | Array<string | Object>} [types] types to validate
 * @throws {TypeError}
 */
function guard(value, types) {
  if(types == null || Array.isArray(types) && types.length === 0) {
    return;
  }

  const toCheck = [].concat(types);
  const valid = toCheck.some(type => {
    if(typeof type === 'string') {
      return typeof value === type;
    }

    if(typeof type === 'object') {
      return value instanceof type;
    }
  });

  if(!valid) {
    throw new TypeError(`Expected ${value} to match one of ${toCheck.join(', ')}`);
  }
}

/**
 * @param {*} value value to check
 * @param {string | Object | Array<string | Object>} [types] types to validate
 * @throws {TypeError}
 */
function match(value, types) {
  if(types == null || Array.isArray(types) && types.length === 0) {
    return;
  }

  const toCheck = [].concat(types);
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
    throw new TypeError(`Expected ${value} to be a ${toCheck[errorIndex]}`);
  }
}

/**
 * @param {*} value
 * @param {object} template
 */
function verify(value, template) {

}