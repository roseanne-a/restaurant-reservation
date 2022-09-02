const service = require("../tables/tables.service");

async function tableExists(req, res, next) {
  const { table_id } = req.params;

  const table = await service.read(table_id);

  if (table) {
    res.locals.table = table;
    return next();
  } else {
    return next({ status: 404, message: "Table cannot be found." });
  }
}

module.exports = tableExists;
