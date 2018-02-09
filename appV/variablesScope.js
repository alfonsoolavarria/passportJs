'use strict'
/**
 * @type Module
 * @description Module that export general variables used throughout the app,
 *              that are either shared by other modules, or clutter a single
 *              one.
 */

/**
 * @type Object
 * @description Scopes objects used on every social authentication profile. This
 *              objects are consumed by passport.authenticate() method.
 */
exports.socialScopes = {
  'facebook': {
    scope: ['email']
  },
  'google': {
    scope:[
      'openid',
      'email',
      'https://www.googleapis.com/auth/user.birthday.read',
      'profile',
    ]
  },
  'cognito':{}
}
/**
 * @type Array
 * @description List of valid social authentication providers.
 */
exports.validSocialProviders = ['facebook', 'google', 'cognito']

/*Conatel*/
exports.userPoolId = 'xxx'
exports.clientIdC = 'xxx'
exports.region = 'xx'

/*Facebook*/
exports.clientIDF = 'xx'
exports.clientSecretF = 'xx'
exports.callbackURLFacebook = 'xx/xx/xxx'
exports.profileFields = ['xx']

/*Google*/
exports.clientIDG = 'xxxx'
exports.clientSecretG = 'xxxx-xxxx'
exports.callbackURLGoogle = '/xxx/xxx/xxx'
