function getTaken(start) {
  return Number(
    Date.now() - start < 1e3
      ? `0.${Date.now() - start}`
      : `${Math.round((Date.now() - start) / 1e3)}.${Date.now() - start}`
  ).toFixed(1);
}

module.exports = getTaken;
