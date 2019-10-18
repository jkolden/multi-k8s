const atom = require("./atom.js");

let feed = atom
  .getFeed({
    instance: "adc4-zhox",
    password: "NYY47963",
    user: "betty.anderson"
  })
  .then(feed => console.log(feed));
