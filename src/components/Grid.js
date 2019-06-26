import React, { Component } from 'react';
import Tile from "./Tile";

class Grid extends Component {

    render() {

        const {
            onGrab,
            gridSize,
            gridStyle,
            dragIndex,
            dropIndex,
        } = this.props;
        const tileSize = getTileSize(1000, 300, gridSize);
        let tiles = this.props.tiles;
        tiles = tiles.map((item, i, arr) => {
            const dragged = (dragIndex === i);
            const dropped = (dropIndex === i);
            let tilePos = getPosition(tileSize.width, tileSize.height, i, gridSize);
            const visible = (item === arr.length) ? "hidden" : "visible"
            return (

                <Tile key={i}
                    width={tileSize.width}
                    height={tileSize.height}
                    index={i}
                    id={item}
                    onGrab={onGrab}
                    curPos={tilePos}
                    visible={visible}
                    dragged={dragged}
                    dropped={dropped}
                />
            )
        });

        return (

            <div className="Grid" style={gridStyle}>
                <img alt="background" className="bg-image"
                    src={'/static/media/buildings-sq.851eec2e.jpg'}
                />

                <div>
                    {tiles}
                </div>
            </div>

        );

    }

}

export default Grid;

const getTileSize = (width, height, gridsize) => {

    return { width: width / gridsize, height: height / gridsize }
};

const getPosition = (tileWidth, tileHeight, gridIndex, gridSize) => {

    const imgCoor = getGridCoordinates(gridIndex, gridSize);
    const x = tileWidth * imgCoor.x;
    const y = tileHeight * imgCoor.y;
    return { x: x, y: y };
};

const getGridCoordinates = (index, size) => {

    const y = Math.floor(index / size);
    const x = index - (y * size);
    return { x: x, y: y };

}

