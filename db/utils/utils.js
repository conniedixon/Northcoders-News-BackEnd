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

exports.makeRefObj = list => {
  const articleCopy = list.map(item => {
    return { ...item };
  });
  referenceObject = {};
  articleCopy.forEach(item => {
    referenceObject[item.title] = item.article_id;
  });
  return referenceObject;
};

exports.formatComments = (comments, articleRef) => {
  const commentsCopy = comments.map(item => {
    return { ...item };
  });

  commentsCopy.forEach(item => {
    item.author = item.created_by;

    const keys = Object.keys(articleRef);
    const foundId = keys.forEach(key => {
      if (key === item.belongs_to) item.article_id = articleRef[key];
    });

    delete item.belongs_to;
    delete item.created_by;
    return item;
  });

  return commentsCopy;
};
