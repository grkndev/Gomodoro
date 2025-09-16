import { Session, SessionType } from "./useSession";

type Pomodoro = {
  title: string;
  id: number;
  current_session: number;
  total_session: number;
  sessions: Session[];
};

const dummyPomodoro: Pomodoro = {
  title: "Pomodoro #1",
  id: 123456789,
  current_session: 1,
  total_session: 4,
  sessions: [
    {
      id: 1234,
      step: 1,
      total_seconds: 25 * 60,
      type: SessionType.Work,
    },
    {
      id: 5678,
      step: 2,
      total_seconds: 10 * 60,
      type: SessionType.Break,
    },
    {
      id: 9012,
      step: 3,
      total_seconds: 25 * 60,
      type: SessionType.Work,
    },
  ],
};
function getPomodoro(id: number): Pomodoro {
  return dummyPomodoro;
}
function createPomodoro() {}
function currentPomodoro() {
  return dummyPomodoro;
}

export { createPomodoro, currentPomodoro, getPomodoro };
export type { Pomodoro };

