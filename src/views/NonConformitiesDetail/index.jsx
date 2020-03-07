import React, { useEffect, useState } from 'react';
import { nonConformitiesApi, correctiveActionsApi } from '../../services/api/routes';
import { Button, Card, CardContent, Typography, Dialog, DialogTitle, DialogContent, TextField, Chip, DialogActions } from '@material-ui/core';
import dateFormat from 'dateformat';
import { useSnackbar } from 'notistack';
import { isMobile } from 'react-device-detect';

import CorrectiveAction from '../../components/NonConformitiesDetail/CorrectiveAction';

export default function NonConformity({ history, match }) {

    const [nonConformity, setNonConformity] = useState(null);
    const [correctiveActions, setCorrectiveActions] = useState([]);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [whatInput, setWhatInput] = useState('');
    const [whyInput, setWhyInput] = useState('');
    const [howInput, setHowInput] = useState('');
    const [whereInput, setWhereInput] = useState('');
    const [untilInput, setUntilInput] = useState(dateFormat(new Date(), 'yyyy-mm-dd'));

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        async function fetchNonConformity() {
            setNonConformity(await nonConformitiesApi.getOne(match.params.id));
        }

        fetchNonConformity();
    }, [match.params.id]);

    useEffect(() => {

        async function fetchCorrectiveActions() {
            setCorrectiveActions(await correctiveActionsApi.getAllFromId(nonConformity['corrective-actions']));
        }

        if (nonConformity)
            fetchCorrectiveActions();

    }, [nonConformity])

    const toggleDialog = () => {
        setDialogOpen(!dialogOpen);
    }

    const clearForm = () => {

        setWhatInput('');
        setWhyInput('');
        setHowInput('');
        setWhereInput('');
        setUntilInput(dateFormat(new Date(), 'yyyy-mm-dd'));

    }

    const handleSubmit = async function (e) {

        e.preventDefault();

        let validationError = '';

        if (whatInput === '') {
            validationError = 'Favor preencher campo "O que fazer"';
        }
        if (whyInput === '') {
            validationError = 'Favor preencher campo "Por que fazer"';
        }
        if (howInput === '') {
            validationError = 'Favor preencher campo "Como fazer"';
        }
        if (whereInput === '') {
            validationError = 'Favor preencher campo "Onde fazer"';
        }
        if (untilInput === '') {
            validationError = 'Favor preencher campo "Até quando"';
        }

        if (validationError !== '') {
            enqueueSnackbar(validationError, { variant: 'warning' });
            return;
        }

        try {

            let created = await correctiveActionsApi.createOne({
                'what-to-do': whatInput,
                'why-to-do-it': whyInput,
                'how-to-do-it': howInput,
                'where-to-do-it': whereInput,
                'until-when': dateFormat(untilInput + 'T00:00:00', 'dd-mm-yyyy')
            });


            setNonConformity(await nonConformitiesApi.editOne(nonConformity.id, {
                ...nonConformity,
                'corrective-actions': [...nonConformity['corrective-actions'], created.id]
            }));

            toggleDialog();
            enqueueSnackbar('Ação criada com succeso.', { variant: 'success' });
            clearForm();

        } catch (e) {
            enqueueSnackbar('Ação não pode ser criada. Tente novamente.', { variant: 'error' });
        }

    }

    if (!nonConformity)
        return null;

    return (
        <>
            <Button variant={'contained'} color={'primary'} onClick={() => history.push('/nonconformities')}>
                Voltar
            </Button>
            <Card style={{ marginTop: 20 }}>
                <CardContent>
                    <Typography variant="h6" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <div>
                            #{nonConformity.id}
                        </div>
                        <div>
                            {nonConformity['ocurrence-date']}
                        </div>
                    </Typography>
                    <Typography variant="body2" component={'p'}>
                        {nonConformity.description}
                    </Typography>
                </CardContent>
                <CardContent>
                    {nonConformity._departments && nonConformity._departments.map(item =>
                        <Chip key={item.id} label={item.name} style={{ marginRight: 8 }} />
                    )}
                </CardContent>
            </Card>
            <Button variant={'contained'} color={'primary'} onClick={toggleDialog} style={{ marginTop: 20 }}>
                Nova ação
            </Button>
            <div>
                {correctiveActions.map((item, index) =>
                    <CorrectiveAction
                        key={item.id}
                        id={index + 1}
                        what={item['what-to-do']}
                        why={item['why-to-do-it']}
                        how={item['how-to-do-it']}
                        where={item['where-to-do-it']}
                        until={item['until-when']}
                    />
                )}
            </div>
            <Dialog open={dialogOpen} onClose={toggleDialog} aria-labelledby="form-dialog-title" fullScreen={isMobile}>
                <DialogTitle id="form-dialog-title">Nova Ação Corretiva</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="O que fazer"
                            type="text"
                            multiline
                            rows={2}
                            variant={'outlined'}
                            fullWidth
                            value={whatInput}
                            onChange={e => setWhatInput(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Por que fazer"
                            type="text"
                            multiline
                            rows={2}
                            variant={'outlined'}
                            fullWidth
                            value={whyInput}
                            onChange={e => setWhyInput(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Como fazer"
                            type="text"
                            multiline
                            rows={2}
                            variant={'outlined'}
                            fullWidth
                            value={howInput}
                            onChange={e => setHowInput(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Onde fazer"
                            type="text"
                            multiline
                            rows={2}
                            variant={'outlined'}
                            fullWidth
                            value={whereInput}
                            onChange={e => setWhereInput(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            label="Fazer até"
                            type="date"
                            variant={'outlined'}
                            value={untilInput}
                            onChange={e => setUntilInput(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" type={'submit'}>
                            Enviar
                        </Button>
                        <Button color="primary" onClick={clearForm}>
                            Limpar
                        </Button>
                        <Button color="primary" onClick={toggleDialog}>
                            Cancelar
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}