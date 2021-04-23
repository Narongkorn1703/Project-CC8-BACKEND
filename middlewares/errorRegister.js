class ValidateError extends Error {
  constructor(message, statusCode) {
    super(message), this.statusCode;
  }
}

module.exports = ValidateError;

// if (!name) throw new ValidateError(`Your name is required`, 400)
// if (name.trim() === "") throw new ValidateError(`Your name can not be blank`, 400)
// if (!userName) throw new ValidateError(`Username is required`, 400)
// if (userName.trim() === "") throw new ValidateError(`Username can not be blank`, 400)
// if (!password) throw new ValidateError(`Password is required`, 400)
// if (password.trim() === "") throw new ValidateError(`Password can not be blank`, 400)
// if (!confirmPassword) throw new ValidateError(`Confirm password is required`, 400)
// if (password !== confirmPassword) throw new ValidateError(`Confirm password is required`, 400)
// if (!email) throw new ValidateError(`Your email is required`, 400)
// if (email.trim() === "") throw new ValidateError(`Email can not be blank`, 400)
// if (!phoneNumber) throw new ValidateError(`Your phone number is required`, 400)
// if (isNaN(phoneNumber)) throw new ValidateError(`Your phone number must be number`, 400)
// if (!isEmail.test(email)) throw new ValidateError('Please check your email', 400)
// if (!isPassword.test(password)) throw new ValidateError(`Password must has minimum eight characters and at least one upper case English letter, one lower case English letter, one number and one special character`, 400)
