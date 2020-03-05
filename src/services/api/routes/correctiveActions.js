import api from '../index';

const getAll = async function () {
    return api.get(`/corrective-actions`).then(res => res.data);
}

const getAllFromId = async function (idArray) {

    const promises = idArray.map(async item => {
        return await getOne(item);
    });

    return await Promise.all(promises);
}

const getOne = async function (id) {
    return api.get(`/corrective-actions/${id}`).then(res => res.data);
}

const createOne = async function (data) {
    return api.post(`/corrective-actions`, data).then(res => res.data);
}

// const editOne = async function (id, data) {
//     return api.put(`/corrective-actions/${id}`, data).then(res => res.data);
// }

// const deleteOne = async function (id) {
//     return api.delete(`/corrective-actions/${id}`).then(res => res.data);
// }

export {
    getAll,
    getOne,
    getAllFromId,
    createOne,
    // editOne,
    // deleteOne
}