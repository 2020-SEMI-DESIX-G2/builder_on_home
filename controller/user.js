const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const awsUploadImage = require("../utils/aws-upload-image");

function createToken(user, SECRET_KEY, expiresIn) {
  const { id, name, email, username, type } = user;
  console.log('create token ' + user);
  const payload = {
    id,
    name,
    email,
    username,
    type,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

async function register(input) {
  const newUser = input;
  newUser.email = newUser.email.toLowerCase();
  newUser.username = newUser.username.toLowerCase();
  console.log(input);

  const { email, username, password } = newUser;

  // Revisamos si el email esta en uso
  const foundEmail = await User.findOne({ email });
  if (foundEmail) throw new Error("El email ya esta en uso");

  // Revisamos si el username esta en uso
  const foundUsername = await User.findOne({ username });
  if (foundUsername) throw new Error("El nombre de usuario ya esta en uso");

  // Encriptar
  const salt = await bcryptjs.genSaltSync(10);
  newUser.password = await bcryptjs.hash(password, salt);
  // newUser.description = "";
  // newUser.phone_number = "";
  // newUser.direction = "";

  try {
    const user = new User(newUser);
    console.log(user);
    user.save();
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function login(input) {
  const { email, password } = input;
  console.log('email ' + email);

  const userFound = await User.findOne({ email: email.toLowerCase() });
  console.log('userFound' + userFound);
  if (!userFound) throw new Error("Error en el email o contraseña");

  const passwordSucess = await bcryptjs.compare(password, userFound.password);
  console.log(passwordSucess);
  if (!passwordSucess) throw new Error("Error en el email o contraseña");

  return {
    token: createToken(userFound, process.env.SECRET_KEY, "400h"),
  };
}

async function getUser(id, username) {
  console.log('getUser controller')
  console.log(id)
  let user = null;
  if (id) user = await User.findById(id);
  if (username) user = await User.findOne({ username });
  if (!user) throw new Error("El usuario no existe");

  return user;
}

async function updateUser(username, input) {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Usuario no encontrado.");
  const updateUserData = input;
  const { name,
    description,
    siteWeb,
    phone_number,
    direction } = updateUserData;
  console.log(input);

  try {
    return User.findOneAndUpdate(user.id, {
      name: updateUserData.name,
      description: updateUserData.description,
      siteWeb: updateUserData.siteWeb,
      phone_number: updateUserData.phone_number,
      direction: updateUserData.direction,
    }, function (err) {
      console.log(err);
      if (err) return next(err);
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function updateAvatar(file, ctx) {
  console.log('ctx' + ctx);
  const { id } = ctx.user;
  const { createReadStream, mimetype } = await file;
  const extension = mimetype.split("/")[1];
  const imageName = `avatar/${id}.${extension}`;
  const fileData = createReadStream();

  try {
    const result = await awsUploadImage(fileData, imageName);
    await User.findByIdAndUpdate(id, { avatar: result });
    return {
      status: true,
      urlAvatar: result,
    };
  } catch (error) {
    return {
      status: false,
      urlAvatar: null,
    };
  }
}

async function deleteAvatar(ctx) {
  const { id } = ctx.user;
  try {
    await User.findByIdAndUpdate(id, { avatar: "" });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  register,
  login,
  getUser,
  updateUser,
  updateAvatar,
  deleteAvatar,
};