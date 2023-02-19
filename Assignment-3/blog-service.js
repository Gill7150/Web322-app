var posts = [];
var categories = [];
var fs = require('fs');

exports.initialize = () => {
    return new Promise ((resolve, reject) => {
        fs.readFile('./data/posts.json', (err,data) => {
            if (err) {
                reject ('unable to read file');
            }
            else {
                posts = JSON.parse(data);
            }
        });

        fs.readFile('./data/categories.json', (err,data)=> {
            if (err) {
                reject ('unable to read file');
            }
            else {
                categories = JSON.parse(data);
            }
        })
        resolve();
    })
};


module.exports.getAllPosts = function () {
    return new Promise((resolve, reject) => {
        if (posts.length == 0) {
            reject ('no results returned');
        }
        else {
            resolve (posts);
        }
    });
}

module.exports.getPublishedPosts = function () {
    return new Promise((resolve, reject) => {
        let items = posts.filter(eachObj => eachObj.published == true);
        if (items.length == 0) {
            reject('no results returned');
        }
        else{
            resolve(items)
        }
    });
};

module.exports.getPostsByCategory = function (categoryy) {
    return new Promise((resolve, reject) => {
        let items = posts.filter(eachObj => eachObj.category == categoryy);
        if (items.length == 0) {
            reject('no results returned');
        }
        else{
            resolve(items)
        }
    });
}

module.exports.getPostsByMinDate = function (minDateStr) {
    return new Promise((resolve, reject) => {
        let items = posts.filter(eachObj => eachObj.postDate == new Date(minDateStr));
        if (items.length == 0) {
            reject('no results returned');
        }
        else{
            resolve(items)
        }
    });
}

module.exports.getPostById = function (idd) {
    return new Promise((resolve, reject) => {
        let items = posts.filter(eachObj => eachObj.id == idd);
        if (items.length == 0) {
            reject('no results returned');
        }
        else{
            resolve(items)
        }
    });
}

module.exports.getCategories = function () {
    return new Promise((resolve, reject) => {
        if (categories.length == 0) {
            reject ('no results returned');
        }
        else {
            resolve (categories);
        }
    });
}

module.exports.addPost = (postData) => {
    postData.published==undefined ? postData.published = false : postData.published = true;
    postData.id = posts.length + 1;
    posts.push(postData);

    return new Promise((resolve,reject) => {
        if (posts.length == 0) {
            reject ('no results');
        }
        else {
            resolve(posts);
        }
    })
};
