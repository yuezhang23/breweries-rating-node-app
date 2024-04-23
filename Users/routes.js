import * as dao from "./dao.js";

export default function UserRoutes(app) {

  const createUser = async (req, res) => {
    try {
      const user = await dao.createUser(req.body);
      res.json(user);
    } catch (error) {
      res.status(400).send('User must have unique username and a password/first name/last name.');
    }
  };

  const profile = async (req, res) => {
    if (!req.session["currentUser"]) {
      res.status(401).send("Not logged in");
      return;
    }
    const currentUser = req.session["currentUser"];
    const user = await dao.findUserById(currentUser._id)
    res.json(user);
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
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
      } else {
        throw new Error("Invalid Credential");
      }
    } catch (error) {
      res.status(401).send(error.message);
    }
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
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } catch (error) {
      res.status(400).json({ message: error.message });
    } 
  };

  const adminUpdateUser = async (req, res) => {
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
      res.json(currentUser);
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
    try {
      const { userId } = req.params
      const user = await dao.findUserById(userId);
      if (!user) {
        throw new Error("No user with this ID")
      }
      res.json(user);
    } catch (error) {
      res.status(400).json(
        { message: error.message });
    }
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
      const currentUser = await dao.createUser(newUser);
      res.json(currentUser);
    } catch (error) {
      res.status(400).json(
        { message: error.message });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };



  app.post("/api/user/signin", signin);
  app.post("/api/user/signout", signout);
  app.post("/api/user/profile", profile);
  app.post("/api/user/signup", signup);

  app.post("/api/users", createUser);

  app.delete("/api/users/:userId", deleteUser);
  app.put("/api/users/:userId", updateUser);
  app.put("/api/users/:userId/admin", adminUpdateUser);
  app.get("/api/users/:userId", findUserById);
  app.get("/api/users", findAllUsers);
}