//routing
import Router from "express";
import ctrl from "./song.ctrl.js";
const router = Router();

router.get("/:concertId", ctrl.show);

router.post("/", ctrl.create);

router.delete("/:songId", ctrl.del);

router.put("/:songId", ctrl.update);

export default router;
