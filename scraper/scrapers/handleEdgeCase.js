const handleEdgeCase = (title) => {
  if (title === 'One-Punch Man') return 'Onepunch-Man';
  if (title === 'Attack on Titan') return 'Shingeki no Kyojin';
  return title;
};

module.exports = {
  handleEdgeCase,
};
