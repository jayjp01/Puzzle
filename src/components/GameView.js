import React from 'react'
import UI from '../containers/UI'
import Sidebar from './Sidebar'
import Puzzle from '../containers/Puzzle'

const GameView = ({ isSolving }) => {

    const gridStyle = {
        transform: `scale(${0.50})`,
    };

    const gamecontainerstyle = {
        width: `${1024}px`
    };

    const containerstyle = {
        width: `${510}px`,
        height: `${500}px`
    };

    const uistyle = {
        width: `${150}px`,
        height: `${449}px`,
    };

    return (
        <div className="wholepage">
            <h1 className="pagetitle">puzzle </h1>
            <div className="game-area"  >
                <div className="game-container" style={gamecontainerstyle}>
                    <div className="header-container"></div>
                    <UI navStyle={uistyle} />
                    <Puzzle gridStyle={gridStyle} containerStyle={containerstyle} />
                    <Sidebar solving={isSolving} />
                </div>

            </div>
        </div>
    );
}


export default GameView;