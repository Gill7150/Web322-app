var posts = [];
var categories = [];
var fs = require('fs');

var readPosts = function () {
  return new Promise(function (resolve, reject) {
      fs.readFile('./data/posts.json', function (err, data) {
          if (!err) {                
              posts = JSON.parse(data);
              resolve(posts); 
          } else {          
              reject("can not read posts");
          }
      })
  })
}


var readCategories = function () {
  return new Promise(function (resolve, reject) {
      fs.readFile('./data/categories.json', function (err, data) {
          if (!err) {
              categories = JSON.parse(data);
              resolve(categories);
          } else {                
              reject("can not read categories");
          }
      })
  })
}

module.exports.initialize = function () {
  return new Promise(function (resolve, reject) {
      readPosts().then(function (data) {
          resolve(data);
      })
      .catch(function (errmsg) {
          console.log(errmsg);
          reject(errmsg);
      });
      readCategories().then(function (data1) {
        resolve(data1);
    })
    .catch(function (errmsg) {
        console.log(errmsg);
        reject(errmsg);
    });
  })
}


module.exports.getAllPosts = function () {
    return new Promise((resolve, reject) => {     
        readPosts().then(function (data) {
            resolve(data);

        }).catch(function () {
            console.log("No record Found")
            reject("No record Found");
        })
    });
}

module.exports.getPublishedPosts = function () {
    return new Promise((resolve, reject) => {
        let itemNames = posts.filter(eachObj => eachObj.published === true);
        resolve(itemNames)
    });
};

module.exports.getCategories = function () {
    return new Promise((resolve, reject) => {
        readCategories().then(function (data) {
            resolve(data)
        }).catch(function (error) {
            reject("No record Found");
        });
    });
}
