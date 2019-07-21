var Datastore = require('nedb');
module.exports = new Datastore({filename: '../globalData.db', autoload: true});
