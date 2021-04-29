interface FilterFunctionParameter {
  data: Deal[]
  query: string
  filterNonValid?: boolean
}

export function filterData({ data, query, filterNonValid = false }: FilterFunctionParameter) {
  return data.filter((deal) => {
    const currentDay = new Date().getDay();
    const validFrom = deal.validFrom ?? 0;
    if (filterNonValid && currentDay <= validFrom) {
      return null;
    }
    return (
      (
        deal.name.toLowerCase().includes(query ?? '')
        || deal.description?.toLowerCase().includes(query ?? '')
      )
    );
  });
}
