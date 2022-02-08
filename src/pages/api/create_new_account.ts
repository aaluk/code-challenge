import type { NextApiRequest, NextApiResponse } from 'next';
import validateUsername from '../../utils/usernameValid';
import validatePassword from '../../utils/passwordValid';

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
  let validPassword = newAccount.password.length > 0 ? await validatePassword(newAccount.password, false) : 'Password must be at least 20 characters';

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
