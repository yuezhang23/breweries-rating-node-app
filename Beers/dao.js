import model from "./model.js";

export const getAllBeers = (query) => model.find(query);
export const updateBeer = (id, beer) => model.updateOne({ _id: id }, beer);
export const deleteBeer = (id) => model.deleteOne({ _id: id });
export const createBeer = (beer) => model.create(beer);
