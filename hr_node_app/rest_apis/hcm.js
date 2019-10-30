function getEmployees(loginDetails, lastName) {
  const { instance, password } = loginDetails;
  let user = "betty.anderson";

  const fetch = require("node-fetch");

  console.log(lastName);

  let url =
    "https://" +
    instance +
    `-fa-ext.oracledemos.com/hcmCoreApi/resources/latest/emps/?q=LastName=${lastName}&expand=photo,assignments`;

  return fetch(url, {
    headers: {
      Authorization:
        "Basic " + new Buffer(user + ":" + password).toString("base64")
    }
  })
    .then(response => response.json())
    .catch(err => console.error(err));
}

function updateEmployee(loginDetails, url, payload) {
  let { password } = loginDetails;
  let user = "betty.anderson";

  const fetch = require("node-fetch");

  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + new Buffer(user + ":" + password).toString("base64")
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .catch(err => console.error(err));
}

function loadImage(request) {
  let fs = require("fs");
  let { password, url, method } = request.body;
  let user = "betty.anderson";
  console.log(request.file);

  function base64_encode(path) {
    // read binary data
    var bitmap = fs.readFileSync(path);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString("base64");
  }

  const encoded = base64_encode(request.file.path);

  const fetch = require("node-fetch");

  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Basic " + new Buffer(user + ":" + password).toString("base64")
    },
    body: JSON.stringify({
      ImageName: "Imageprofile",
      PrimaryFlag: "Y",
      Image: encoded
    })
  })
    .then(response => response.json())
    .catch(err => console.error(err));
}

module.exports = {
  getEmployees,
  updateEmployee,
  loadImage
};
