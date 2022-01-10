export function parseTrainers(trainers) {
  return trainers.map(parseTrainer);
}

export function parseTrainer({ id, name }) {
  return {
    id,
    name
  };
}
