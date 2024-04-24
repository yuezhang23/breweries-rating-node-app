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

    app.get("/api/stores/by-brewery/:breweryId", getAllStores);
}

