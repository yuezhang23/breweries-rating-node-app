import axios from "axios";
import * as dao from "./dao.js";
export const BREW_API = "https://api.openbrewerydb.org/v1/breweries"
axios.defaults.withCredentials = true;


export default function Breweries(app) {
  const getAllBreweries = async (req, res) => {
    const response = await axios.get(BREW_API);
    res.json(response.data);
  }

  const getRandomBrewries = async (req, res) => {
    const response = await axios.get(`${BREW_API}/random`);
    res.json(response.data[0]);
  }
    
    const getAllBreweriesbyAdmin = async (req, res) => {
    const response = await dao.getAllBreweries();
    res.send(response.data);
    }
    
    const getRandomBreweriesbyAdmin = async (req, res) => {
        const response = await dao.getRandomBrewery();
        res.send(response.data);
    }
    
    const getReviewsByUser = async (req, res) =>{
        const id = req.params;
        const response = await dao.getReviewsByUser(id);
        res.send(response.data).pretty();
    }
    
    const sortBreweriesByLikes = async (req, res) => {
        const count = req.params;
        const response = await dao.sortBreweriesByLikes(count);
        res.send(response.data);
    }

    const sortBreweriesByFollowers = async (req, res) => {
        const count = req.params;
        const response = await dao.sortBreweriesByFollowers(count);
        res.send(response.data);
    }

    const findBreweryById = async (req, res) => {
        const brew = await dao.findBreweryById(req.params);
        if (brew) {
            res.json(brew);
        } else {
            res.status(400).send('This brewery is not invited');  
        }
    };

    const createBrewery = async (req, res) => {
        const brewery = await dao.findBreweryById(req.body.id);
        if (brewery) {
            res.status(400).send('this brewery has been invited');
        } else {
            const status = await dao.createBrewery(req.body)
            res.send(status)
        }
    };
   
    const updateBrewery = async (req, res) => {
        const { id } = req.params;
        const brewery = await dao.findBreweryById(id);
        if (!brewery) {
            res.status(400).send('this brewery has not been invited');
        } else {
            const status = await dao.updateBrewery(id, req.body)
            res.send(status)
        }
    } 

    const deleteBrewery = async (req, res) => {
        const status = await dao.deleteBrewery(req.params);
        res.json(status);
    };    
 

  app.get("/api/breweries", getAllBreweries);
  app.get("/api/breweries/random", getRandomBrewries);
    app.get("/api/admin/breweries", getAllBreweriesbyAdmin);
    app.get("/api/admin/breweries/random", getRandomBreweriesbyAdmin);
    app.get("/api/admin/breweries/reviews/:userId", getReviewsByUser);
    app.get("/api/admin/breweries/likes/:count", sortBreweriesByLikes);
    app.get("/api/admin/breweries/followers/:count", sortBreweriesByFollowers);
    app.get("/api/admin/breweries/:id", findBreweryById);
    app.post("/api/admin/breweries", createBrewery);
    app.put("/api/admin/breweries/:id", updateBrewery);
    app.delete("/api/admin/breweries/:id", deleteBrewery);
}

