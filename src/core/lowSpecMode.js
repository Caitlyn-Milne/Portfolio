let lowSpecMode =
  /Edge/.test(navigator.userAgent) || /Edg/.test(navigator.userAgent);

export default lowSpecMode;
