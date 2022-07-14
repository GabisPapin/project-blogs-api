const loginService = require('../services/loginService');

const loginToken = async (req, res) => {
  const loginAuth = await loginService.loginAuth(req.body);

  if (loginAuth.code) {
    return res.status(loginAuth.code).json(loginAuth.message);
  }

  const findLogin = await loginService.findLogin(loginAuth);
  
  if (findLogin.code) {
    return res.status(findLogin.code).json(findLogin.message);
  }

  const token = loginService.tokenAuth(findLogin);

  if (token.code) {
    return res.status(token.code).json(token.message);
  }
  // console.log(tokenAuth);
  return res.status(200).json({ token });
};

module.exports = {
  loginToken,
};