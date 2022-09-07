/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const notFound = require("../errors/notFound");

router
  .route("/:reservation_id/status")
  .put(controller.updateStatus)
  .all(notFound);
router
  .route("/:reservation_id")
  .get(controller.read)
  .put(controller.update)
  .all(notFound);
router.route("/").get(controller.list).post(controller.create).all(notFound);

module.exports = router;
