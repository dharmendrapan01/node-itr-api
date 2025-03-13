const { validateToken } = require("../../auth/token_validation");
const { createSOI, getSoi } = require("./soi.controller");
const router = require("express").Router();

router.post("/", validateToken, createSOI);
router.get("/", validateToken, getSoi);

module.exports = router;