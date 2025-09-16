enum SessionType {
  Work = "work",
  Break = "break",
}
type Session = {
  id: number;
  step: number;
  total_seconds: number;
  type: SessionType;
};

const dummySession: Session = {
  id: 1234,
  step: 1,
  total_seconds: 10 * 60,
  type: SessionType.Break,
};

function getCurrentSession(): Session {
  return dummySession;
}

function setSession({
  step,
  seconds,
  type,
}: {
  step: number;
  seconds: number;
  type: SessionType;
}): Session {
  return {
    id: 1234,
    step,
    total_seconds: seconds,
    type,
  };
}

function getSession(id: number): Session {
  return dummySession;
}

export { getCurrentSession, getSession, SessionType, setSession };
export type { Session };

