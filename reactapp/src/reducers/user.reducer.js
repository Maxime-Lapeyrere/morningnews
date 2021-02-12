export default function (token = "", action) {
    if (action.type == "addToken") {
        var tokenCopy = action.token
console.log('test reducer ---->',action.token)
      return tokenCopy;
    } else {
      return token;
    }
  }


