import React from 'react';

import DougObituary from "./DougObituary";
import MabelObituary from "./MabelObituary";

import "./Obituaries.scss";

function Obituaries() {
    return (
        <div className="obituaries">
            <DougObituary/>
            <MabelObituary/>
        </div>
    );
}

export default Obituaries;
