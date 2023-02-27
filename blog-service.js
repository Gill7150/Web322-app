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

module.exports.getPublishedPostsByCategory = function (categoryy) {
    return new Promise((resolve, reject) => {
        let items = posts.filter(eachObj => eachObj.category == categoryy && eachObj.published == true);
        if (items.length == 0) {
            reject('no record found');
        }
        else{
            resolve(items)
        }
    });
    
}

module.exports.addPost = function (postData) {
    return new Promise((resolve, reject) => {
        postData.published = (postData.published) ? true : false;
        for (let field in postData) {
            if (postData[field] == '') {  
                postData[field] = null;
            }
        }
        postData.postDate = new Date();
        posts.create(postData).then(function (data) {
            resolve(data)
        }).catch(function (error) {
            reject("No record Found");
        })
    });
};
