const { validateToken } = require("../../auth/token_validation");
const router = require("../users/user.router");
const { createITR } = require("./itr.controller");

router.post("/", validateToken, createITR);