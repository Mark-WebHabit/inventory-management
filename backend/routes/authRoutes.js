import express from "express";
import {
  register,
  login,
  checkSession,
  checkValidSession,
} from "../controller/authController.js";

// custom middleware
import { checkForInvalidSession } from "../middleware/checkSession.js";

const router = express.Router();

router
  .post("/register", checkForInvalidSession, register)
  .post("/login", checkForInvalidSession, login)
  .get("/", checkSession)
  .get("/isvalidsession", checkValidSession);

export default router;
