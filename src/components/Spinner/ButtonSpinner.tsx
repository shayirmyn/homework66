import React from 'react';

const ButtonSpinner = () => {
    return (
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export default ButtonSpinner;