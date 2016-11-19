let storage;

if (process.env.web) {
	storage = require('./storage/web')
} else {
	storage = require('./storage/native')
}

module.exports = storage;