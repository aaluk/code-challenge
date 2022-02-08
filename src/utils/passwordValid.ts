export default function validatePassword(password: string) {
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