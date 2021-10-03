import React from 'react';
import './Table.css';

const Table = (props) => {
    const { countries } = props;
    return (
        <div className="table">
        
            {countries.map(({country , cases}) =>  
            (<tr>
                <td>{country}</td>
                <td><strong>{cases}</strong></td>
            </tr>))}
        </div>
    )
};

export default Table;
