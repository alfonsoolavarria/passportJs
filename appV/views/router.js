'use strict'
const express = require('express')
const router = express.Router()
const socialController = require('../controllers/socialControllers')


/**
 * Testing index.
 */
 router.get('/', function(req, res) {
   console.log('Index Social');
   res.render('index.ejs',{});
 });

 /*
 * Registering a user with the application cognito
 */
 router.post('/signup', socialController.signUp, function (req,res) {
   res.render('index.ejs',{});
 });


 /**
 * Initiates authentication with Cognito
 */

 router.post('/:provider', socialController.socialLogin,function (req,res) {
   res.render('welcome.ejs',{user:res.user, portal:req.params.provider});
 })

 /**
  * Provider authentication callback.
  */
 router.get('/:provider/callback', socialController.socialCallback,function (req,res) {
   res.render('welcome.ejs',{user:res.user, portal:req.params.provider});
 })


 /**
  * Initiates authentication with social providers using passport.
  */
 router.get('/:provider', socialController.socialLogin)


exports = module.exports = router
