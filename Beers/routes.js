import axios from "axios";
import * as dao from "./dao.js";

axios.defaults.withCredentials = true;


export default function Beers(app) {
    const getAllBeers = async (req, res) => {
        try {
            const breweryId = req.params.breweryId; 
            const beers = await dao.getAllBeers({ "brewery.remote_id": breweryId }); 
            console.log('Fetched beers:', beers);
            res.json(beers); 
        } catch (error) {
            console.error('Error fetching beers:', error);
            res.status(500).send({ message: "An error occurred while fetching beers.", error: error.toString() });
        }
    }


    app.get("/api/beers/by-brewery/:breweryId", getAllBeers);
};
