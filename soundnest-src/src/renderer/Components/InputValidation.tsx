export function validateData(input, type) {
  switch(type) {
    case "username":
      return /^[a-zA-Z0-9_]{3,20}$/.test(input)
    case "password":
      return /^.{3,40}$/.test(input)
    case "name":
      return /^[a-zA-Z\s\-]{2,50}$/.test(input)
    case "username":
      return /^[a-zA-Z0-9_]{3,20}$/.test(input)
    case "email":
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)
    case "passwordCreation":
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(input)
  }
}
