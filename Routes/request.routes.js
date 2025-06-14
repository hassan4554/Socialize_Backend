const router = require("express").Router();
const passportAuth = require("@Utils/passport.utils");
const { processRequest, deleteRequest } = require("../Controllers/Request");
const { processReqValidationSchema, idValidationSchema } = require("@Schema");
const { validateData } = require("@Middleware");

router.post(
  "/process",
  validateData(processReqValidationSchema),
  passportAuth("jwt-access", { session: false }),
  processRequest
);

router.delete(
  "/delete",
  validateData(idValidationSchema),
  passportAuth("jwt-access", { session: false }),
  deleteRequest
);

module.exports = router;
