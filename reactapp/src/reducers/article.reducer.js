var mongoose = require('mongoose')

export default function (wishList = [], action) {
  if (action.type == "addArticle") {
    var wishListCopy = [...wishList];

    var findArticle = false;

    for (let i = 0; i < wishListCopy.length; i++) {
      if (wishListCopy[i].title == action.articleLiked.title) {
        findArticle = true;
      }
    }

    if (!findArticle) {
      wishListCopy.push(action.articleLiked);
    }

    console.log("nvlWishlist", wishListCopy);
    return wishListCopy;
  } else if (action.type == "deleteArticle") {
    var wishListCopy = [...wishList];

    var position = null;
    for (let i = 0; i < wishListCopy.length; i++) {
      if (wishListCopy[i].title == action.title) {
        position = i;
      }
    }
    wishListCopy.splice(position, 1);

    console.log("nvlWishlist", wishListCopy);
    return wishListCopy;
  } else {
    return wishList;
  }
}
