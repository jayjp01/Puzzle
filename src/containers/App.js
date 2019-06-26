import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../App.css';
import GameView from '../components/GameView'

class App extends Component {
    render() {
        const { isSolving } = this.props;
        return (
            <GameView isSolving={isSolving} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSolving: state.isSolving,
    }
};

export default connect(mapStateToProps)(App);
