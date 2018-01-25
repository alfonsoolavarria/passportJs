'use strict'

const passport = require('passport')
const variablesScope = require('../variablesScope.js')
var AWS = require('aws-sdk');

AWS.config.update({region: 'us-east-1'})

/**
 * Starts a social authentication using passport.
 * @param  {object}   req  Express request object.
 * @param  {object}   res  Express response object.
 * @param  {Function} next Express next middleware function.
 * @return {Void} It calls the correct passport authenticate function
 *                depending on the provider stated on the url or an
 *                error.
 */
const socialLogin = (req, res, next) => {
  ////////////////////////////////////////////////////////////////
  /// solventar una exception de navegacion///
  ///CogintoUser API Intenta obtener UserAgent///
  ///del dispositivo y asume el navegador como el dispositivo.///
  global.navigator = () => null;
  ////////////////////////////////////////////////////////////////
  const provider = req.params.provider
  if (variablesScope.validSocialProviders.indexOf(provider) == -1) {
    res.status(400).json({
      error: 'Invalid Provider '+provider
    })
    return
  }
  if (provider == 'cognito') {
    passport.authenticate(req.params.provider, (err, profile) => {
      if (err) {
        res.json({error: err})
        return
      }

      if (profile) {
        res.user = profile;
        next();
      }else {
        return res.status(409).send({code: 409,success: false,error:'Error authenticating the user, or it is necessary to confirm the code '});
      }
      //res.status(200).redirect('https://www.google.co.ve/') //remover y luego redireccionar a la ruta correcta
    })(req, res, next)

  }else {
    passport.authenticate(
      provider,
      variablesScope.socialScopes[provider]
    )(req, res, next)
  }
}


/**
 * @function socialCallback
 * @description Finishes the social authentication process and returns
 *              a redirect to the index page.
 * @param  {object}   req  Express request object.
 * @param  {object}   res  Express response object.
 * @param  {Function} next Express next middleware function.
 * @return {Void} Returns a redirect HTTP 302 response to redirect the
 *                user to the welcome page.
 */
const socialCallback = (req, res, next) => {
  passport.authenticate(req.params.provider, (err, profile) => {
    if (err) {
      res.json({error: err})
      return
    }
    res.user = profile;
    next();
    //res.status(200).redirect('https://www.google.co.ve/') //remover y luego redireccionar a la ruta correcta
  })(req, res, next)
}


/**
 * method for signing up a user
 * @param {string} username User's username.
 * @param {string} name User's name.
 * @param {string} password Plain-text initial password entered by user.
 * @param {string} email User's email.
 * @param {nodeCallback<SignUpResult>} callback Called on error or with the new user.
 * @returns {void}
 */
const signUp = (req, res, next) => {

  const username = req.body.username
  const password = req.body.password
  const email = req.body.email
  const name = req.body.name

  if (username.length<=0 || password.length<=0 || email.length<=0 || name.length<=0) {
    res.status(400).json({
      error: 'username/password/email Incorrect '
    })
    return
  }

  const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  if (validateEmail(email)) {
    const userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool({UserPoolId:USERPOLLID,ClientId:CLIENTID});
    userPool.signUp(username, password, [{Name:'email',Value:email},{Name:'name',Value:name}], null, (err, result) => {
      if (err) {
        return res.status(505).send({code: 505,success: false, error:err});
      }
      const cognitoUser = result.user;
      res.user = result.user;
      //console.log('user name is ' + cognitoUser.getUsername());
      next();
    })
  }else {
    console.log('Error creating user Email');
    return res.status(505).send({code: 505,success: false,error:'Invalid email'});
  }

}



/**
 * method to verify an authenticated user
 * @param {string} code User's code.
 * @param {string} email User's email.
 * @param {nodeCallback<SignUpResult>} callback Called on error or with the authenticated user.
 * @returns {void}
 */
const verificationCode = (req, res, next) => {
  const code = req.body.code
  const username = req.body.username

  const userPool = new AWS.CognitoIdentityServiceProvider();

  var params = {
    ClientId: CLIENTID, /* required */
    ConfirmationCode: code, /* required */
    Username: username, /* required */
    //ForceAliasCreation: true || false,
  };
  userPool.confirmSignUp(params,(err, data)=> {
    if (err) {
      return res.status(505).send({code: 505,success: false,error:err});
    }
    res.status(200).send({code: 200,success: false, data:"Successfully confirmed user"});
    next();
  });


}

/////////////
// Exports //
/////////////
exports = module.exports = {
  socialLogin,
  socialCallback,
  signUp,
  verificationCode
}
