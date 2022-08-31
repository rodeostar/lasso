const margin = { top: 10, right: 30, bottom: 30, left: 40 };
const width = 460 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

const defaults = { margin, width, height };

type Args = {
  margin: { top: number; right: number; bottom: number; left: number };
  width: number;
  height: number;
};

class Range {
  min: number;
  max: number;
  vals: number[];
  ceil: number;
  constructor(vals: number[], ceil: number) {
    this.vals = vals;
    const [min, max] = extent(vals);
    this.min = min;
    this.max = max;
    this.ceil = ceil;
  }

  get scale() {
    // 10 prices, $1,$2,$3,etc
    const len = this.vals.length;

    // ceil = 300, 300 / 10 -> 30
    const bins = this.ceil / len;

    return this.vals.map((value, index) => {
      const position = index * bins;
      return [position, value];
    });
  }
}

const extent = (vals: number[]): [number, number] => {
  let min: number, max: number;
  for (const val of vals) {
    if (val < min) min = val;
    if (val > max) max = val;
  }
  return [min, max];
};

function getPoints(rangeA: Range, rangeB: Range) {
  return rangeA.scale.map((a, index) => [a[0], rangeB.scale[index][0]]);
}

export function computeBarChart<T>(
  data: T[],
  [xMap, yMap]: ((item: T) => number)[],
  { margin, width, height }: Args = defaults
) {
  if (!data) return null;

  const xVals = data.map(xMap);
  const yVals = data.map(yMap);

  /** Calculate x-axis range */
  const xAxis = new Range(xVals, width);
  const yAxis = new Range(yVals, height);

  return {
    margin,
    width,
    height,
    plot: getPoints(xAxis, yAxis),
  };
}
