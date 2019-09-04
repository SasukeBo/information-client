function timeFormatter(timeStr, format = '%y年%m月%d日 %timestring') {
  if (!timeStr) {
    return '-';
  }

  var time = new Date(timeStr);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var timeString = time.toTimeString().slice(0, 8);
  format = format.replace('%y', y);
  format = format.replace('%m', m);
  format = format.replace('%d', d);
  format = format.replace('%timestring', timeString);
  return format
}

function parseGQLError(e) {
  return JSON.parse(e.graphQLErrors[0].message)
}

export {
  timeFormatter,
  parseGQLError
}
