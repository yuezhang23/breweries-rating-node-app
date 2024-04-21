import model from "./model.js";

export const createClaim = (claim) => {
  return model.create(claim);
}

export const updateClaim = (claimId, claim) => model.updateOne({ _id: claimId }, { $set: claim });
export const deleteClaim = (claimId) => model.deleteOne({ _id: claimId });
export const findAllClaims = () => model.find();

export const findClaimById = (claimId) => model.findById(claimId);
export const findUserClaims = (userId) => model.find({ owner: ownerId});
export const findPendingClaims = (userId) => model.find({ owner: userId, completed: false });
export const findClaimsByCompletion = (boo) => model.find({ completed: boo });