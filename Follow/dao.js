import Follow from "./model.js";

export const followUser = (follower, follows) => {
    return Follow.create({ follower: follower, follows: follows })
}

export const unfollowUser = (follower, follows) => {
    return Follow.deleteOne({ follower: follower, follows: follows })
}

export const findFollowersOfAUser = (follows) => {
    return Follow.find({ follows: follows }).populate("follower")
}

export const findFollowsOfAUser = (follower) => {
    return Follow.find({ follower: follower }).populate("follows")
}