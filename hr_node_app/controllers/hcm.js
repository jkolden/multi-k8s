const hcm = require("../rest_apis/hcm.js");

async function getEmployees(req, res, next) {
  const { loginDetails, lastName } = req.body;
  console.log(req.body);
  hcm
    .getEmployees(loginDetails, lastName)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => res.status("401").json(err));
}

async function updateEmployee(req, res, next) {
  const { loginDetails, url, payload } = req.body;
  hcm
    .updateEmployee(loginDetails, url, payload)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => res.status("401").json(err));
}

async function loadImage(req, res, next) {
  hcm
    .loadImage(req)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => res.status("401").json(err));
}

module.exports = {
  getEmployees,
  updateEmployee,
  loadImage
};
