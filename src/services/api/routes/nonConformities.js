import api from '../index';
import { departmentsApi } from './index';

const getAll = async function () {
    return api.get(`/non-conformities`)
        .then(async (res) => {

            const promises = res.data.map(async item => {
                item._departments = await departmentsApi.getAllFromId(item.departments);
                return item;
            });

            return Promise.all(promises);

        });
}

const getOne = async function (id) {
    return api.get(`/non-conformities/${id}`).then(async res => {
        res.data._departments = await departmentsApi.getAllFromId(res.data.departments);
        return res.data;
    });
}

const createOne = async function (data) {
    return api.post(`/non-conformities`, data).then(res => res.data);
}

const editOne = async function (id, data) {
    return api.put(`/non-conformities/${id}`, data).then(res => res.data);
}

// const deleteOne = async function (id) {
//     return api.delete(`/non-conformities/${id}`).then(res => res.data);
// }

export {
    getAll,
    getOne,
    createOne,
    editOne,
    // deleteOne
}