import React, {
  type ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

export type Timer = {
  name: string;
  duration: number;
};

type TimersState = {
  isRunning: boolean;
  timers: Timer[];
};

const initialState: TimersState = {
  isRunning: true,
  timers: [],
};

// different components can access to theses values & methods
type TimersContextValue = TimersState & {
  addTimer: (timerData: Timer) => void;
  startTimers: () => void;
  stopTimers: () => void;
};

// needs 1 initial value to manage
const TimersContext = createContext<TimersContextValue | null>(null);

export function useTimersContext() {
  const timersCtx = useContext(TimersContext);
  if (timersCtx === null) {
    throw new Error("Timers CTX is null - should be not the case!");
  }
  return timersCtx;
}

type TimersContextProvider = {
  children: ReactNode;
};

// Discriminated union
type StartTimersAction = {
  type: "START_TIMERS";
};

type StopTimersAction = {
  type: "STOP_TIMERS";
};
type AddTimersAction = {
  type: "ADD_TIMER";
  payload: Timer;
};

type Action = StartTimersAction | StopTimersAction | AddTimersAction;

function timersReducer(state: TimersState, action: Action): TimersState {
  if (action.type === "START_TIMERS") {
    // don't manipulate data diretly
    return {
      ...state,
      isRunning: true,
    };
  }

  if (action.type === "STOP_TIMERS") {
    // don't manipulate data diretly
    return {
      ...state,
      isRunning: false,
    };
  }

  if (action.type === "ADD_TIMER") {
    // don't manipulate data diretly
    return {
      ...state,
      timers: [
        ...state.timers,
        {
          name: action.payload.name,
          duration: action.payload.duration,
        },
      ],
    };
  }

  return state;
}

export default function TimersContextProvider({
  children,
}: TimersContextProvider) {
  // dispatch fn allows us to trigger state change
  const [timersState, dispatch] = useReducer(timersReducer, initialState);

  const ctx: TimersContextValue = {
    timers: timersState.timers,
    isRunning: timersState.isRunning,
    addTimer(timerData) {
      dispatch({ type: "ADD_TIMER", payload: timerData });
    },
    startTimers() {
      dispatch({ type: "START_TIMERS" });
    },
    stopTimers() {
      dispatch({ type: "STOP_TIMERS" });
    },
  };

  return (
    <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>
  );
}
