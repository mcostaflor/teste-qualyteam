import React, { useState, useEffect } from 'react';
import { nonConformitiesApi, departmentsApi } from '../../services/api/routes';
import { useSnackbar } from 'notistack';
import dateFormat from 'dateformat';

import { TextField, FormGroup, FormControlLabel, Checkbox, Button, Card, CardContent } from '@material-ui/core';

export default function NonConformityCreate({ history }) {

    const [departments, setDepartments] = useState([]);
    const [description, setDescription] = useState('');
    const [ocurrenceDate, setOcurrenceDate] = useState(dateFormat(new Date(), 'yyyy-mm-dd'));

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        async function fetchDepartments() {
            setDepartments(await departmentsApi.getAll());
        }

        fetchDepartments();
    }, []);

    const handleSubmit = async e => {
        e.preventDefault();

        let checkedDepartments = [];

        departments.map(item => {
            if (item.isChecked) {
                checkedDepartments.push(item.id);
            }
            return item;
        });

        if (ocurrenceDate === '') {
            enqueueSnackbar('Favor preencher o campo "Data da Ocorrência"', { variant: 'warning' });
            return;
        }
        if (description === '') {
            enqueueSnackbar('Favor preencher o campo "Descrição"', { variant: 'warning' });
            return;
        }
        if (checkedDepartments.length === 0) {
            enqueueSnackbar('Favor selecionar ao menos um departamento.', { variant: 'warning' })
            return;
        }

        const data = {
            description,
            'ocurrence-date': dateFormat(ocurrenceDate + 'T00:00:00', 'dd-mm-yyyy'),
            departments: checkedDepartments,
            'corrective-actions': []
        }

        try {
            const create = await nonConformitiesApi.createOne(data);
            history.push(`${create.id}`);
            enqueueSnackbar('Não conformidade criada com sucesso', { variant: 'success' });
        } catch (e) {
            enqueueSnackbar('Não criado.', { variant: 'error' })
        }

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
            <Button onClick={() => { history.push('/nonconformities') }} variant="contained" color="primary">Voltar</Button>
            <div>
                <form id='new-nonconformity-form' onSubmit={handleSubmit} data-testid={'new-noncorformity-form'}>
                    <Card style={{ marginTop: 16 }}>
                        <CardContent>
                            <TextField
                                label={'Data da Ocorrência'}
                                type="date"
                                value={ocurrenceDate}
                                onChange={e => setOcurrenceDate(e.target.value)}
                                variant={'outlined'}
                                style={{
                                    marginTop: 18
                                }}
                                inputProps={{
                                    'data-testid': 'new-nonconformity-ocurrence-date'
                                }}
                            />
                            <TextField
                                label={'Descrição'}
                                multiline
                                rows={10}
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                variant={'outlined'}
                                fullWidth
                                style={{
                                    marginTop: 18
                                }}
                                inputProps={{
                                    'data-testid': 'new-nonconformity-description'
                                }}
                            />
                            <FormGroup label={'Departamento(s)'} row>
                                {departments.map((item, index) =>
                                    <FormControlLabel
                                        key={item.id}
                                        data-testid={`new-nonconformity-checkbox-${index}`}
                                        control={
                                            <Checkbox
                                                checked={item.isChecked || false}
                                                onChange={e => handleDepartmentCheckbox(e, item.id)}
                                            />
                                        }
                                        label={item.name}
                                    />
                                )}
                            </FormGroup>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                data-testid={'new-nonconformity-submit'}
                            >
                                Enviar
                            </Button>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </>
    );
}