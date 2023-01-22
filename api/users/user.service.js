const User = require('../../db/User');
const { buildFilterQuery, buildSortQuery } = require("./user.query.builder");

const getAllUsers = async (query) => {
    const {
        page,
        limit,
        sortBy,
        order,
        ...filterParams
        } = query;
    const offset = (page - 1) * limit;

    const filterQuery = buildFilterQuery(filterParams);
    const sortQuery = buildSortQuery(sortBy, order);

    const users = await User.find(filterQuery)
        .limit(limit)
        .skip(offset)
        .sort(sortQuery);

    const totalUser = await User.count();
    const totalFilteredUsers = await User.count(filterQuery);

    return {
        data: users,
        total: +totalUser,
        totalFiltered: +totalFilteredUsers,
        limit: +limit,
        page: +page
    }
};

const findUserById = async (userId) => {
    return User.findById(userId);
};

const findUserByEmail = async (userEmail) => {
    return User.find({email: userEmail});
}

const findUserByParams = async (search) => {
    return User.findOne(search).select('+password');
}

const createUser = async (userData) => {
    // todo: fix bcrypt
    // const hashedPassword = await hashPassword(userData.password);
    const hashedPassword = userData.password;

    return User.create({...userData, password: hashedPassword});
};

const deleteUserById = async (userId) => {
    return User.deleteOne(userId);
};

const updateUser = async (user, fieldsToChange) => {
    user.firstName = fieldsToChange.firstName?.length ? fieldsToChange.firstName : user.firstName;
    user.lastName = fieldsToChange.lastName?.length ? fieldsToChange.lastName : user.lastName;
    user.age = fieldsToChange.age ? fieldsToChange.age : user.age;
    user.phoneNumber = fieldsToChange.phoneNumber ? fieldsToChange.phoneNumber : user.phoneNumber;

    await User.findByIdAndUpdate(user._id, user);

    return findUserById(user._id);
};

module.exports = {
    getAllUsers,
    createUser,
    deleteUserById,
    updateUser,
    findUserByEmail,
    findUserByParams
};
