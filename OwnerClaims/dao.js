import model from "./model.js";

export const createClaim = (claim) => {
  return model.create(claim);
}

export const updateClaim = (claimId, claim) => model.updateOne({ _id: claimId }, { $set: claim });
export const deleteClaim = (claimId) => model.deleteOne({ _id: claimId });
export const findAllClaims = () => model.find();
export const findClaimById = (claimId) => model.findById(claimId);
export const findUsersByCompletion = (boo) => model.find({ completed: boo });
export const findUsersByApproval = (foo) => model.find({ approved: foo });