import React from 'react';
import './Chaffer.scss'

const Chauffer = (props) => {
    console.log(props.Id);
    return (
        <>
            <div class="cardChaufPerson">
                <div class="card-border-top">
                </div>
                <div class="img">
                </div>
                <span> Person</span>
                <p class="job"> Job Title</p>
                <button> Click
                </button>
            </div>
        </>
    );
}

export default Chauffer;
