function logon() {
  let instance = "adc4-zhox";
  let password = "pfU88649";
  let session;
  //call the SOAP API to return an OTBI logon:
  let soap = require("soap");
  let url =
    "https://" +
    instance +
    "-fa-ext.oracledemos.com/analytics-ws/saw.dll/wsdl/v6";
  let args = {
    name: "thomas.kendall",
    password: password
  };

  return new Promise(function(resolve, reject) {
    soap.createClient(url, function(err, client) {
      if (err) {
        //wsdl couldn't be contacted due to instance unavailable etc.
        console.log(err);
        return;
      }
      client.logon(args, function(err, result) {
        if (err) {
          //api call failed due to wrong password etc.
          console.log(err);
          return;
        }
        //api call was successful and sessionId is returned
        resolve(result["sessionID"]["$value"]);
      });
    });
  });
}

module.exports = {
  logon: logon
};
