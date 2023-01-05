const User = require('../../db/User');
const { buildFilterQuery, buildSortQuery} = require("./user.query.builder");

const getAllUsers = async (query = {}) => {
    const {
        page = 1,
        limit = 5,
        sortBy = '_id',
        order = 'ASC',
        ...filterParams
        } = query;
    const offset = (page - 1) * limit;

    const builtFilterQuery = buildFilterQuery(filterParams);
    const builtSortQuery = buildSortQuery(sortBy, order);

    const users = await User.find(builtFilterQuery)
        .limit(limit)
        .skip(offset)
        .sort(builtSortQuery);
    const totalUser = await User.count();
    const totalFilteredUsers = await User.count(builtFilterQuery);

    return {
        data: users,
        total: +totalUser,
        totalFiltered: +totalFilteredUsers,
        limit: +limit,
        page: +page
    }
};

const findUserById = (userId) => {
    return User.findById(userId);
};

const findUserByEmail = (userEmail) => {
    return User.find({email: userEmail});
}

const createUser = (userData) => {
    return User.create(userData);
};

const deleteUserById = (userId) => {
    return User.deleteOne(userId);
};

const updateUser = async (user, fieldsToChange) => {
    user.firstName = fieldsToChange.firstName?.length ? fieldsToChange.firstName : user.firstName;
    user.lastName = fieldsToChange.lastName?.length ? fieldsToChange.lastName : user.lastName;
    user.age = fieldsToChange.age ? fieldsToChange.age : user.age;
    user.password = fieldsToChange.password ? fieldsToChange.password : user.password;

    await User.findByIdAndUpdate(user._id, user);

    return findUserById(user._id);
};

module.exports = {
    getAllUsers,
    createUser,
    deleteUserById,
    updateUser,
    findUserByEmail
};
