---
title: A Beginning to User Credential Storage
parentDir: backend/auth
slug: backend/auth/init-sign-in
author: Jake Laursen
excerpt: Allowing users to Sign-Up and Sign In, Including One-Way Password Hashing
tags: Authentication, Login, Sign In, Password Hashing, hashing
order: 1
---

# A User Sign-Up Story
_As A User I can quickly sign-up for an account to a website so that I can use the website using a username and password._  
I can
- enter an email and password into a form and click "Sign up"
- see a "confirm your email" ui placeholder
- receive an email requesting I confirm my email address
- handle the email
  - navigate to my email, & see an email from the site
  - open the email and find a button to click to confirm my new account
  - click the button & get redirected to my browser
- enter pw in the app page (_confirm your account, enter your password_)
- success!


# A Technical Approach to Storing and Securing User Credentials
When a user enters their email & password, an api can...
- accept the email && password
- build a ["salt"](https://www.okta.com/blog/2019/03/what-are-salted-passwords-and-password-hashing/) value
- hash the password with the salt

## Hasing And Salting In Node
```js
/*
  dependencies
*/ 
const { createHmac } = require('crypto');

/*
  functions
*/ 

function createRandomString(strLength) {
    let result           = '';
    const allowedChars       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const numOfAllowedChars = allowedChars.length;
    for ( let i = 0; i < strLength; i++ ) {
      result += allowedChars.charAt(Math.floor(Math.random() * 
 numOfAllowedChars));
   }
   return result;
}

function saltVal({val, salt}){
  return createHmac('sha256',salt).update(val).digest('hex');
}

// use the above two functions here!
function hashString({str}){
  const BAD_TYPE = 'Cannot hash a value that is not a string'

  if(typeof str !== 'string'){
    throw new Error(BAD_TYPE)
  }
  const salt = createRandomString(5)
  return saltVal({str, salt})
}
```
