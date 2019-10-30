const hcm = require("./hcm.js");

let feed = hcm
  .getEmployees({
    loginDetails: {
      instance: "adc4-zhox",
      password: "aPb35488",
      user: "betty.anderson"
    },
    lastName: "Williamson"
  })
  .then(response => response.json())
  .then(data => console.log(data));
