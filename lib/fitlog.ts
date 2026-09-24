export type Exercise = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

const API_BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getExercises(): Promise<Exercise[]> {
  const response = await fetch(API_BASE_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load exercises");
  }

  return response.json();
}

export async function getExerciseById(id: string): Promise<Exercise> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load exercise ${id}`);
  }

  return response.json();
}
