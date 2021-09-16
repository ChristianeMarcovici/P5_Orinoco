///////////////////////////////////////////REQUETE GET CAMERAS///////////////////////////////////////
async function getApiCamera(cameras) {
  let resp = await fetch("http://localhost:3000/api/cameras/");
  let response = await resp.json();
  return response
}

//////////////////////////////////////////////SEARCH URL/////////////////////////////////////////////
const id = new URL(document.location).searchParams.get("id");

/////////////////////////////////////////REQUETE GET CAMERA BY ID//////////////////////////////////
async function getApiCameraById() {
  let resp = await fetch(`http://localhost:3000/api/cameras/${id}`);
  let jsonCamera = await resp.json();
  return new Camera(
    jsonCamera._id,
    jsonCamera.name,
    jsonCamera.price,
    jsonCamera.description,
    jsonCamera.imageUrl,
    jsonCamera.lenses
  );
}

/////////////////////////////////////////REQUETE POST//////////////////////////////////
async function postOrder(form, cart) {
  let resp = await fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact: {
        firstName: form.firstName,
        lastName: form.lastName,
        address: form.address,
        city: form.city,
        email: form.email,
      },
      products: idProducts,
    }),
  });

  let response = await resp.json();
  return response;
}
