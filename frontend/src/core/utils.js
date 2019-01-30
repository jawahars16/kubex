export const ensureValue = (obj, fallback) => {
  let returnValue;
  try {
    const value = obj();
    if (!value) {
      returnValue = fallback;
    } else {
      returnValue = value;
    }
  } catch (e) {
    returnValue = fallback;
  }
  return returnValue;
}