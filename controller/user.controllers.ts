import { Request, Response } from "express"
import { createUserDB, deleteUserDB, getUserDB, getUserDBByEmail, updateUserDB } from "../repository/userRepository";

export const getUsers = async (req: Request, res: Response) => {
  const users = await getUserDB();

  res.json({
    msg: "GetUsers from Controller",
    users
  });
}


export const getUserByID = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const user = await getUserDB(userID);

  // ESTAS VALIDACIONES PODRIAN ESTAR EN UNA MIDDLEWARE
  if (!user) {
    return res.status(404).json({
      msg: "No se encontro el usuario con ese ID"
    })
  }

  res.json({
    msg: "GetUsersByID from Controller",
    user
  });
}

export const postUser = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    // ESTAS VALIDACIONES PODRIAN ESTAR EN UNA MIDDLEWARE
    const getEmail = await getUserDBByEmail(body.email);
    if (getEmail) {
      return res.status(400).json({
        msg: "Ya existe un usuario con este email"
      })
    }

    const userCreated = await createUserDB(body);
    res.json({
      msg: "PostUser from Controller",
      userCreated
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hubo un error al insertar en la Base de datos"
    })
  }

}

export const putUser = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const { body } = req;

  try {
    // ESTAS VALIDACIONES PODRIAN ESTAR EN UNA MIDDLEWARE
    const getUser = await getUserDB(userID);
    if (!getUser) {
      return res.status(404).json({
        msg: "El usuario no existe",
        userID,
        getUser,
      })
    }
    // ESTAS VALIDACIONES PODRIAN ESTAR EN UNA MIDDLEWARE
    const getEmail = await getUserDBByEmail(body.email);
    if (getEmail) {
      return res.status(400).json({
        msg: "Ya existe un usuario con este email"
      })
    }

    await updateUserDB(body, userID);
    res.json({
      msg: "PostUser from Controller",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hubo un error al insertar en la Base de datos"
    })
  }

  res.json({
    msg: "PutUser from Controller",
    body,
    userID
  });
}


export const deleteUser = async (req: Request, res: Response) => {
  const { userID } = req.params;
  const user = await getUserDB(userID);
  // ESTAS VALIDACIONES PODRIAN ESTAR EN UNA MIDDLEWARE
  if (!user) {
    return res.status(404).json({
      msg: "No se encontro el usuario con ese ID"
    })
  }

  const deletedUser = await deleteUserDB(userID);

  res.json({
    msg: "DeleteUser from Controller",
    deletedUser
  });
}