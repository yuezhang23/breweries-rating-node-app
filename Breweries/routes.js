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
    
  const getHybridBrew = async (req, res) => {
    const {rid ,uid}= req.params
    const response = await dao.findBreweryByRemoteId(rid);
    // console.log(response.data)
    if (response) {
        res.send(response);
    } else {
        const responseR = await axios.get(`${BREW_API}/${rid}`);
        const addressC = {
            street: responseR.data.street,
            postal_code: responseR.data.postal_code,
            city:  responseR.data.city,
            state_province: responseR.data.state_province,
            country: responseR.data.country
        };
        const hybridBrew = {...responseR.data, address: addressC, followCount : 1, likeCount: 1, followers : [{_id: uid}],likers : [{_id : uid}]}
        const newBrew = await dao.createBrewery(hybridBrew)
        res.send(newBrew);
    }
  }
  
    const createBrewery = async (req, res) => {
        const brewery = await dao.findBreweryByRemoteId(req.body.id);
        if (brewery) {
            res.status(400).send('this brewery has been invited');
        } else {
            const newBrew = await dao.createBrewery(req.body)
            res.send(newBrew)
        }
    };

    const createBrews = async (req, res) => {
        const newBrews = await dao.createBrews(req.body)
        res.send(newBrews)
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

    const getLikesByUser = async (req, res) =>{
        const {userId} = req.params;
        const response = await dao.getLikesByUser(userId);
        res.send(response);
    }

    const getFollowsByUser = async (req, res) =>{
        const {userId} = req.params;
        const response = await dao.getFollowsByUser(userId);
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

    const findBrewsByName = async (req, res) => {
        const brew = await dao.findBreweryByName(req.params.name);
        if (brew) {
            res.json(brew);
        } else {
            res.status(400);  
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
        const status = await dao.deleteBrewery(req.params.id);
        res.json(status);
    };   
    
    const findFollowerFromBrew = async (req, res) => {
        const { brId, userId } = req.params;
        const follower = await dao.findFollowerFromBrew(brId,userId);
        if (follower) {
            res.json(follower);
        } else {
            res.json();  
        }
    };

    const findLikerFromBrew = async (req, res) => {
        const { brId, userId } = req.params;
        const liker = await dao.findLikerFromBrew(brId,userId);
        if (liker) {
            res.json(liker);
        } else {
            res.json();  
        }
    };
    
app.get("/api/breweries", getAllBreweries);
app.get("/api/breweries/random", getRandomBrewries);
app.get("/api/breweries/:rid/:uid", getHybridBrew);

app.get("/api/admin/breweries", getAllBreweriesbyAdmin);
app.get("/api/admin/breweries/random/:num", getRandomBreweriesbyAdmin);


app.get("/api/admin/breweries/reviews/:userId", getReviewsByUser);
app.get("/api/admin/breweries/likersID/:userId", getLikesByUser);
app.get("/api/admin/breweries/followersID/:userId", getFollowsByUser);

app.get("/api/admin/breweries/:brId/follow/:userId", findFollowerFromBrew);
app.get("/api/admin/breweries/:brId/like/:userId", findLikerFromBrew);

app.get("/api/admin/breweries/likes/:count", sortBreweriesByLikes);
app.get("/api/admin/breweries/followers/:count", sortBreweriesByFollowers);
app.get("/api/admin/breweries/:id", findBreweryById);
app.get("/api/admin/breweries/name/:name", findBrewsByName);
app.post("/api/admin/breweries", createBrewery);
app.post("/api/admin/breweries/many", createBrews);

app.put("/api/admin/breweries/:id", updateBrewery);
app.put("/api/admin/breweries/reviews/:id", updateBreweryReviews);
app.delete("/api/admin/breweries/:id", deleteBrewery);
}