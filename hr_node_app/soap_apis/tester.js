const otbi = require("./otbi.js");

let session = otbi.logon().then(data => console.log(data));
