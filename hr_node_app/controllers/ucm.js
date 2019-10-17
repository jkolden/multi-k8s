const ucm = require("../soap_apis/ucm.js");

async function loadFile(req, res, next) {
  try {
    ucm.loadFile(req);
    res.status(201).json("loaded");
  } catch {
    res.status("401").json("error");
  }
}

module.exports = {
  loadFile: loadFile
};
