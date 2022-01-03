//routing
import Router from "express";
import ctrl from "./selected_song.ctrl.js";
const router = Router();

router.get("/:concertId", ctrl.show);

router.post("/", ctrl.create);

router.delete("/:selected_songId", ctrl.del);

router.put("/:selected_songId", ctrl.update);

export default router;
