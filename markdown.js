const markdownFunction = (markdown) => {
  const boldIndexes = [];
  const italicIndexes = [];
  const monospacedIndexes = [];
  const preformattedIndexes = [];
  for (let i = 0; i < markdown.length; i++) {
    if (markdown[i] === '*' && markdown[i + 1] === '*') {
      boldIndexes.push(i);
      i++;
    } else if (
      markdown[i] === '_' &&
      (markdown[i + 1] === ' ' || markdown[i - 1] === ' ')
    ) {
      italicIndexes.push(i);
    } else if (
      markdown[i] === '`' &&
      markdown[i + 1] === '`' &&
      markdown[i + 2] === '`'
    ) {
      preformattedIndexes.push(i);
      i += 2;
    } else if (markdown[i] === '`') {
      monospacedIndexes.push(i);
    }
  }
  console.log(boldIndexes);
  console.log(italicIndexes);
  console.log(monospacedIndexes);
  console.log(preformattedIndexes);
};

markdownFunction('**```_H`ell`o_```**');
