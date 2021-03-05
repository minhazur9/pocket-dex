import React from 'react';

const Forbidden = () => {
    return (
        <div className="forbidden">
            <div className="forbidden-message">
                <h1>Forbidden Not Authorized</h1>
                <p>You must be logged in to view this page</p>
            </div>
        </div>
    )
}

export default Forbidden;