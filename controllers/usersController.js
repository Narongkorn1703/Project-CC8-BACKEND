const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const { JWT_SECRET, BCRYPT_SALT, JWT_EXPIRES_IN } = process.env;

exports.protect = async (req, res, next) => {
  try {
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];

    if (!token)
      return res
        .status(401)
        .json({ message: "you are unauthorized" });

    const payload = jwt.verify(token, JWT_SECRET);
    const users = await Users.findOne({ where: { id: payload.id } });
    if (!users)
      return res.status(400).json({ message: "user not found" });
    req.users = users;
    next();
  } catch (err) {
    // if (err.errors[0].message === "users.email must be unique")
    //   return res.status(400).json({ message: "This email used" });
    next(err);
  }
};
exports.register = async (req, res, next) => {
  try {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      tel,
    } = req.body;

    if (!password == "" && password.length < 6)
      return res.status(401).json({
        message:
          "password is required  and password must values more than 6",
      });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "password not match" });

    // if (firstName === "")
    const hashedPassword = await bcrypt.hash(password, +BCRYPT_SALT);
    // const checkEmail = await Users.findOne({ where: { email } });
    // if (email === checkEmail)w
    //   return res.status(400).json({ message: "This Email used" });
    const users = await Users.create({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      tel,
    });

    const payload = { id: users.id, email, firstName, lastName, tel };
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: +JWT_EXPIRES_IN,
    });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const users = await Users.findOne({ where: { email } });
    if (!users)
      return res
        .status(400)
        .json({ message: "username or password incorrect" });

    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "usersname or password incorrect" });

    const payload = {
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      tel: users.tel,
      role: users.role,
    };
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: +JWT_EXPIRES_IN,
    });
    res.status(200).json({ token, payload });
  } catch (err) {
    next(err);
  }
};
