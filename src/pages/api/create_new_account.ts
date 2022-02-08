import type { NextApiRequest, NextApiResponse } from 'next';

interface CreateNewAccountParameters {
  username: string;
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

export default async function createNewAccount(req: NextApiRequest, res: NextApiResponse<BooleanResult>) {
  req.body = JSON.parse(req.body);
  const newAccount : CreateNewAccountParameters = {
    username: req.body.username,
    password: req.body.password,
  }
  let validUsername = newAccount.username.length > 0 ? validateUsername(newAccount.username) : 'Username must be at least 10 characters';
  let validPassword = newAccount.password.length > 0 ? validatePassword(newAccount.password) : 'Password must be at least 20 characters';

  if (!validUsername && !validPassword) {
    let response : BooleanResult = {
      result: true
    }
    res.status(200).json(response);
  } else {
    let response : BooleanResult = {
      result: false,
      errors: {
        username: validUsername,
        password: validPassword
      }
    }
    res.status(200).json(response);
  }
}

function validateUsername(username: string) {
  if (username.length < 10) return 'Username must be at least 10 characters'
  else if (username.length > 50) return 'Username must be at most 50 characters'
  else return;
}

function validatePassword(password: string) {
  // let isBreached = await breachedPassword(password);
  // if (isBreached.result === true) {
  //   return 'This password has been hacked elsewhere, choose a different one.'
  // }
  var symbol = new RegExp("^(?=.*[!@#$%^&*])")
  var number = new RegExp("^(?=.*[0-9])");
  var letter = new RegExp("^(?=.*[a-z])|(?=.*[A-Z])");
  if (password.length < 20) return 'Password must be at least 20 characters'
  else if (password.length > 50) return 'Password must be at most 50 characters'
  else if (!letter.test(password)) return 'Password must contain at least 1 letter'
  else if (!number.test(password)) return 'Password must contain at least 1 number'
  else if (!symbol.test(password)) return 'Password must contain at least 1 symbol'
  else return;
}

// async function breachedPassword(password: string) {
//   const response = await fetch('http:localhost:3000/api/password_exposed', {
//     method: 'POST',
//     body: JSON.stringify({password})
//   })
//   let data = await response.json();
//   return data;
// }
