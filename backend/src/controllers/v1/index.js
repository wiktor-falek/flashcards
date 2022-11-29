import { Router } from "express";

import { default as flashcards } from "./flashcards.js";
import { default as user } from "./user.js";

const router = Router();

router.use("/v1", flashcards);

router.use("/v1/user", user);

export default router;
