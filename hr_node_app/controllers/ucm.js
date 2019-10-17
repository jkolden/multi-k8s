const ucm = require("../soap_apis/ucm.js");

async function loadFile(req, res, next) {
  ucm
    .loadFile(req)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => res.status("401").json(err));
}

async function importAndLoad(req, res, next) {
  ucm
    .importAndLoad(req)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => res.status("401").json(err));
}
module.exports = {
  loadFile: loadFile,
  importAndLoad: importAndLoad
};
