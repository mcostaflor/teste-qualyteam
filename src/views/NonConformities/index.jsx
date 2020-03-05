import React, { useEffect, useState } from 'react';

import {
    Card,
    CardContent,
    CardActions,
    Button,
    Typography,
    Chip
} from '@material-ui/core';

import {
    nonConformitiesApi
} from '../../services/api/routes';

export default function NonConfirmities({ history }) {

    const [nonConformities, setNonConformities] = useState([]);

    useEffect(() => {

        async function fetchNonConformities() {
            setNonConformities(await nonConformitiesApi.getAll());
        }

        fetchNonConformities();

    }, []);

    return (
        <>
            <Button onClick={() => history.push('/nonconformities/new')} variant='contained' color={'primary'}>
                Novo
            </Button>
            {nonConformities.map((item) =>
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
                        <div>
                            {item._departments.length > 0 && item._departments.map(item =>
                                <Chip key={item.id} label={item.name} style={{ marginRight: 8 }} />
                            )}
                        </div>
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