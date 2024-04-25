import model from "./model.js";

export const getAllBeers = (query) => model.find(query);

export const updateBeer = (id, beer) => model.updateOne({ _id: id }, {$set: beer });
export const deleteBeer = (id) => model.deleteOne({ _id: id });
export const createBeer = (beer) => {
    delete beer._id;
    return model.create(beer);
};
export const getBeerById = (id) => model.findOne({ _id: id });
