//routing
import Router from "express";
import ctrl from "./concert.ctrl.js";
const router = Router();

router.get("/", ctrl.show);

router.delete("/:concertId", ctrl.del);

router.post("/", ctrl.create);

export default router;
