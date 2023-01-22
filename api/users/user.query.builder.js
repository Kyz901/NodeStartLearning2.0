const { ASC,DESC } = require("../../configs/constats");

function buildFilterQuery(queryParams) {
    const filterQuery = {};
    const ageFilter = {};
    const createdDateFilter = {};
    const updatedDateFilter = {};

    if(queryParams.age_gte) {
        ageFilter.$gte = +queryParams.age_gte;
    }
    if(queryParams.age_lte) {
        ageFilter.$lte = +queryParams.age_lte;
    }
    if(queryParams.createdDate_gte) {
        createdDateFilter.$gte = +queryParams.createdDate_gte;
    }
    if(queryParams.createdDate_lte) {
        createdDateFilter.$lte = +queryParams.createdDate_lte;
    }
    if(queryParams.updatedDate_gte) {
        updatedDateFilter.$gte = +queryParams.updatedDate_gte;
    }
    if(queryParams.updatedDate_lte) {
        updatedDateFilter.$lte = +queryParams.updatedDate_lte;
    }
    if(queryParams.nameSearch) {
        filterQuery.$or = [
            { firstName: { $regex: queryParams.nameSearch, $options: 'i' } },
            { lastName: { $regex: queryParams.nameSearch, $options: 'i' } },
            { email: { $regex: queryParams.nameSearch, $options: 'i' } }
        ]


    }

    if(Object.keys(ageFilter).length) {
        filterQuery.age = ageFilter;
    }
    if(Object.keys(createdDateFilter).length) {
        filterQuery.createdAt = createdDateFilter;
    }
    if(Object.keys(updatedDateFilter).length) {
        filterQuery.updatedAt = updatedDateFilter;
    }

    return filterQuery;
}

function buildSortQuery(sortBy, order) {
    const technicalOrder = order === 'ASC' ? ASC : DESC;

    if(sortBy === 'createdDate') {
        return { '_id': technicalOrder };
    }

    return {[sortBy]: technicalOrder}
}

module.exports = {
    buildFilterQuery,
    buildSortQuery,
}
