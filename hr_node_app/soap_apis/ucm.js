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
    zip.file("testfile", bitmap);
    return zip.generate({ base64: true, compression: "DEFLATE" });
    console.log(data);
    //return new Buffer(data).toString("base64");
  }

  let mydata = base64_encode(request.file.path);

  let url =
    "https://" +
    instance +
    "-fa-ext.oracledemos.com/fscmService/ErpIntegrationService?WSDL";

  let args = {
    document: {
      Content: mydata,
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
            resolve(result);
          }
        });
      }
    });
  });
}

module.exports = {
  loadFile: loadFile
};
