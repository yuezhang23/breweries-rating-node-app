import model from "./model.js";

export const getAllStores = (query) => model.find(query);
export const updateStore = (id, store) => model.updateOne({ _id: id }, store);
export const deleteStore = (id) => model.deleteOne({ _id: id});
export const createStore = (store) => model.create(store);