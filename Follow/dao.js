import FModel from "./model.js";

export const followUser = (follower, follows) => {
    return FModel.create({ follower: follower, follows: follows })
}

export const unfollowUser = (follower, follows) => {
    return FModel.deleteOne({ follower: follower, follows: follows })
}

export const findFollowersOfAUser = (follows) => {
    return FModel.find({ follows: follows }).populate("follower")
}

export const findFollowsOfAUser = (follower) => {
    return FModel.find({ follower: follower }).populate("follows")
}