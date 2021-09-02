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

//////////////////////////////////////////REQUETE POST//////////////////////////////////////
/*
async function sendForm() {
  let resp = await fetch(`http://localhost:3000/api/cameras/order`, {
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
      products: cart,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
        console.log(response);
      }
    })
    .then((data) => {
      let orderInfo = localStorage.setItem("orderId", JSON.stringify(data));
    })
    .catch(error);
}
*/