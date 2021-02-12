export default function (lang = "", action) {
    if (action.type == "addLang") {
        var langCopy = action.lang
console.log('test reducer ---->',action.lang)
      return langCopy;
    } else {
      return lang;
    }
  }

