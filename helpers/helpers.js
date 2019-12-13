const objectPropByString = (o, s) => {
  s = s.replace(/\[(\w+)\]/g, ".$1");
  s = s.replace(/^\./, ""); 
  var a = s.split(".");
  for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
          o = o[k];
      } else {
          return;
      }
  }
  return o;
}

module.exports = {
  objectPropByString
}