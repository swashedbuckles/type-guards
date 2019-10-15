/**
 * @param {*} value value to check
 * @param {string | Object | Array<string | Object>} types types to validate
 */
function guard(value, types) {
  if(types == null || Array.isArray(types) && types.length === 0) {
    return;
  }
}

module.exports = guard;