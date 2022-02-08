export default async function validatePassword(password: string, check: boolean = true) {
  if (check) {
    let isBreached = await breachedPassword(password);
    if (isBreached.result === true) {
      return 'This password has been hacked elsewhere, choose a different one.'
    }
  }
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

async function breachedPassword(password: string) {
  const response = await fetch('/api/password_exposed', {
    method: 'POST',
    body: JSON.stringify({password})
  })
  let data = await response.json();
  return data;
}