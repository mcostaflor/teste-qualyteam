import api from '../index';

const getAll = async function () {
    return api.get(`/departments`).then(res => res.data);
}

const getAllFromId = async function (idArray) {

    const promises = idArray.map(async item => {
        return await getOne(item);
    });

    return await Promise.all(promises);
}

const getOne = async function (id) {
    return api.get(`/departments/${id}`).then(res => res.data);
}

// const createOne = async function (data) {
//     return api.post(`/departments`, data).then(res => res.data)
// }

// const editOne = async function (id, data) {
//     return api.put(`/departments/${id}`, data).then(res => res.data)
// }

// const deleteOne = async function (id) {
//     return api.delete(`/departments/${id}`).then(res => res.data)
// }

export {
    getAll,
    getAllFromId,
    getOne,
    // createOne,
    // editOne,
    // deleteOne
}