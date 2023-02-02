const db = require("../db/dbConfig.js");

//GET ALL Function
const getAllSnacks = async () => {
  try {
    const allSnacks = await db.any("SELECT * FROM snacks");
    return allSnacks;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// GET ONE Function
const getSnack = async (id) => {
  try {
    const oneSnack = await db.oneOrNone("SELECT * FROM snacks WHERE id=$1", id);
    return oneSnack;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//CREATE POST snack Function
const createSnack = async (snack) => {
  const { name, fiber, protein, added_sugar, is_healthy, image } = snack;
  try {
    const newSnack = await db.one(
      "INSERT INTO snacks (name, fiber, protein, added_sugar, is_healthy, image) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, fiber, protein, added_sugar, is_healthy, image]
    );
    return newSnack;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//DELETE Snack function
const deleteSnack = async (id) => {
  try {
    const deletedSnack = await db.one(
      "DELETE FROM snacks WHERE id = $1 RETURNING *",
      id
    );
    return deletedSnack;
  } catch (error) {
    return error;
  }
};

//UPDATE Snack function
const updateSnack = async (id, snack) => {
  const { name, fiber, protein, added_sugar, is_healthy, image } = snack;
  try {
    const updatedSnack = await db.one(
      "UPDATE snacks SET name=$1, fiber=$2, protein=$3, added_sugar=$4, is_healthy=$5, image=$6 WHERE id=$7 RETURNING *",
      [name, fiber, protein, added_sugar, is_healthy, image, id]
    );
    return updatedSnack;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllSnacks,
  getSnack,
  createSnack,
  deleteSnack,
  updateSnack,
};
