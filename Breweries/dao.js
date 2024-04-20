import model from "./model.js";

export const createBrewery = (brew) => {
  delete brew._id;
  return model.create(brew);
}

export const findBreweryById = (id) =>  model.findOne({ _id : id });

export const updateBrewery = (id, brew) => model.updateOne({ _id: id }, { $set: brew});

export const deleteBrewery = (id) => model.deleteOne({ _id: id });
export const getAllBreweries = () => model.find();
export const getRandomBreweries = () => model.aggregate([{ $sample: { size: 1 } }])
    .then(randomObjects => {
        if (randomObjects.length > 0) {
            const randomObject = randomObjects[0];
            console.log(randomObject);
        } else {
            console.log('No random objects found.');
        }
    });

export const getReviewsByUser = (userId) => model.find({}, { _id: 1, reviews: 1}).and([{userid : userId}]);
export const sortBreweriesByLikes = (count) => model.find({}).sort({ likes: 1 }).limit(count);
export const sortBreweriesByFollowers = (count) => model.find({}).sort({followers: 1 }).limit(count);



