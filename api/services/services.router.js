const { validateToken } = require("../../auth/token_validation");
const { createService, getServices } = require("./services.controller");
const router = require("express").Router();

router.post("/", validateToken, createService);
router.get("/", validateToken, getServices);

module.exports = router;