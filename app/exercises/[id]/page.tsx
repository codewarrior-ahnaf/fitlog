import { notFound } from "next/navigation";
import ExerciseDetail from "@/app/components/exercises/ExerciseDetail";
import { getExerciseById, getExercises } from "@/lib/fitlog";

export async function generateStaticParams() {
  const exercises = await getExercises();

  return exercises.map((exercise) => ({
    id: String(exercise.id),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exercise = await getExerciseById(id).catch(() => null);

  if (!exercise) {
    return {
      title: "Exercise not found | FitLog",
    };
  }

  return {
    title: `${exercise.name} | FitLog`,
    description: exercise.description,
  };
}

export default async function ExercisePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const exercise = await getExerciseById(id).catch(() => null);

  if (!exercise) {
    notFound();
  }

  return <ExerciseDetail exercise={exercise} />;
}
