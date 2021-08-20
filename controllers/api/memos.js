const uuid = require("uuid");
const Memos = require("../../models/Memo");

// @desc Get all the memos
// @route GET /api/memos
// @access Public
exports.getMemos = (req, res, next) => res.json(memos);

// @desc Get memo by id
// @route GET /api/memos
// @access Public
exports.getMemoById = (req, res, next) => {
  const found = memos.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(memos.filter((memo) => memo.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({
      msg: `Memo of id ${req.params.id} not found`,
    });
  }
};

// @desc Add new memo
// @route POST /api/memos
// @access Public
exports.createMemo = (req, res) => {
  const newMemos = {
    id: uuid.v4(),
    name: req.body.name,
    memo: req.body.memo,
    location: req.body.location,
    date: req.body.date,
    time: req.body.time,
  };

  if (!newMemos.memo) {
    return res.status(400).json({
      msg: "Please include memo",
    });
  }

  memos.push(newMemos);
  res.redirect("/");
};

// @desc Update existing memo
// @route PUT /api/memos
// @access Public
exports.updateMemo = (req, res) => {
  const found = memos.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const updMemo = req.body;
    memos.forEach((memo) => {
      if (memo.id === parseInt(req.params.id)) {
        memo.name = updMemo.name ? updMemo.name : memo.name;
        memo.memo = updMemo.memo ? updMemo.memo : memo.memo;
        memo.location = updMemo.location ? updMemo.location : memo.location;
        memo.date = updMemo.date ? updMemo.date : memo.date;
        memo.time = updMemo.time ? updMemo.time : memo.time;
      }
    });
  } else {
    res.status(400).json({
      msg: `Memo of id ${req.params.id} not found`,
    });
  }
};

/// @desc Delete memo by its ID
// @route PUT /api/memos
// @access Public
exports.deleteMemoById = (req, res) => {
  const found = memos.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Member deleted",
      memos: memos.filter((memo) => memo.id !== parseInt(req.params.id)),
    });
  } else {
    res.status(400).json({
      msg: `No memo found`,
    });
  }
};
