import React from 'react';
import './Chaffer.scss'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'


const Chauffer = (props) => {

    return (
        <>
            <div class="cardChaufPerson">
                <div class="card-border-top">
                </div>
                <div class="img">
                    <img src={`data:image/png;base64,${props.imgUrl}`} />
                </div>
                <span>{props.name}</span>
                <p class="job">{props.number}</p>
                <button>
                    <Link to={`/ChaufferDetails/${props.Id}`}>
                        Detail
                    </Link>
                </button>
            </div>
        </>
    );
}

export default Chauffer;
