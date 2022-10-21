import { Router } from "express";

import { default as characters } from "./flashcards.js";

const router = Router();

router.use("/v1", characters);

export default router;
