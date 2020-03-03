import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function NonConformity({ history, match }) {

    const [nonConformity, setNonConformity] = useState({});
    const [correctiveActions, setCorrectiveActions] = useState([])


    useEffect(() => {
        Axios.get(`http://localhost:3000/non-conformities/${match.params.id}`)
            .then(res => {
                setNonConformity(res.data);
                setCorrectiveActions(correctiveActions);
            });
    }, [match.params.id]);

    console.log(correctiveActions)

    return (
        <><Link to='/nonconfirmities'>voltar</Link>
            <div>
                <div>
                    {nonConformity.id}
                </div>
                <div>
                    {nonConformity['ocurrence-date']}
                </div>
                <div>
                    {nonConformity.description}
                </div>
            </div>
            <div>
                {correctiveActions.map(item =>
                    <div key={item.id}>
                        <div>{item.id}</div>
                    </div>
                )}
            </div>
        </>
    );
}