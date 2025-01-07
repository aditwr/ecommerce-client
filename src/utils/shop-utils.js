export const setFiltersToQuery = (query, filtersParams) => {
  Object.keys(filtersParams).forEach((key) => {
    if (typeof key === Array) {
      filtersParams[key].forEach((value) => {
        if (query.has(key)) {
          query.set(key, `${query.get(key)}, ${value}`);
        } else {
          query.set(key, value);
        }
      });
    } else {
      query.set(key, filtersParams[key]);
    }
  });

  return query;
};
