import React, { useEffect, useState } from 'react';

import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    Chip,
    IconButton,
    TextField
} from '@material-ui/core';

import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';

import {
    nonConformitiesApi
} from '../../services/api/routes';

export default function NonConfirmities({ history }) {

    const [nonConformities, setNonConformities] = useState([]);
    const [sortAsc, setSortAsc] = useState(false);
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        async function fetchNonConformities() {
            setNonConformities(await nonConformitiesApi.getAll());
        }
        fetchNonConformities();
    }, []);

    const toggleSort = function () {
        setSortAsc(!sortAsc);
    }

    const filterNonConformitiesByString = function (list) {
        return list.filter(item => {
            return item.description.toUpperCase().includes(searchString.toUpperCase());
        });
    }

    const sortNonConformitiesByDate = function (list) {
        return list.sort((a, b) => {
            if (a && b) {
                let partsA = a['ocurrence-date'].split('-');
                let partsB = b['ocurrence-date'].split('-');
                if (new Date(`${partsA[1]}-${partsA[0]}-${partsA[2]}`) > new Date(`${partsB[1]}-${partsB[0]}-${partsB[2]}`))
                    return (sortAsc ? 1 : -1)
                else
                    return (sortAsc ? -1 : 1)
            }
            return 0;
        });
    }

    return (
        <>
            <div>
                <IconButton onClick={() => history.push('/nonconformities/new')} variant='contained' color={'primary'}>
                    <AddIcon />
                </IconButton>
                <IconButton onClick={toggleSort}>
                    <FilterListIcon style={{ transform: sortAsc ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </IconButton>
            </div>
            <TextField
                fullWidth
                variant={"outlined"}
                label={"Buscar..."}
                value={searchString}
                onChange={e => setSearchString(e.target.value)}
            />
            {filterNonConformitiesByString(sortNonConformitiesByDate(nonConformities))
                .map((item) =>
                    <Card key={item.id} style={{
                        marginTop: 16
                    }}>
                        <CardContent>
                            <Typography variant="h6" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <div>
                                    #{item.id}
                                </div>
                                <div>
                                    {item['ocurrence-date']}
                                </div>
                            </Typography>
                            <Typography variant="body2" component="p">
                                {item.description}
                            </Typography>
                        </CardContent>
                        <CardContent>
                            {item._departments.length > 0 && item._departments.map(item =>
                                <Chip key={item.id} label={item.name} style={{ marginRight: 8 }} />
                            )}
                        </CardContent>
                        <CardActions>
                            <Button onClick={() => history.push(`nonconformities/${item.id}`)} variant={'outlined'} color="primary">
                                Ver
                        </Button>
                        </CardActions>
                    </Card>
                )}
        </>
    );
}