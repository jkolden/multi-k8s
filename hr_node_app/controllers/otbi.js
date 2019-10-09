const otbi = require("../soap_apis/otbi.js");

async function post(req, res, next) {
  try {
    let sessionId;

    otbi.logon().then(data => {
      sessionId = data;
    });

    res.status(200).json({ sessionId: sessionId });
  } catch (err) {
    next(err);
  }
}

module.exports.post = post;
