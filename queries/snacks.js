const db = require("../db/dbConfig.js");
const { confirmHealth, capitalize } = require("../validation/checkSnacks");

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
  try {
    snack.name = capitalize(snack.name);
    snack.is_healthy = confirmHealth(snack);
    let { image } = snack;
    let query = "INSERT INTO snacks ";

    const fields = `(name, fiber, protein, added_sugar, is_healthy${
      image ? ", image" : ""
    })`;

    let values =
      "VALUES (${name}, ${fiber}, ${protein}, ${added_sugar}, ${is_healthy}";
    if (image) values += ", ${image}";
    values += ")";

    query += fields;
    query += values;
    query += " RETURNING *";

    const result = await db.one(query, snack);
    return result;
  } catch (err) {
    console.error(err);
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
const putSnack = async (snack, id) => {
  try {
    snack.name = capitalize(snack.name);
    snack.is_healthy = confirmHealth(snack);

    let query =
      "UPDATE snacks SET name = ${name}, fiber = ${fiber}, protein = ${protein}, added_sugar = ${added_sugar}, is_healthy = ${is_healthy}, image = ${image} WHERE id = ${id} RETURNING id";

    const result = await db.one(query, { id, ...snack });
    return result;
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getAllSnacks,
  getSnack,
  createSnack,
  deleteSnack,
  putSnack,
};
