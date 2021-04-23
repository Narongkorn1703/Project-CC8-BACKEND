const error = (err, req, res, next) => {
  if (process.env.NODE_ENV === "devolopment") {
    console.dir(err.dir);
    if (
      err.name === "TokenExpiredError" ||
      err.name === "JsonWebTokenError"
    )
      return res
        .status(401)
        .json({ message: "You are unauthorized" });
    res.status(404).json({ message: err.message });
    if (err.name === "SequelizeValidationError")
      return res
        .status(401)
        .json({ message: "You are unauthorized" });
    res.status(404).json({ message: err.message });
  } else {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};
module.exports = error;
