import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    status: 'off',
    time: 0,
    timer: null
  }

  formatTime() {
    const mm = ('0' + (Math.floor(this.state.time / 60).toString())).slice(-2);
    const ss = ('0' + ((this.state.time % 60).toString())).slice(-2);
    return `${mm}:${ss}`
  }

  step = () => {
    this.setState({time: this.state.time - 1});
    
    if(this.state.time === 0) {
      if(this.state.status === 'work') {
        this.setState({status: 'rest', time: 20})
      } else if (this.state.status === 'rest') {
        this.setState({status: 'work', time: 20 * 60})
      }
      this.playBell();
    }
  };

  startTimer = () => {
    this.setState({
      timer: setInterval(this.step, 1000),
      status: 'work',
      time: 20 * 60,
    });
  };

  playBell = () => {
    const audio = new Audio('./sounds/bell.wav');
    audio.play();
  }

  stopTimer = () => {
    clearInterval(this.state.timer);
    this.setState({time: 0, status: 'off'});
  }

  closeApp = () => {
    window.close();
  }
  
  render() {

    const { status, time } = this.state;
    
    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && <AppDescription />}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime()}</div>}
        {(status === 'off') && <button className="btn" onClick={() => this.startTimer()}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={() => this.stopTimer()}>Stop</button>}
        <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
      </div>
    )
  };
};

class AppDescription extends React.Component {
  render() {
    return (
      <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>
    );
  }
};

render(<App />, document.querySelector('#app'));