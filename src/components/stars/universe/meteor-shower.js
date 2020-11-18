
import React from 'react';
import { Meteor } from './meteor';
import { METEOR_DATA } from './meteor-data';

export class MeteorShower extends React.Component {
  timerRef = null;

  constructor(props) {
    super(props);
    this.state = {
      activeMeteorIndex: 0
    }

    this.next = this.next.bind(this);
    this.handleGlobalMouseClick = this.handleGlobalMouseClick.bind(this);
  }

  handleGlobalMouseClick() {
    this.next();
  }

  componentDidMount() {
    this.next();
    window.addEventListener("click", this.handleGlobalMouseClick);
  }

  componentWillUnmount() {
    clearTimeout(this.timerRef);
    window.removeEventListener("click", this.handleGlobalMouseClick);
  }

  next() {
    clearTimeout(this.timerRef);

    const availableCount = METEOR_DATA.length;
    let newIndex = Math.round(Math.random()*availableCount);

    if(newIndex === this.state.activeMeteorIndex) {
      newIndex = (newIndex + 1)%availableCount;
    }

    this.setState({
      activeMeteorIndex: newIndex
    })

    const minDelay = 5000;
    const maxDelay = 10000;
    const nextTickTimeout = minDelay + Math.random() * (maxDelay - minDelay);

    this.timerRef = setTimeout(this.next, nextTickTimeout);
  }

  render() {
    const {activeMeteorIndex} = this.state;
    const meteor = METEOR_DATA[activeMeteorIndex];
    const {debug} = this.props;

    if(debug === false) {
      return <Meteor {...meteor} debug={false} />;
    } else {
      return (
        // Run all metors in parallel and show path
        <g >
          {
            METEOR_DATA.map((meteorData, index) => (
              <Meteor {...meteorData} key={index} debug={true} />
            ))
          }
        </g>
      )
    }
  }
};
