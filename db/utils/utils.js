exports.formatDates = list => {
  if (list.length === 0) return list;
  let listCopy = list.map(item => {
    return { ...item };
  });

  let formattedDates = listCopy.map(item => {
    item.created_at = new Date(item.created_at).toUTCString();
    return item;
  });

  return formattedDates;
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
