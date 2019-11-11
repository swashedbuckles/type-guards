module.exports = {
  guard,
  match,
  verify
};

/**
 * Ensure that a value is of at least one of the types (intersection)
 * 
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
 * validate union type
 *
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
 * a way to verify objects meet a template. 
 *
 * @param {object} value
 * @param {object} template
 */
function verify(value, template) {
  if(typeof value !== 'object') {
    throw new TypeError(`Value must be an object to be verified`);
  }

  const keys = Object.keys(template);
  
  keys.forEach(key => {
    const prop = template[key];
    
    if(typeof prop === 'object') {
      verify(value[key], template[key]);
    }
    
    guard(value[key], template[key]);
  });
}