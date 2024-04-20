import * as dao from "./dao.js";

function FollowRoutes(app) {
	const followUser = async (req, res) => {
		const follower = req.session.user._id;
		const follows = req.params.follows;
		const follow = await dao.followUser(follower, follows);
		res.json(follow);
	}
	app.post("/api/follow/:follows", followUser);

	const unfollowUser = async (req, res) => {
		const follower = req.session.user._id;
		const follows = req.params.follows;
		const status = await dao.unfollowUser(follower, follows);
		res.json(status);
	}
	app.delete("/api/follow/:follows", unfollowUser);

	const findFollowersOfAUser = async (req, res) => {
		try {
			const follows = req.params.follows;
			const followers = await dao.findFollowersOfAUser(follows);
			res.json(followers);
		} catch (err) {
			res.send("unable to fetch followers")
		}
	}
	app.get("/api/follow/:follows/followers", findFollowersOfAUser);

	const findFollowsOfAUser = async (req, res) => {
		try {
			const follower = req.params.follower;
			const follows = await dao.findFollowsOfAUser(follower);
			res.json(follows);
		} catch (err) {
			res.send("unable to fetch follows")
		}
	}
	app.get("/api/follow/:follower/follows", findFollowsOfAUser);
}

export default FollowRoutes;