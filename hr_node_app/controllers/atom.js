const atom = require("../soap_apis/atom.js");

async function feed(req, res, next) {
  const { loginDetails } = req.body;
  console.log(req.body.loginDetails);
  atom
    .getFeed(loginDetails)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => res.status("401").json(err));
}

module.exports = {
  feed
};
