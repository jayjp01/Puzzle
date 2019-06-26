import React, { Component } from 'react';

class Tile extends Component {

    constructor(props) {
        super(props);
        this.dragStart = null;
        this.dragOffset = null;
        this.grabHandler = this.grabHandler.bind(this);
    }

    grabHandler = (e) => {
        let el = this.refs.tile;
        let offset = { x: 0, y: 0 };
        while (el) {
            offset.x += el.offsetLeft;
            offset.y += el.offsetTop;
            el = el.offsetParent;
        }
        const grabX = (e.nativeEvent && e.nativeEvent.touches) ? e.nativeEvent.touches[0].clientX : e.clientX;
        const grabY = (e.nativeEvent && e.nativeEvent.touches) ? e.nativeEvent.touches[0].clientY : e.clientY;
        this.props.onGrab(this.props.index, grabX, grabY, this.props.width, this.props.height, this.props.id);

    };

    render() {
        const {
            width,
            height,
            curPos,
            visible,
            dragged,
            dropped
        } = this.props;
        if (dropped) {
            console.log(" it has been dropped! " + this.props.id)
        }

        const tileStyle = {

            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: `white`,
            visibility: `${visible}`,
            transition: `left 0.1s ease-out, top 0.1s ease-out`,
            top: `${curPos.y}px`,
            left: `${curPos.x}px`,

        };

        const droppedStyle = {

            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: 'whitesmoke',
            visibility: `${visible}`,
            transition: `left 0.1s ease-out, top 0.1s ease-out`,
            top: `${curPos.y}px`,
            left: `${curPos.x}px`,
        };

        const tileClass = "Tile";
        const s = (dropped === true || dragged === true) ? droppedStyle : tileStyle;
        const txtStyle = {
            opacity: `1`
        };

        return (
            <div className={tileClass} style={s} onMouseDown={this.grabHandler} onClick={this.grabHandler} ref="tile">
                <div className="TileTxt" style={txtStyle}>
                    {this.props.id}
                </div>
            </div>
        )
    }
}

export default Tile;