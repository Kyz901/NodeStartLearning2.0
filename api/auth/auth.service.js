const OAuth = require('../../db/OAuth');

const storeTokens = async (dataToGenerateToken) => {
    return OAuth.create(dataToGenerateToken);
};

const getUserByParams = async (search = {}) => {
    return OAuth.findOne(search).populate('user');
};

const deleteAuthSessionByParams = async (sessionParam = {}) => {
    return OAuth.deleteOne(sessionParam);
};

const deleteAllAuthSessionsByParams = async (sessionParam = {}) => {
    return OAuth.deleteMany(sessionParam);
};

module.exports = {
    storeTokens,
    getUserByParams,
    deleteAuthSessionByParams,
    deleteAllAuthSessionsByParams,
};
