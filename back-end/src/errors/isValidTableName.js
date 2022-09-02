function isValidTableName(req, res, next) {
  const { data: { table_name } = {} } = req.body;
  if (table_name.length < 2) {
    next({
      status: 400,
      message: `table_name should have at least 2 characters`,
    });
  } else next();
}

module.exports = isValidTableName;
