const router = require("express").Router();
const passportAuth = require("@Utils/passport.utils");
const { processRequest } = require("@Controllers/Request");
const { processReqValidationSchema } = require("@Schema");
const { validateData } = require("@Middleware");


router.post(
  "/process",
  validateData(processReqValidationSchema),
  passportAuth("jwt-access", { session: false }),
  processRequest
);

module.exports = router;
