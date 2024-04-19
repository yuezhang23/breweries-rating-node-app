import axios from "axios";
export const BREW_API = "https://api.openbrewerydb.org/v1/breweries"

export default function Breweries(app) {
  const getAllBreweries = async (req, res) => {
    const response = await axios.get(BREW_API);
    res.json(response.data);
  }
  app.get("/api/breweries", getAllBreweries);

  const getRandomBrewries = async (req, res) => {
    const response = await axios.get(`${BREW_API}/random`);
    res.json(response.data[0]);
  }
  app.get("/api/breweries/random", getRandomBrewries);

}