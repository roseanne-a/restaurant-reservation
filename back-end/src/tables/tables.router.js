const router = require("express").Router();
const controller = require("./tables.controller");
const notFound = require("../errors/notFound");

router
  .route("/:table_id/seat")
  .put(controller.update)
  .delete(controller.removeReservation)
  .all(notFound);
router.route("/").get(controller.list).post(controller.create).all(notFound);

module.exports = router;
