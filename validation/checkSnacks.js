const checkName = (req, res, next) => {
  if (req.body.name) {
    next();
    console.log("name is ok");
  } else {
    res.status(400).json({ error: "name is required!" });
  }
};

const checkBoolean = (req, res, next) => {
  const { is_healthy } = req.body;
  if (is_healthy === "true" || is_healthy === "false" || !is_healthy) {
    next();
  } else {
    res.status(400).json({ error: "is_healthy must be a boolean value" });
  }
};

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

const checkURL = (req, res, next) => {
  const { url } = req.body;
  if (
    url.substring(0, 7) === "https://" ||
    url.substring(0, 8) === "https://"
  ) {
    return next();
  } else {
    res
      .status(400)
      .json({ error: "You forgot to start your url with http:// or https://" });
  }
};

module.exports = {
  checkName,
  checkBoolean,
  checkURL,
  confirmHealth,
  capitalize,
};
