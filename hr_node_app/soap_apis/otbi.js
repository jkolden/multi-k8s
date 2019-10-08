async function logon() {
  let instance = "adc4-zhox";
  let password = "pfU88649";
  //call the SOAP API to return an OTBI logon:
  var soap = require("soap");
  var url =
    "https://" +
    instance +
    "-fa-ext.oracledemos.com/analytics-ws/saw.dll/wsdl/v6";
  var args = {
    name: "casey.brown",
    password: password
  };

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
      let sessionId = result["sessionID"]["$value"];
      return sessionId;
    });
  });
}

module.exports.logon = logon;
