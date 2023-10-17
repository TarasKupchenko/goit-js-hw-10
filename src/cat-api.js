import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_TWSNzcXXshd2wTlx8wGZmTOAPuw0U7qAOkoVyaq40AXWXmhZ2AgSxAzpuz2uAlxb";

export const fetchBreeds = () => {
  return axios.get("https://api.thecatapi.com/v1/breeds");
};

export const fetchCatByBreed = (breedId) => {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return axios.get(url);
};

