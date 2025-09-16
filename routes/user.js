const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
  <ul>
  ${allDbUsers
    .map(
      (user) => `<li>${user.firstName} ${user.lastName} = ${user.email} </li>`
    )
    .join("")}
  </ul>
  `;
  res.send(html);
});

router.get("/", async (req, res) => {
  const allDbUsers = await User.find({});

  return res.json(allDbUsers);
});

router
  .route("/:id")

  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
  })
  .patch(async (req, res) => {
    //edit user with id
    await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ status: "Success" });
  })
  .delete(async (req, res) => {
    //delete user with id
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success", message: `user ${id} deleted` });
  });

router.post("/", async (req, res) => {
  //todo: create new user
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required..." });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log("result: ", result);
  return res.status(201).json({ msg: "success" });
});

module.exports = router;
