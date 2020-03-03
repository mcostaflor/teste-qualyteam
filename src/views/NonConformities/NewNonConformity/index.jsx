import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function NewNonConformity({ history }) {

    const [departments, setDepartments] = useState([]);

    const [description, setDescription] = useState('');
    const [ocurrenceDate, setOcurrenceDate] = useState('');
    const [selectedDepartments, setSelectedDepartments] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3000/departments')
            .then(res => {
                setDepartments(res.data);
            });
    }, []);

    const handleSubmit = e => {
        e.preventDefault();

        let checkedDepartments = [];

        departments.map(item => {
            if (item.isChecked)
                checkedDepartments.push(item.id);
        });

        const object = {
            description,
            ocurrenceDate,
            departments: checkedDepartments
        }

        Axios.post('http://localhost:3000/non-conformities', object)
            .then(res => {
                console.log(res)
            });
    }

    const handleDepartmentCheckbox = (e, id) => {
        let temp = [...departments];
        temp.find((item) => {
            return item.id === id;
        }).isChecked = e.target.checked;
        setDepartments(temp);
    }

    return (
        <>
            <div>
                <button onClick={() => { history.goBack() }}>Voltar</button>
            </div>
            <div>
                <form id='new-nonconformity-form' onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Descrição
                        <input type="text" id="description" onChange={e => setDescription(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Data da Ocorrência
                            <input type="date" id="ocurrence-date" onChange={e => setOcurrenceDate(e.target.value)} />
                        </label>
                    </div>
                    <div>
                        {departments.map(item =>
                            <label key={item.id}>
                                {item.name}
                                <input type="checkbox" checked={item.isChecked} onChange={e => handleDepartmentCheckbox(e, item.id)} />
                            </label>
                        )}
                    </div>
                    <button type="submit">
                        Enviar
                    </button>
                </form>
            </div>
        </>
    );
}