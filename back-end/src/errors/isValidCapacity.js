function isValidCapacity(req, res, next) {
  const { data: { capacity } = {} } = req.body;
  if (typeof capacity !== "number" || capacity < 1) {
    next({
      status: 400,
      message: `capacity should be an integer greater than 0`,
    });
  } else next();
}

module.exports = isValidCapacity;
