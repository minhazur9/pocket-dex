import React from 'react';

// Page that displays if only unauthorized user tries to access a page
const Unknown = () => {
    return (
        <div className="forbidden">
            <div className="forbidden-message">
                <h1>404 Page Not Found</h1>
                <p>Oops! The page you are looking for does not exist</p>
            </div>
        </div>
    )
}

export default Unknown;