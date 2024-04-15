import * as dao from "./dao.js";
let globalCurrentUser = null; 

export default function UserRoutes(app) {

  const createUser = async (req, res) => {
    try {
      const user = await dao.createUser(req.body);
      res.json(user);
    } catch (error) {
      res.status(400).send('User must have unique username and a password/first name/last name.');
    }
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.userId);
    res.json(status);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    try {
      if (currentUser) {
        globalCurrentUser = currentUser;
        res.json(currentUser);
      } else {
        throw new Error("Invalid Credential");
      }
    } catch (error) {
      res.status(401).send(error.message);
    }
  };

  const profile = async (req, res) => {
    const currentUser = globalCurrentUser;
    if (!currentUser) {
      res.status(401).send("Not logged in");
      return;
    }
    res.json(currentUser);
  };

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const newUser = req.body
    try {
      if (!newUser.username || !newUser.password || newUser.username.trim() === "" 
        || newUser.firstName.trim() === "" || newUser.lastName.trim() === "" || newUser.email.trim() === "") {
        throw new Error("Username, password, first and last name and email are required.");
      }
      const existingUser = await dao.checkUsernameExists(newUser.username, newUser._id);
      if (existingUser) {
        throw new Error("Username already exists.");
      }  
      const status = await dao.updateUser(userId, req.body);
      const currentUser = await dao.findUserById(userId);
      res.json(status);
    } catch (error) {
      res.status(400).json({ message: error.message });
    } 
  };

  const findAllUsers = async (req, res) => {
    const { role } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    const users = await dao.findAllUsers();
    res.json(users);
    return;
  };

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };

  const signup = async (req, res) => {
    const newUser = req.body
    try {
      if (!newUser.username || !newUser.password || newUser.username.trim() === "" 
        || newUser.firstName.trim() === "" || newUser.lastName.trim() === "" || newUser.email.trim() === "") {
        throw new Error("Username, password, first and last name and email are required");
      }
      const user = await dao.findUserByUsername(req.body.username);
      if (user) {
        throw new Error("Username already taken");
      }
      const currentUser = await dao.createUser(req.body);
      globalCurrentUser = currentUser;
      res.json(currentUser);
    } catch (error) {
      res.status(400).json(
        { message: error.message });
    }
  };

  const signout = (req, res) => {
    globalCurrentUser = null;
    res.sendStatus(200);
  };

  app.post("/api/users", createUser);
  app.delete("/api/users/:userId", deleteUser);
  app.post("/api/users/signin", signin);

  app.post("/api/users/profile", profile);
  app.put("/api/users/:userId", updateUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signout", signout);
}