export function filterData(data: Deal[], filter: string) {
  return data.filter((deal) => {
    const currentDay = new Date().getDay();
    const validFrom = deal.validFrom ?? 0;
    return (
      (
        deal.name.toLowerCase().includes(filter ?? '')
        || deal.description?.toLowerCase().includes(filter ?? '')
      )
    );
  });
}
