const ucm = require("./ucm.js");

ucm
  .loadFile()
  .then(result => console.log(result))
  .catch(err => console.log(err));
