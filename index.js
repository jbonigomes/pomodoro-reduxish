requirejs(['app/handlers', 'app/helpers', 'app/rules'], (handlers, helpers, rules) => {
  window.state = {
    time: 25 * 60,
    breakLength: 5,
    sessionLength: 25,

    intervalID: null,

    name: 'Session', // 'Break!'
  };

  const render = () => {
    document.querySelector('.title').innerHTML = state.name;
    document.querySelector('.b-len').innerHTML = state.breakLength;
    document.querySelector('.s-len').innerHTML = state.sessionLength;
    document.querySelector('.timer').innerHTML = helpers.formatTime(state.time);

    if (rules.isSession()) {
      const perc = helpers.formatPercentage(state.time, state.sessionLength);

      document.querySelector('.cover').style.height = perc;
      document.querySelector('.background').classList.add('green');
      document.querySelector('.background').classList.remove('red');
    }
    else {
      const perc = helpers.formatPercentage(state.time, state.breakLength);

      document.querySelector('.cover').style.height = perc;
      document.querySelector('.background').classList.add('red');
      document.querySelector('.background').classList.remove('green');
    }
  };

  document.addEventListener('click', (e) => {
    const classToAction = {
      'toggle-paused': () => handlers.togglePaused(render),
      'add-break-length': () => handlers.addBreakLength(),
      'add-session-length': () => handlers.addSessionLength(),
      'subtract-break-length': () => handlers.subtractBreakLength(),
      'subtract-session-length': () => handlers.subtractSessionLength(),
    };

    if (classToAction[e.target.className]) {
      classToAction[e.target.className]();
      render();
    }
  });

  render();
});
