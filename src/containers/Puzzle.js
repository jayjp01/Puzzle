import React, { Component } from 'react'
import { connect } from 'react-redux'
import Grid from '../components/Grid'
import Timer from '../components/Timer'
import { grabTile, dropTile, dragTile, startSolutionMove, endSolutionMove, solutionComplete } from '../actionCreators'
import { makeIndex } from '../libs/utils'
const actionOccur = []
class Puzzle extends Component {

    constructor(props) {
        super(props);

        this.dragStart = null;
        this.dragOffset = null;
        this.state = { solutionEnd: false, moves: 0 }
        this.handlePieceGrab = this.handlePieceGrab.bind(this);
        this.handlePieceDrop = this.handlePieceDrop.bind(this);
        this.addListeners = this.addListeners.bind(this);
        this.removeListeners = this.removeListeners.bind(this);

    }


    componentDidUpdate(prevProps) {

        //add listeners if drag triggered
        if (this.props.dragIndex !== null && prevProps.dragIndex === null) {

            this.addListeners();
        }
        //remove listeners if drag stopped
        if (this.props.dragIndex === null && prevProps.dragIndex !== null) {

            this.removeListeners();
        }
        //if showNext dispatch next move in solution
        if (this.props.showNext && !prevProps.showNext) {
            if (!this.props.solution) return;
            if (this.props.solution.length > 0) {
                let remainingMoves = this.props.solution.slice(0);
                let move = remainingMoves.shift();
                this.props.startSolutionMove(move, remainingMoves);
            } else {
                //done
                this.props.solutionComplete();
                this.setState({ solutionEnd: true })
            }
        }
        if (this.props.isShowingSolution && !prevProps.isShowingSolution) {
            setTimeout(this.props.endSolutionMove, 250)
        }
    }

    componentWillUnmount() {
        if (this.listenersActive) this.removeListeners();
    }

    addListeners() {
        this.listenersActive = true;
        window.addEventListener("touchend", this.handlePieceDrop);
        window.addEventListener("mouseup", this.handlePieceDrop);
    }

    removeListeners() {
        window.removeEventListener("mouseup", this.handlePieceDrop);
        window.removeEventListener("touchend", this.handlePieceDrop);
        this.listenersActive = false;
    }

    handlePieceGrab = (position, mouseX, mouseY, tileWidth, tileHeight, element) => {
        if (this.props.isSolving) return;
        this.props.grabTile(position, { x: mouseX, y: mouseY }, { w: tileWidth, h: tileHeight })
        if (element !== 16 && element !== 9) {
            this.setState({ 'movedEle': element })
        }
    };

    handlePieceDrop = () => {

        const { dragIndex, dropIndex } = this.props;
        this.setState((prevState, props) => {
            return { moves: prevState.moves + 1, 'sourceIndex': dragIndex };
        })
        this.props.dropTile(dragIndex);
        this.setState((prevState, props) => {
            return { 'destIndex': props.dropIndex };
        })
        actionOccur.push({ ...this.state })
    };


    render() {
        const { gridSize,
            gridStyle,
            containerStyle,
            tiles,
            dragIndex,
            dropIndex,
        } = this.props;
        const { solutionEnd } = this.state;
        const indexArray = makeIndex(gridSize)
        return (
            <div>
                <div className="timer-sec">
                    <Timer timerEnd={solutionEnd} />
                    <div>Moves:{this.state.moves}</div>
                </div>
                <div className='grid-container' style={containerStyle}>
                    <Grid
                        tiles={tiles}
                        gridSize={gridSize}
                        onGrab={this.handlePieceGrab}
                        gridStyle={gridStyle}
                        dragIndex={dragIndex}
                        dropIndex={dropIndex}
                    />
                </div>
                <div className="side-bar">
                    <h2>Your Moves</h2>
                    <ul>
                        {actionOccur.map((data, index) => {
                            return (
                                <li key={index}>
                                    Tiles {data.movedEle} moves from {indexArray[data.sourceIndex]} to {indexArray[data.destIndex]}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

        )
    }
}



const mapStateToProps = (state, ownProps) => {
    console.log(state)
    return {

        tiles: state.tiles,
        isSolving: state.isSolving,
        solution: state.solution,
        gridSize: state.gridSize,
        puzzleArea: state.puzzleArea,
        dragIndex: state.dragIndex,
        dragStart: state.dragStart,
        dragArea: state.dragArea,
        dropIndex: state.dropIndex,
        showNext: state.showNext,
        isShowingSolution: state.isShowingSolution,
        gridStyle: ownProps.gridStyle,
        containerStyle: ownProps.containerStyle
    }
}

const mapDispatchToProps = (dispatch) => {

    return {

        grabTile: (dragIndex, dragOffset, dragArea) => {

            dispatch(grabTile(dragIndex, dragOffset, dragArea))
        },

        dragTile: (dragOffset) => {

            dispatch(dragTile(dragOffset))
        },

        dropTile: (dragIndex, dragOffset, dragArea) => {

            dispatch(dropTile(dragIndex, dragOffset, dragArea))
        },

        startSolutionMove: (move, solution) => {

            dispatch(startSolutionMove(move, solution))
        },

        endSolutionMove: () => {

            dispatch(endSolutionMove());
        },

        solutionComplete: () => {

            dispatch(solutionComplete());
        }

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Puzzle);
