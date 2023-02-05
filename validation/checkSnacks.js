const confirmHealth = (snack) => {
  return (
    (snack.fiber >= 5 && snack.added_sugar <= 5) ||
    (snack.protein >= 5 && snack.added_sugar <= 5)
  );
};

function capitalize(str) {
  return str
    .split(" ")
    .map((itm) => `${itm[0].toUpperCase()}${itm.slice(1).toLowerCase()}`)
    .join(" ");
}

module.exports = {
  confirmHealth,
  capitalize,
};
