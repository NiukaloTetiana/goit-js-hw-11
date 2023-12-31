import { Spinner } from 'spin.js';

const spinnerContainer = document.querySelector('.js-backdrop');

const opts = {
  lines: 17, // The number of lines to draw
  length: 25, // The length of each line
  width: 34, // The line thickness
  radius: 17, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1.2, // Rounds per second
  rotate: 46, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#972160', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

const spinner = new Spinner(opts);

export const spinnerPlay = () => {
  spinnerContainer.classList.remove('is-hidden');
  spinner.spin(spinnerContainer);
};

export const spinnerStop = () => {
  spinnerContainer.classList.add('is-hidden');
  spinner.stop(spinnerContainer);
};
