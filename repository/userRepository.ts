import User from "../models/user";

export const getUserDB = async (id?: any) => {
  let userDB;
  if (id) {
    userDB = await User.findByPk(id);
  } else {
    userDB = await User.findAll();
  }

  return userDB;
}

export const getUserDBByEmail = async (email?: any) => {
  let userDB;
  if (email) {
    userDB = await User.findOne({
      where: {
        email
      }
    });
    return userDB;
  }
}

export const updateUserDB = async (userBody: any, userID: any) => {
  const updatedUser = await User.update(userBody, {
    where: {
      id: userID
    }
  });
  return updatedUser;
}

export const deleteUserDB = async (userID: any) => {
  const updatedUser = await User.update({ state: 0 }, {
    where: {
      id: userID
    }
  });
  return updatedUser;
}

export const createUserDB = async (userBody: any) => {
  const savedUser = User.build(userBody)
  await savedUser.save();
  return savedUser;
}
