import React, {
  Component,
} from 'react';
import './App.css';
import Button from './Button';
import Control from './Control';
import Message from './Message';
import {
  playTheSound,
  lightTheButton,
  playAllNotes,
} from './Play';

const COLORS = ['green', 'red', 'yellow', 'blue'];

const WIN_LIGTH = ['red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow'];

const DELAY = 500;
const NOTES_MAX = 20;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      winLastGame: false,
      playing: false,
      colors: [],
      goodMoves: 0,
      strict: false,
    };
    this.startStopGame = this.startStopGame.bind(this);
    this.clickHandle = this.clickHandle.bind(this);
    this.addColor = this.addColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  playTheGame(color) {
    let moves = this.state.goodMoves;
    const colors = this.state.colors.slice();
    if (colors[moves] === color) {
      // good button
      moves += 1;

      if (moves === NOTES_MAX) { this.win(); } else if (moves >= colors.length) {
        setTimeout(this.addColor, DELAY);
        this.setState({
          goodMoves: 0,
        });
      } else {
        this.setState({
          goodMoves: moves,
        });
      }
    } else {
      // wrong button
      this.setState({
        goodMoves: 0,
      });
      playTheSound('wrong');
      if (this.state.strict) { this.stopGame(); } else { setTimeout(playAllNotes(colors), DELAY); }
    }
  }

  clickHandle(color) {
    playTheSound(color);
    lightTheButton(color);
    if (this.state.playing) { this.playTheGame(color); }
  }


  startStopGame() {
    if (this.state.colors.length === 0) {
      this.startGame();
    } else {
      this.stopGame();
    }
  }

  stopGame() {
    document.getElementById('checkbox').disabled = false;
    document.getElementById('checkbox-label').style.color = 'black';
    this.setState({
      colors: [],
      goodMoves: 0,
      playing: false,
      winLastGame: false,
    });
  }

  startGame() {
    document.getElementById('checkbox').disabled = true;
    document.getElementById('checkbox-label').style.color = 'lightgrey';
    this.addColor();
    this.setState({
      playing: true,
      goodMoves: 0,
    });
  }

  handleChange() {
    this.setState({
      strict: !this.state.strict,
    });
  }

  addColor() {
    const newColors = this.state.colors.slice();
    newColors.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
    playAllNotes(newColors);
    this.setState({
      colors: newColors,
    });
  }
  win() {
    playAllNotes(WIN_LIGTH);
    this.stopGame();
    this.setState({
      winLastGame: true,
    });
  }


  render() {
    return (
      <div className="App">
        <div className="flexpad">
          {COLORS.map(color => (<Button
            key={`button-${color}`}
            color={color}
            onClick={this.clickHandle}
          />))}
        </div>
        <div className="flexctrl">
          <Control
            onClick={this.startStopGame}
            onChange={this.handleChange}
          />
          <Message
            playing={this.state.playing}
            winLastGame={this.state.winLastGame}
            good={this.state.goodMoves}
            total={this.state.colors.length}
          />
        </div>
      </div>
    );
  }
}

export default App;
