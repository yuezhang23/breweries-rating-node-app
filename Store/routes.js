import axios from "axios";
import * as dao from "./dao.js";
axios.defaults.withCredentials = true;

export default function Stores(app) {
    const getAllStores = async (req, res) => {
        try {
            const breweryId = req.params.breweryId;
            const stores = await dao.getAllStores({ "breweries.remote_id": breweryId });
            console.log('Fetched stores:', stores);
            res.json(stores);
        } catch (error) {
            console.error('Error fetching stores:', error);
            res.status(500).send({ message: "An error occurred while fetching stores.", error: error.toString() });
        }
    }

    const getStoreById = async (req, res) => {
        try {
            const storeId = req.params.storeId;
            const store = await dao.getStoreById(storeId);
            if (!store) {
                throw new Error("No store with this ID");
            }
            res.json(store);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    const createStore = async (req, res) => {
        try {
            const store = await dao.createStore(req.body);
            res.json(store);
        } catch (error) {
            res.status(400).send("Name is required.");
        }
    }

    const updateStore = async (req, res) => {
        const { storeId } = req.params;
        const newStore = req.body;
        try {
            const status = await dao.updateStore(storeId, newStore);
            const store = await dao.getStoreById(storeId);
            res.json(store);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    const deleteStore = async (req, res) => {
        const { storeId } = req.params;
        const status = await dao.deleteStore(storeId);
        res.json(status);
    }


    app.get("/api/stores/by-brewery/:breweryId", getAllStores);

    app.get("/api/stores/:storeId", getStoreById);
    app.post("/api/stores", createStore);
    app.put("/api/stores/:storeId", updateStore);
    app.delete("/api/stores/:storeId", deleteStore);
}

