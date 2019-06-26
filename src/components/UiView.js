import React from 'react';

const UiView = (props) => (

    <div className="nav" style={props.navStyle}>
        <button onClick={props.onNewClick} className="btn-two">New Game</button>
        <button onClick={props.onSolveClick} className="btn-one">Auto Solve</button>
        <button onClick={props.onSizeClick} className="btn-three">{props.selectSize} suffle Board</button>
    </div>
);
export default UiView;