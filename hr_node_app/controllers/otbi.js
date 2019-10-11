const otbi = require("../soap_apis/otbi.js");

async function post(req, res, next) {
  try {
    let loginDetails = req.body.loginDetails;

    otbi.logon(loginDetails).then(data => {
      res.status(200).json({ sessionId: data });
    });
  } catch (err) {
    next(err);
  }
}

async function runReport(req, res, next) {
  try {
    let sessionId = req.body.sessionId;

    otbi.runReport(sessionId).then(data => {
      res.status(200).json(data);
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  post: post,
  runReport: runReport
};
