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

export function writeFitlogState(nextState: FitlogStorageState): FitlogStorageState {
  if (typeof window === "undefined") {
    return nextState;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  } catch {
    // Local storage quota or security error
  }
  window.dispatchEvent(new CustomEvent("fitlog-state-change"));
  return nextState;
}

export function addExerciseToPlan(exercise: Exercise): { ok: boolean; reason?: "limit_reached" | "already_in_plan" } {
  const current = readFitlogState();

  if (current.plan.some((item) => item.id === exercise.id)) {
    return { ok: false, reason: "already_in_plan" };
  }

  if (current.plan.length >= 5) {
    return { ok: false, reason: "limit_reached" };
  }

  const next = {
    ...current,
    plan: [...current.plan, exercise],
  };

  writeFitlogState(next);
  return { ok: true };
}

export function addExerciseToSaved(exercise: Exercise): { ok: boolean; reason?: "already_in_saved" } {
  const current = readFitlogState();

  if (current.saved.some((item) => item.id === exercise.id)) {
    return { ok: false, reason: "already_in_saved" };
  }

  const next = {
    ...current,
    saved: [...current.saved, exercise],
  };

  writeFitlogState(next);
  return { ok: true };
}

export function removeExerciseFromPlan(exerciseId: number): FitlogStorageState {
  const current = readFitlogState();
  const next = {
    ...current,
    plan: current.plan.filter((item) => item.id !== exerciseId),
    done: current.done.filter((id) => id !== exerciseId),
  };

  return writeFitlogState(next);
}

export function removeExerciseFromSaved(exerciseId: number): FitlogStorageState {
  const current = readFitlogState();
  const next = {
    ...current,
    saved: current.saved.filter((item) => item.id !== exerciseId),
  };

  return writeFitlogState(next);
}

export function markExerciseDone(exerciseId: number): { isDone: boolean; state: FitlogStorageState } {
  const current = readFitlogState();
  const exists = current.done.includes(exerciseId);

  const next = {
    ...current,
    done: exists
      ? current.done.filter((id) => id !== exerciseId)
      : [...current.done, exerciseId],
  };

  const written = writeFitlogState(next);
  return { isDone: !exists, state: written };
}

export function totalMinutesFromExercises(exercises: Exercise[]): number {
  return exercises.reduce((sum, exercise) => sum + (exercise.duration || 0), 0);
}

export function totalCaloriesFromExercises(exercises: Exercise[]): number {
  return exercises.reduce((sum, exercise) => sum + (exercise.caloriesBurned || 0), 0);
}
