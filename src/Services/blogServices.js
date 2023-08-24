import { httpClient } from "../utils/HttpClient";

export const getBlog = () => {
  return httpClient.get("api/Blogs")
};

export const getByBlog = (id) => {
  return httpClient.get(`api/Blogs/${id}`);
};