const express = require("express");
const router = express.Router();
const {
  getMemos,
  getMemoById,
  createMemo,
  updateMemo,
  deleteMemoById,
} = require("../../controllers/api/memos");

router.route("/").get(getMemos).post(createMemo);
router.route("/:id").get(getMemoById).delete(deleteMemoById).put(updateMemo);

module.exports = router;
