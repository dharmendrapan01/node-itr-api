const { createUser, getUserById, updateUser, deleteUser, getUsers, login } = require("./user.controller");
const router = require("express").Router();
const { validateToken } = require("../../auth/token_validation");

router.post("/", validateToken, createUser);
router.post("/login", login);
router.get("/", validateToken, getUsers);
router.get("/:id", validateToken, getUserById);
router.patch("/", validateToken, updateUser);
router.delete("/:id", validateToken, deleteUser);

module.exports = router;