const router = require("express").Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth");

router.use(auth);

router.get("/", async (req, res) =>
  res.json(await Item.find({ owner: req.userId })));

router.get("/:id", async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id, owner: req.userId });
  item ? res.json(item) : res.status(404).json({ error: "Not found" });
});

router.post("/", async (req, res) => {
  try {
    res.status(201).json(await Item.create({ name: req.body.name, owner: req.userId }));
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put("/:id", async (req, res) => {
  const item = await Item.findOneAndUpdate(
    { _id: req.params.id, owner: req.userId },
    { name: req.body.name },
    { new: true, runValidators: true }
  );
  item ? res.json(item) : res.status(404).json({ error: "Not found" });
});

router.delete("/:id", async (req, res) => {
  const item = await Item.findOneAndDelete({ _id: req.params.id, owner: req.userId });
  item ? res.status(204).end() : res.status(404).json({ error: "Not found" });
});

module.exports = router;