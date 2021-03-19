import React from 'react';

// Page that displays if only unauthorized user tries to access a page
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