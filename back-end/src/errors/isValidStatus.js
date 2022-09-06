function isValidStatus(req, res, next) {
  const { data: { status } = {} } = req.body;
  if (status) {
    if (status.toLowerCase() !== "booked") {
      next({
        status: 400,
        message: `${status} statues are not allowed. Only booked is allowed.`,
      });
    } else next();
  } else next();
}

module.exports = isValidStatus;
