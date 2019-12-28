export  class Figure {
  protected x1: number;
  protected y1: number;
  protected x2: number;
  protected y2: number;

  constructor(x1: number, y1: number, x2: number, y2: number) {
    [this.x1, this.x2] = Figure.orderCoordinates(x1, x2);
    [this.y1, this.y2] = Figure.orderCoordinates(y1, y2);
  }

  private static orderCoordinates(c1, c2) {
    if (c2 < c1) {
      const temp = c2;
      c2 = c1;
      c1 = temp;
    }

    return [ c1, c2 ];
  }

}
