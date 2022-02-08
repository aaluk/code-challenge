export default function validateUsername(username: string) {
  if (username.length < 10) return 'Username must be at least 10 characters'
  else if (username.length > 50) return 'Username must be at most 50 characters'
  else return;
}