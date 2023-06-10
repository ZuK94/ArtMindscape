import httpServices from "./httpServices";

// new image upload

export async function uploadNewImage(newImageData) {
  return await httpServices.post("/art/upload-new-image", newImageData, {
    headers: {
      "content-type": "application/json",
    },
  });
}

// get art creator collection

export async function getCreatorArt(id) {
  return await httpServices.get(`art/creator-collection/${id}`);
}

// get all user art (logged user)

export async function getUserImages() {
  return await httpServices.get("/art/user-collections");
}

// get all public art

export async function getAllShared() {
  return await httpServices.get(`/art/all-shared`);
}

// update art

export async function updateImage(id, art) {
  return await httpServices.put(`/art/${id}`, art);
}

// manage likes

export async function manageLike(art_id, isLiked) {
  return await httpServices.put(`/art/like/${art_id}`, {
    isLiked,
  });
}

// share art

export async function publishArt(id, isPublic) {
  return await httpServices.post(`/art/share/${id}`, { isPublic });
}

// delete art

export async function deleteImage(id) {
  return await httpServices.delete(`/art/${id}`);
}

// get random art
export async function getRandomArt(amount) {
  return await httpServices.get(`/art/random/${amount}`);
}

const artServices = {
  uploadNewImage,
  getUserImages,
  updateImage,
  getAllShared,
  getRandomArt,
  deleteImage,
  manageLike,
  getCreatorArt,
};

export default artServices;
