const express = require("express");
const router = new express.Router();
const multer = require("multer");
let upload = multer({ dest: "uploads/" });

const employees = require("../controllers/employees.js");
const otbi = require("../controllers/otbi.js");
const ucm = require("../controllers/ucm.js");
const atom = require("../controllers/atom.js");
const hcm = require("../controllers/hcm.js");

router
  .route("/employees/:id?")
  .get(employees.get)
  .post(employees.post)
  .put(employees.put)
  .delete(employees.delete);

router.route("/otbi").post(otbi.post);
router.route("/otbi-logoff").post(otbi.logoff);
router.route("/otbi-report").post(otbi.runReport);
router.route("/file-upload").post(upload.single("datfile"), ucm.loadFile);
router.route("/importAndLoad").post(ucm.importAndLoad);
router.route("/atom").post(atom.feed);
router.route("/hcm").post(hcm.getEmployees);
router.route("/hcm-update").post(hcm.updateEmployee);
router.route("/hcm-image-upload").post(upload.single("image"), hcm.loadImage);

module.exports = router;
