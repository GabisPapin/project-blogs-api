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

  const tokenAuth = await loginService.tokenAuth(findLogin);

  if (tokenAuth.code) {
    return res.status(tokenAuth.code).json(tokenAuth.message);
  }

  return res.status(200).json(tokenAuth);
};

module.exports = {
  loginToken,
};