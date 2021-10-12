/**
 *
 * @param {string} txt - The contents of the csv file
 * @returns {Array<Object>}
 */
export function parseCSV(csvRowContent: string): Array<Object> {
  const csvContent: string = csvRowContent.endsWith('\n')
    ? csvRowContent.substring(0, csvRowContent.length - 1)
    : csvRowContent;
  const rows = csvContent.split('\n');

  const columns = rows[0]
    .split(',')
    .map(
      (column, index, arr) =>
        (index === arr.length - 1 &&
          column.includes('\r') &&
          column.slice(0, column.length - 1)) ||
        column,
    );
  const values = [];
  if (Array.isArray(rows) && rows.length) {
    for (let i = 1; i < rows.length; i += 1) {
      const row = {};
      for (let j = 0; j < columns.length; j += 1) {
        const rowValues = rows[i]
          .split(',')
          .map(
            (value, index, arr) =>
              (index === arr.length - 1 &&
                value.includes('\r') &&
                value.slice(0, value.length - 1)) ||
              value,
          );
        if (columns[j] === 'tags' || columns[j] === 'data') {
          row[columns[j]] = (rowValues[j].split(' ') || []).map((value) =>
            Number(value) || Number(value) === 0 ? Number(value) : value,
          );
        } else row[columns[j]] = rowValues[j];
      }
      values.push(row);
    }
  }
  return values;
}
