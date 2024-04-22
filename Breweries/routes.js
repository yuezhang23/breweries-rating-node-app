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
    res.send(response);
    }
    
    const getRandomBreweriesbyAdmin = async (req, res) => {
        const count = parseInt(req.params.num)
        const response = await dao.getRandomBrewery(count);
        res.send(response);
    }
    
    const getReviewsByUser = async (req, res) =>{
        const {userId} = req.params;
        const response = await dao.getReviewsByUser(userId);
        res.send(response);
    }
    
    const sortBreweriesByLikes = async (req, res) => {
        const count = parseInt(req.params.count)
        const response = await dao.sortBreweriesByLikes(count);
        res.send(response);
    }

    const sortBreweriesByFollowers = async (req, res) => {
        const count = parseInt(req.params.count);
        const response = await dao.sortBreweriesByFollowers(count);
        res.send(response);
    }

    const findBreweryById = async (req, res) => {
        const brew = await dao.findBreweryById(req.params.id);
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
            const brew = await axios.get(`${BREW_API}/${req.body.id}`);
            if (brew) {
                res.send(brew)
            } else{
                const newBrew = await dao.createBrewery(req.body)
                res.send(newBrew)
            }
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

    const updateBreweryReviews = async (req, res) => {
        const { id } = req.params;
        const brewery = await dao.findBreweryById(id);
        if (!brewery) {
            res.status(400).send('this brewery has not been invited');
        } else {
            const status = await dao.updateBreweryReviews(id, req.body)
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
app.get("/api/admin/breweries/random/:num", getRandomBreweriesbyAdmin);
app.get("/api/admin/breweries/reviews/:userId", getReviewsByUser);
app.get("/api/admin/breweries/likes/:count", sortBreweriesByLikes);
app.get("/api/admin/breweries/followers/:count", sortBreweriesByFollowers);
app.get("/api/admin/breweries/:id", findBreweryById);
app.post("/api/admin/breweries", createBrewery);
app.put("/api/admin/breweries/:id", updateBrewery);
app.put("/api/admin/breweries/reviews/:id", updateBreweryReviews);
app.delete("/api/admin/breweries/:id", deleteBrewery);
}