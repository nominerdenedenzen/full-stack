export const loginController = (req, res) => {
  const {} = console.log("hello from login controller");
  res.status(200).send("login controller");
};

export const signUpController = (req, res) => {
  console.log(req);
  const { email, password, phoneNumber, role } = req.body;

  await UserActivation.create

  console.log("hello from sign-up controller");
  res.status(200).send("sign-up controller");
};
