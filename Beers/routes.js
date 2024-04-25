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

    const getBeers = async (req, res) => {
        try {
            const beers = await dao.getBeers(); 
            res.json(beers); 
        } catch (error) {
            console.error('Error fetching beers:', error);
            res.status(500).send({ message: "An error occurred while fetching beers.", error: error.toString() });
        }
    }

    const getBeerById = async (req, res) => {
        try {
            const beerId = req.params.beerId;
            const beer = await dao.getBeerById(beerId);
            if (!beer) {
                throw new Error("No beer with this ID");
            }
            res.json(beer);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    const createBeer = async (req, res) => {
        try {
            const beer = await dao.createBeer(req.body);
            res.json(beer);
        } catch (error) {
            res.status(400).send("Name is required.");
        }
    }

    const updateBeer = async (req, res) => {
        const { beerId } = req.params;
        const newBeer = req.body;
        try {
            const status = await dao.updateBeer(beerId, newBeer);
            const beer = await dao.getBeerById(beerId);
            res.json(beer);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    const deleteBeer = async (req, res) => {
        const { beerId } = req.params;
        const status = await dao.deleteBeer(beerId);
        res.json(status);
    }

    app.get("/api/beers/by-brewery/:breweryId", getAllBeers);
    app.get("/api/beers", getBeers);
    app.post("/api/beers", createBeer);
    app.put("/api/beers/:beerId", updateBeer);
    app.delete("/api/beers/:beerId", deleteBeer);
    app.get("/api/beers/:beerId", getBeerById);
};
