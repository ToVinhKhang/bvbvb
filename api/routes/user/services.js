const { User } = require("@models/user");
const { Student } = require("@models/student");
const { Teacher } = require("@models/teacher")
const { hashPassword } = require("@utils/helper");
const { v4: uuidv4 } = require("uuid");
const { Token } = require("@models/token");

async function login(username, password) {
  const trx = await User.startTransaction();
  const trx2 = await Token.startTransaction();
  try {
    const user = await User.findByCredentials(username, password.toString());

    const id = user.id;
    const token = await user.generateAuthToken(trx, "web");
    const token_i = await Token.query().findById(id);

    if (token_i) {
      await Token.query().findById(id).patch({
        token: token,
      });
    } else {
      await Token.query().insert({
        id: id,
        token: token,
      });
    }

    let infor = await Student.query().findById(id)
    if (!infor) infor = await Teacher.query().findById(id)

    const name = infor? infor.name : "admin"

    trx.commit();
    trx2.commit();

    return { user, token, name };
  } catch (error) {
    trx.rollback();
    trx2.rollback();
    throw error;
  }
}

async function logout(data) {
  const trx = await User.startTransaction();
  try {
    await data.user
      .$relatedQuery("user_token", trx)
      .delete()
      .where("token", data.token);
    trx.commit();

    return;
  } catch (error) {
    trx.rollback();
    throw error;
  }
}

async function signIn(username, password, role, detail) {
  const trx = await User.startTransaction();
  try {
    var id = uuidv4();
    password = await hashPassword(password);

    const user = await User.query().insert({
      id: id,
      username: username,
      password: password,
      role: role,
    });

    const student = await Student.query().insert({
      id: id,
      name: detail.name,
      phone: detail.phone,
      birth: detail.birth,
      CMND: detail.idnum,
      address: detail.address,
    });

    trx.commit();

    return { user, student };
  } catch (error) {
    trx.rollback();
    throw error;
  }
}

module.exports = {
  login,
  logout,
  signIn,
};
