///////////////////////////////////////////REQUETE GET CAMERAS///////////////////////////////////////
async function getApiCamera() {
  let resp = await fetch("http://localhost:3000/api/cameras/");
  let response = await resp.json();
  return response;
}

//////////////////////////////////////////////SEARCH URL/////////////////////////////////////////////
const id = new URL(document.location).searchParams.get("id");

/////////////////////////////////////////REQUETE GET CAMERA BY ID//////////////////////////////////
async function getApiCameraById() {
  let resp = await fetch(`http://localhost:3000/api/cameras/${id}`);
  let response = await resp.json();
  return response;
}
