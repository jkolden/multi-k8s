function logon(loginDetails) {
  let { instance, password, user } = loginDetails;

  //call the SOAP API to return an OTBI logon:
  let soap = require("soap");
  let url =
    "https://" +
    instance +
    "-fa-ext.oracledemos.com/analytics-ws/saw.dll/wsdl/v6";
  let args = {
    name: user,
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

function runReport(sessionId) {
  let instance = "adc4-zhox";
  //call the SOAP API to return an OTBI logon:
  let soap = require("soap");
  //required to strip the namespaces from the returned XML so that it can be parsed like JSON:
  let parseString = require("xml2js/lib/xml2js").parseString;
  let stripPrefix = require("xml2js/lib/processors").stripPrefix;
  let url =
    "https://" +
    instance +
    "-fa-ext.oracledemos.com/analytics-ws/saw.dll/wsdl/v6";
  var args = {
    sql:
      'SELECT\n   0 s_0,\n   "Workforce Management - Person Real Time"."Worker"."Employee Date Of Birth" s_1,\n   "Workforce Management - Person Real Time"."Person Email Addresses"."Email Address" s_2,\n   "Workforce Management - Person Real Time"."Worker"."Employee First Name" s_3,\n   "Workforce Management - Person Real Time"."Worker"."Employee Last Name" s_4,\n   "Workforce Management - Person Real Time"."Worker"."Employee Mailing County Code" s_5,\n   "Workforce Management - Person Real Time"."Worker"."Person Number" s_6,\n   "Workforce Management - Person Real Time"."Worker"."Primary Search Phone Number" s_7\nFROM "Workforce Management - Person Real Time"\nORDER BY 1, 4 ASC NULLS LAST, 5 ASC NULLS LAST, 2 ASC NULLS LAST, 7 ASC NULLS LAST, 8 ASC NULLS LAST, 3 ASC NULLS LAST, 6 ASC NULLS LAST\nFETCH FIRST 75001 ROWS ONLY',
    outputFormat: "json",
    executionOptions: {
      refresh: "TRUE",
      async: "?",
      maxRowsPerPage: "?",
      presentationInfo: "?"
    },
    sessionID: sessionId
  };

  return new Promise(function(resolve, reject) {
    soap.createClient(url, function(err, client) {
      if (err) {
        //wsdl couldn't be contacted due to instance unavailable etc.
        console.log(err);
        return;
      }
      client.executeSQLQuery(args, function(err, result) {
        //isolate the part of the response that we want:
        var resp = result["return"]["rowset"];
        //strip the namespaces so we can treat the resulting object like JSON:
        parseString(
          resp,
          {
            explicitArray: false,
            ignoreAttrs: true,
            tagNameProcessors: [stripPrefix]
          },
          function(err, output) {
            resolve(output["rowset"]["Row"]);
          }
        );
      });
    });
  });
}

module.exports = {
  logon: logon,
  runReport: runReport
};
