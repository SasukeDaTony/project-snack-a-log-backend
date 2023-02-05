const express = require("express");
const snacks = express.Router();
const {
  getAllSnacks,
  getSnack,
  createSnack,
  deleteSnack,
  putSnack,
} = require("../queries/snacks");


function validateInput(snack) {
  console.log(snack.fiber, typeof snack.fiber);
  return (
    snack.name &&
    typeof snack.name === "string" &&
    Number(snack.fiber) !== "NaN" &&
    Number(snack.protein) !== "NaN"
  );
}

//INDEX
snacks.get("/", async (req, res) => {
  const allSnacks = await getAllSnacks();
  if (allSnacks[0]) {
    res.status(200).json(allSnacks);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

//SHOW
snacks.get("/:id", async (req, res) => {
  const { id } = req.params;
  const snack = await getSnack(id);
  console.log(snack);
  if (snack) {
    res.json(snack);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

//CREATE
snacks.post("/", async (req, res) => {
  try {
    if (!validateInput(req.body)) {
      return res.status(400).json({ error: "Invalid input please check your input again" });
    }
    const snack = await createSnack(req.body);
    return res.json(snack);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//DELETE
snacks.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedSnack = await deleteSnack(id);
  if (deletedSnack.id) {
    res.status(200).json(deletedSnack);
  } else {
    res.status(404).json("Snack not found");
  }
});

//UPDATE
snacks.put("/:id", async (req, res) => {
  try {
    if (!validateInput(req.body)) {
        return res
        .status(400)
        .json({ error: "Invalid input please check your input again" });
    }
    const snack = await putSnack(req.body, req.params.id);
    return res.json(snack);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = snacks;
