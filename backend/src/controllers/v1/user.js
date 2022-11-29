import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const { publicUserData } = res.locals;

  const userData = Object.assign({}, publicUserData);
  userData.email = publicUserData.confirmedEmail || publicUserData.email;
  userData.hasConfirmedEmail = publicUserData.confirmedEmail !== null;
  delete userData.confirmedEmail;

  res.json(userData);
});

export default router;
