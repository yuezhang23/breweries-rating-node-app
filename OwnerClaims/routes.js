import * as dao from "./dao.js";

export default function ClaimRoutes(app) {

  const createClaim = async (req, res) => {
    try {
      const claim = await dao.createClaim(req.body);
      res.json(claim);
    } catch (error) {
      res.status(400).send("Name is required.");
    }
  };
  app.post("/api/claims", createClaim);

  const updateClaim = async (req, res) => {
    const { claimId } = req.params;
    try {
      const status = await dao.updateClaim(claimId, req.body);
      const claim = await dao.findClaimById(claimId);
      res.json(claim);
    } catch (error) {
      res.status(400).json({ message: error.message });
    } 
  };
  app.put("/api/claims/:claimId", updateClaim);

  const findAllClaims = async (req, res) => {
    const { completion } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const claims = await dao.findUsersByCompletion(completedBool);
      res.json(claims);
      return;
    }
    const claims = await dao.findAllClaims();
    res.json(claims);
    return;
  };
  app.get("/api/claims", findAllClaims);

  const findClaimById = async (req, res) => {
    try {
      const { claimId } = req.params
      const claim = await dao.findUserById(claimId);
      if (!claim) {
        throw new Error("No user with this ID")
      }
      res.json(claim);
    } catch (error) {
      res.status(400).json(
        { message: error.message });
    }
  };
  app.get("/api/claims/:claimId", findClaimById);

  const findUserClaims = async (req, res) => {
    try {
      const { userId } = req.params;
      const claims = await dao.findUserClaims(userId);
      if (!claims.length) {
        return res.status(404).json({ message: "No pending claims found for this user." });
      }
      res.json(claims);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  app.get("/api/users/:userId/claims", findUserClaims);

  const findPendingClaims = async (req, res) => {
    try {
      const { userId } = req.params;
      const claims = await dao.findPendingClaims(userId);
      res.json(claims);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  app.get("/api/users/:userId/claims/pending", findPendingClaims);
}