import model from "./model.js";

export const getAllStores = (query) => model.find(query);

export const updateStore = (id, store) => model.updateOne({ _id: id }, {$set: store });
export const deleteStore = (id) => model.deleteOne({ _id: id});
export const createStore = (store) => {
    delete store._id;
    return model.create(store);
};
export const getStoreById = (id) => model.findOne({ _id: id });