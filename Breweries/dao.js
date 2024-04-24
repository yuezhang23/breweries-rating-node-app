import model from "./model.js";

export const createBrewery = (brew) => {
  delete brew._id;
  return model.create(brew);
}

export const createBrews = (brews) => {
  return model.insertMany(brews);
}

export const getAllBreweries = () => model.find();
export const findBreweryById = (id) =>  model.findOne({ _id : id });
export const findBreweryByRemoteId = (rid) =>  model.findOne({ id : rid });

export const findBreweryByName = (name) =>  model.find({ name : {$regex: new RegExp(name, 'i')}});


export const updateBrewery = (id, brew) => model.updateOne({ _id: id }, { $set: brew});
export const updateBreweryReviews = (id, review) => model.findByIdAndUpdate(id, { $set: { "reviews.$[elem]": review } },
  { arrayFilters: [{ "elem.userId": review.userId }], new: true }
);

export const deleteBrewery = (id) => model.deleteOne({ _id: id });
export const getRandomBrewery = (num) => model.aggregate([{ $sample: { size: num } }]);

export const getReviewsByUser = (uid) => model.find({}, {_id:1, name:1, likers: 1 ,followers: 1,reviews: 1 }).and([{"reviews.userId" : uid}])
export const getLikesByUser = (uid) => model.find({}).and([{"likers._id" : uid}])
export const getFollowsByUser = (uid) => model.find({}).and([{"followers._id" : uid}])


export const sortBreweriesByLikes = (count) => model.find({}).sort({ likeCount: -1 }).limit(count);

export const sortBreweriesByFollowers = (count) => model.find({}).sort({followCount: -1 }).limit(count);


export const findFollowerFromBrew = (brId,userId) => model.findOne({_id: brId, "followers._id" : userId})
export const findLikerFromBrew = (brId,userId) => model.findOne({_id: brId, "likers._id" : userId})

