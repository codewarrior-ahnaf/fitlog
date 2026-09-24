import type { Exercise } from "@/lib/fitlog";

export type FitlogStorageState = {
  plan: Exercise[];
  saved: Exercise[];
  done: number[];
};

const STORAGE_KEY = "fitlog-state-v1";

export const emptyFitlogState: FitlogStorageState = {
  plan: [],
  saved: [],
  done: [],
};

export function readFitlogState(): FitlogStorageState {
  if (typeof window === "undefined") {
    return emptyFitlogState;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return emptyFitlogState;
    }

    const parsed = JSON.parse(raw) as Partial<FitlogStorageState>;

    return {
      plan: Array.isArray(parsed.plan) ? parsed.plan : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
      done: Array.isArray(parsed.done) ? parsed.done : [],
    };
  } catch {
    return emptyFitlogState;
  }
}

export function writeFitlogState(nextState: FitlogStorageState) {
  if (typeof window === "undefined") {
    return nextState;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  window.dispatchEvent(new CustomEvent("fitlog-state-change"));
  return nextState;
}

export function addExerciseToPlan(exercise: Exercise) {
  const current = readFitlogState();

  if (current.plan.some((item) => item.id === exercise.id)) {
    return current;
  }

  const next = {
    ...current,
    plan: [...current.plan, exercise],
  };

  return writeFitlogState(next);
}

export function addExerciseToSaved(exercise: Exercise) {
  const current = readFitlogState();

  if (current.saved.some((item) => item.id === exercise.id)) {
    return current;
  }

  const next = {
    ...current,
    saved: [...current.saved, exercise],
  };

  return writeFitlogState(next);
}

export function removeExerciseFromPlan(exerciseId: number) {
  const current = readFitlogState();
  const next = {
    ...current,
    plan: current.plan.filter((item) => item.id !== exerciseId),
  };

  return writeFitlogState(next);
}

export function removeExerciseFromSaved(exerciseId: number) {
  const current = readFitlogState();
  const next = {
    ...current,
    saved: current.saved.filter((item) => item.id !== exerciseId),
  };

  return writeFitlogState(next);
}

export function markExerciseDone(exerciseId: number) {
  const current = readFitlogState();
  const exists = current.done.includes(exerciseId);

  const next = {
    ...current,
    done: exists
      ? current.done.filter((id) => id !== exerciseId)
      : [...current.done, exerciseId],
  };

  return writeFitlogState(next);
}

export function totalMinutesFromExercises(exercises: Exercise[]) {
  return exercises.reduce((sum, exercise) => sum + exercise.duration, 0);
}

export function totalCaloriesFromExercises(exercises: Exercise[]) {
  return exercises.reduce((sum, exercise) => sum + exercise.caloriesBurned, 0);
}
