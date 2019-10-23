
import React from 'react';
import styled, { keyframes, css } from 'styled-components';


const meteorOrbitAnimation = props => keyframes`
  0% {
    transform: translate(${ `${-props.radius}px` }, 0) rotate3d(0, 0, 1, ${ props.reverse ? '360deg' : '270deg' });
  }
  100% {
    transform: translate(${ `${-props.radius}px` }, 0) rotate3d(0, 0, 1, ${ props.reverse ? '270deg' : '360deg' });
  }
`

const meteorGlow = keyframes`
  0% {
    opacity: 0
  }
  10% {
    opacity: 0
  }

  50%, 50% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`

const Orbit = styled.g`
  transform: rotate(90deg);
`

const MeteorShape = styled.circle`
  fill: white;
  transform-origin: ${({radius}) => radius}px 0;
  ${ ({animationReset}) => animationReset!== true ? css`
    animation:
      5s ${meteorOrbitAnimation} 1 linear both,
      5s ${meteorGlow} 1 cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  ` : css`
    opacity: 0;
  `}
`

export class Meteor extends React.Component {
  animationTickTimeout = null;

  constructor (props) {
    super(props);
    this.state = {
      animationReset: false
    }

  }

  componentWillUnmount() {
    clearTimeout(this.animationTickTimeout);
  }

  UNSAFE_componentWillReceiveProps(props) {
    // This will allow the animation to restart
    // The flag will quickly switch from false to true
    // we can safely remove and add the animation (see MeteorShape)
    // as the component is not visible in the beginning.
    this.setState({
      animationReset: true
    })

    this.animationTickTimeout = setTimeout(() => {

      this.setState({
        animationReset: false
      })
    }, 10)
  }

  render() {
    const {radius = 100, x = 0, y = 0, rotate = 0, reverse = false, debug = false } = this.props;
    const { animationReset } = this.state;

    return (
      <g transform={`translate(${x}, ${y}) rotate(${rotate})`}>
        {debug ? <circle cx="0" cy="0" r={radius} fill='yellow' fillOpacity="0.1"/> : null }
        {debug ? (<path
          d={`M-${radius} 0 A ${radius} ${radius}, 0, 0, 1, 0 -${radius}`}
          stroke="red"  strokeWidth="1" fill="none"/>) : null }

        <Orbit>
          <MeteorShape animationReset={animationReset} cx="0" cy="0" r={debug ? 10 : 1} radius={radius} reverse={reverse}/>
        </Orbit>
      </g>
    )
  }
}