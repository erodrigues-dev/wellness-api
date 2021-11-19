export function getPaginateOptions(page: number, limit: number) {
  if (page && limit) {
    return {
      limit,
      offset: (page - 1) * limit
    };
  }

  return {};
}
