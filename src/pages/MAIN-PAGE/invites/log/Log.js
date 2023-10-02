import React from "react";
import '../log-invites/LogInvites.css'

const Log = ({log}) => {

    return (
        <div className="log-container">
            <div className={`log-list ${log.length > 4 ? 'scrollable' : ''}`}>
                {log.map((message, index) => (
                    <div className="log-item" key={index}>{message}</div>
                )).reverse()}
            </div>
        </div>
    )
}

export default Log;
