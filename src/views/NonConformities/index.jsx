import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default function NonConfirmities() {

    const [nonConformities, setNonConformities] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3000/non-conformities')
            .then(res => {
                console.log(res.data);
                setNonConformities(res.data);
            });
    }, []);

    return (
        <>
        <div>
            <Link to='/nonconformities/new'>Novo</Link>
        </div>
            {nonConformities.map((item) =>
                <div key={item.id}>
                    <div>
                        id {item.id}
                    </div>
                    <div>
                        {item['ocurrence-date']}
                    </div>
                    <div>
                        {item.description}
                    </div>
                    <Link to={`nonconformities/${item.id}`}>
                        detalhes
                    </Link>
                </div>
            )}
        </>
    );
}