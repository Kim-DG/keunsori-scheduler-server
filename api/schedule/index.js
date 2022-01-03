//routing
import Router from "express";
import ctrl from "./schedule.ctrl.js";
const router = Router();

router.get("/:concertId", ctrl.show);

router.delete("/:scheduleId", ctrl.del);

router.post("/", ctrl.create);

export default router;
