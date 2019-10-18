function getFeed(loginDetails) {
  const rssParser = require("react-native-rss-parser");
  const fetch = require("node-fetch");
  const { instance, user, password } = loginDetails;

  let url =
    "https://" +
    instance +
    "-fa-ext.oracledemos.com/hcmCoreApi/atomservlet/employee/empupdate";

  return fetch(url, {
    headers: {
      Authorization:
        "Basic " + new Buffer(user + ":" + password).toString("base64")
    }
  })
    .then(response => response.text())
    .then(responseData => rssParser.parse(responseData));
}

module.exports = {
  getFeed
};
