var express = require('express');
var router = express.Router();

  //Setup NODEMAILER
  var nodemailer = require('nodemailer');
const { message } = require('prompt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

router.get('/portfolio', function(req, res, next) {
  res.render('portfolio', { title: 'Portfolio' });
});

router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/email', (req, res) => {

  //grabbing the fields passed from the form
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  

  // SETUP TRANSPORT

  let transport = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        type: 'OAuth2',
        user: 'bibekpoudel894@gmail.com',
        pass: 'mckg5lmE!',
        clientId: '816607253318-6cs2m5ekea5v7el4cn7bv6suho9jhauu.apps.googleusercontent.com',
        clientSecret: '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',
        refreshToken: '1//04rgRzNyRqG6YCgYIARAAGAQSNwF-L9Ir4QvzCZ6656ENq8gSIhaBKG7vHHZxCFbLvpblCVaKZsG2pQY-uUdCvsU-HLQtVJTMiM0'
      }
  });

  //GRAB THE CONTENTS

  let mailOption = {
    from: 'sth@gmail.com',
    to: 'bibek.ca@outlook.com',
    subject:  `${name} is trying to connect you through your website `,
    text: `Senders email: ${email}. Message: ${message}`
  };
  // SEND TO THE USER

  transport.sendMail(mailOption, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.render('message', { message: 'Message Sent to Bibek.' });

})

module.exports = router;
