import yelp from "yelp-fusion";
import dotenv from "dotenv";

dotenv.config();

export const getSpotRecommend = async (category, latitude, longitude, page) => {
  const client = yelp.client(process.env.YELP_API_KEY);
  console.log(process.env.YELP_API_KEY);
  return client
    .search({
      categories: category,
      latitude: latitude,
      longitude: longitude,
      limit: 10,
      offset: (page - 1) * 10,
    })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      return e;
    });
};
