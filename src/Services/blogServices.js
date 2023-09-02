import { httpClient } from "../utils/HttpClient";

export const getBlog = () => {
  return httpClient.get("api/Blogs")
};

export const getByBlog = (id) => {
  return httpClient.get(`api/Blogs/${id}`);
};

export const removeBlog = (blogId) => {             //cars
  return httpClient.delete(`api/Blogs/${blogId}`)
};

export const postBlog = (data) => {         //Create car
  console.log(data  );
  return httpClient.post("api/Blogs",data)
};


export const UpdateBlog = (id,data) =>{
  console.log(data);
  return httpClient.put(`/api/Blogs/${id}`,data)
};

