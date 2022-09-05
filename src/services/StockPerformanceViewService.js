function normaliseStockPerformance(data) {
  data.map(function (elem) {
    return {
      test: elem.country,
      launches: elem.launches + 10,
    };
  });
}
