const router = require('express').Router();
/**
 * @api {post} /auth/login/ Login User
 * @apiName LoginUser
 * @apiGroup Auth
 *
 * @apiParam {String} username username
 * @apiParam {String} password password
 * 
 * @apiSuccess {String} token JWT
 * 
 * @apiSuccessExample Successful Reponse:
 * HTTP/1.1 200 OK
 * {
 *   "token": "18927398172c hsdkucbfy voq2 3rj23.41.2,3k4hjd`x8o237c49p8123759[48c17]`"
 * }
 */

server.post('/login', (req, res) => {
  res.status(200).json({ token: "asuid;cjsdhlfjkhailudfhkljahsdfjkh" });
});

/**
 * @api {post} /auth/signup/ Signup User
 * @apiName SignupUser
 * @apiGroup Auth
 *
 * @apiParam {String} username username
 * @apiParam {String} password password
 * 
 * @apiSuccess {String} message 
 * 
 * @apiSuccessExample Successful Reponse:
 * HTTP/1.1 201 OK
 * {
 *   "message": "success"
 * }
 */

server.post('/signup', (req, res) => {
  if (req.body && req.body.username && req.body.password) {
    res.status(201).json({ message: "Sucess!" });
  } else {
    res.status(400).json({ message: "bad request" });
  }
});

module.exports = router;
