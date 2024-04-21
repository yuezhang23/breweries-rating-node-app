import model from "./model.js";

export const createBrewery = (brew) => {
  delete brew._id;
  return model.create(brew);
}

export const getAllBreweries = () => model.find();
export const findBreweryById = (id) =>  model.findOne({ _id : id });

export const updateBrewery = (id, brew) => model.updateOne({ _id: id }, { $set: brew});

export const deleteBrewery = (id) => model.deleteOne({ _id: id });
export const getRandomBrewery = () => model.aggregate([{ $sample: { size: 1 } }]);
export const getReviewsByUser = (uid) => model.find({}, {_id:1, name:1, reviews: 1 }).and([{"reviews.userId" : uid}])
export const sortBreweriesByLikes = (count) => model.find({}, { _id: 0, name: 1, brewery_type: 1, likes: 1}).sort({ likes: -1 }).limit(count);
export const sortBreweriesByFollowers = (count) => model.find({}, { _id: 0, name: 1, brewery_type: 1, followers:1}).sort({followers: -1 }).limit(count);
