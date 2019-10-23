import React from 'react';
import styled, { keyframes } from 'styled-components';

const maxTranslationY = 1500;
const depthSeparation = 3;

const pulseAnimation = keyframes`
  0% {
    transform: scale3d(1, 1, 1);
  }

  30% {
    transform: scale3d(1.2, 1.2, 1.2);
  }

  70% {
    transform: scale3d(0.2, 0.2, 0.2);
  }

  100% {
    transform: scale3d(1, 1, 1);
  }
`

const glowingAnimation = keyframes`
  0% {
    opacity: var(--star-brightness, 1);
  }

  100% {
    opacity: calc(var(--star-brightness, 1) * 0.5);
  }
`

const StarShape = styled.circle`
  --star-brightness: ${ ({brightness}) => brightness};
  --star-animation-delay:  ${ ({animationOffset}) => animationOffset};
  --star-animation-duration:  ${ ({duration}) => duration};
  --star-animation-glow-duration: 10000ms;

  animation:
    ${pulseAnimation} var(--star-animation-duration, 1000ms) infinite backwards,
    ${glowingAnimation} var(--star-animation-glow-duration, 1000ms) infinite alternate backwards;

  animation-delay: var(--star-animation-delay, 0);
`

const ParallaxLayer = styled.g`
  /* transform: translate(calc(var(--mouse-x) * 0.01), calc(var(--mouse-y) * 0.01)); */
  transform: translate(0, calc(-1px * var(--translateScrollY) * ${maxTranslationY} * ${({depth}) => 1/depth} ));
  transition: transform .1s;
  will-change: transition;
`;

const mapDepthToColor = depth => {
  const colors = ['hotpink', 'blue', 'green', 'yellow', 'brown']
  return colors[depth];
}
export const Star = ({x, y, animationOffset, duration, brightness, depth = 1, debug}) => (
  <g transform={`translate(${x} ${y})`}>
    <ParallaxLayer depth={depth*depthSeparation + 1}>
      <StarShape
        cx="0" cy="0" r={debug ? 10 : 1}
        fill={debug ? mapDepthToColor(depth) : 'white'}
        animationOffset={`${-1 * animationOffset.toFixed(2)}ms`}
        duration={`${duration.toFixed(2)}ms`}
        brightness={brightness.toFixed(2)}/>
    </ParallaxLayer>
  </g>
)
