import * as dao from "./dao.js";

function FollowRoutes(app) {
	const followUser = async (req, res) => {
		const follower = req.session.user._id;
		const follows = req.params.follows;
		const follow = await dao.followUser(follower, follows);
		res.json(follow);
	}
	app.post("/api/users/:follows/follow", followUser);

	const unfollowUser = async (req, res) => {
		const follower = req.session.user._id;
		const follows = req.params.follows;
		const status = await dao.unfollowUser(follower, follows);
		res.json(status);
	}
	app.delete("/api/users/:follows/follow", unfollowUser);

	const findFollowersOfAUser = async (req, res) => {
		const follows = req.params.follows;
		const followers = await dao.findFollowersOfAUser(follows);
		res.json(followers);
	}
	app.get("/api/users/:follows/followers", findFollowersOfAUser);

	const findFollowsOfAUser = async (req, res) => {
		const follower = req.params.follower;
		const follows = await dao.findFollowsOfAUser(follower);
		res.json(follows);
	}
	app.get("/api/users/:follower/follows", findFollowsOfAUser);
}

export default FollowRoutes;