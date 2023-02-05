//Configuration
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
  let { name, fiber, protein, added_sugar, is_healthy, image } = snack;
  try {
    name = capitalize(name);
    is_healthy = confirmHealth(snack);

    let query = "INSERT INTO snacks ";

    const fields = `(name, fiber, protein, added_sugar, is_healthy, image)`;

    let values = "VALUES ($1, $2, $3, $4, $5, $6)";

    query += fields;
    query += values;
    query += " RETURNING *";
    console.log(query);
    const result = await db.one(query, [
      name,
      fiber,
      protein,
      added_sugar,
      is_healthy,
      image ||
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png",
    ]);
    console.log(image);
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
