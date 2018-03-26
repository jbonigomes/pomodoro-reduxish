define([], () => ({
  isPaused: () => !state.intervalID,
  isSession: () => state.name === 'Session',

  canSubtractTime: () => state.time > 0,

  canAddBreakLength: () => !state.intervalID && state.breakLength < 120,
  canSubtractBreakLength: () => !state.intervalID && state.breakLength > 1,

  canAddSessionLength: () => !state.intervalID && state.sessionLength < 120,
  canSubtractSessionLength: () => !state.intervalID && state.sessionLength > 1,
}));
