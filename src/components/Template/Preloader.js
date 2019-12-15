import React from 'react'

function Preloader () {
    return(
        <React.Fragment>
            <div className="preloader">
                <div className="lds-ripple">
                    <div className="lds-pos" />
                    <div className="lds-pos" />
                </div>
            </div>

        </React.Fragment>
    )
}

export default Preloader;