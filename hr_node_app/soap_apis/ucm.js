function loadFile(request) {
  var soap = require("strong-soap").soap;
  let zip = new require("node-zip")();

  let fs = require("fs");

  const { instance, user, password } = request.body;
  const { filename } = request.file;
  const name = filename.substring(0, 8);
  console.log("request.file", request.file);

  // function to encode file data to base64 encoded string
  function base64_encode(path) {
    // read binary data
    let bitmap = fs.readFileSync(path);
    let zip = new require("node-zip")();
    zip.file("hcmfile.dat", bitmap);
    return zip.generate({ base64: true, compression: "DEFLATE" });
  }

  let apiContent = base64_encode(request.file.path);

  let url =
    "https://" +
    instance +
    "-fa-ext.oracledemos.com/fscmService/ErpIntegrationService?WSDL";

  let args = {
    document: {
      Content: apiContent,
      FileName: `${name}.zip`,
      ContentType: "zip",
      DocumentTitle: name,
      DocumentAuthor: user,
      DocumentSecurityGroup: "FAFusionImportExport",
      DocumentAccount: "hcm/dataloader/import",
      DocumentName: name
    }
  };

  let options = {};
  return new Promise(function(resolve, reject) {
    soap.createClient(url, options, function(err, client) {
      if (err) {
        reject(err);
      } else {
        client.setSecurity(new soap.BasicAuthSecurity(user, password));
        client.uploadFileToUcm(args, function(err, result) {
          if (err) {
            reject(err);
          } else {
            resolve({ ...result, contentId: name.toUpperCase() });
          }
        });
      }
    });
  });
}

function importAndLoad(request) {
  let { instance, password, user, contentId } = request.body;

  //call the SOAP API to return an OTBI logon:
  var soap = require("strong-soap").soap;
  let url =
    "https://" +
    instance +
    "-fa-ext.oracledemos.com/hcmCommonDataLoader/HCMDataLoader?WSDL";
  let args = {
    ContentId: contentId,
    Parameters: null
  };

  return new Promise(function(resolve, reject) {
    soap.createClient(url, function(err, client) {
      if (err) {
        //wsdl couldn't be contacted due to instance unavailable etc.
        reject(err);
      }
      client.setSecurity(new soap.BasicAuthSecurity(user, password));
      client.importAndLoadData(args, function(err, result) {
        if (err) {
          //api call failed due to wrong password etc.
          reject(err);
        }
        //api call was successful and ess job id result is returned
        resolve({ essId: result["result"] });
      });
    });
  });
}

module.exports = {
  loadFile,
  importAndLoad
};
