define(['app/helpers', 'app/rules'], (helpers, rules) => ({
  addSessionLength: () => {
    if (rules.canAddSessionLength()) {
      state.sessionLength++;
      state.time = rules.isSession() ? state.sessionLength * 60 : state.time;
    }
  },

  subtractSessionLength: () => {
    if (rules.canSubtractSessionLength()) {
      state.sessionLength--;
      state.time = rules.isSession() ? state.sessionLength * 60 : state.time;
    }
  },

  addBreakLength: () => {
    if (rules.canAddBreakLength()) {
      state.breakLength++;
      state.time = !rules.isSession() ? state.breakLength * 60 : state.time;
    }
  },

  subtractBreakLength: () => {
    if (rules.canSubtractBreakLength()) {
      state.breakLength--;
      state.time = !rules.isSession() ? state.breakLength * 60 : state.time;
    }
  },

  togglePaused: (render) => {
    if (!rules.isPaused()) {
      clearInterval(state.intervalID);
      state.intervalID = null;
    }
    else {
      state.intervalID = setInterval(() => {
        if (rules.canSubtractTime()) {
          state.time--;
        }
        else {
          helpers.playSound();
          state.name = rules.isSession() ? 'Break!' : 'Session';
          state.time = (rules.isSession() ? state.sessionLength : state.breakLength) * 60;
        }

        render();
      }, 1000);
    }
  },
}));
