import { Figure } from './Figure';

export class Line extends Figure {
  public x1: number;
  public y1: number;
  public x2: number;
  public y2: number;

  constructor(
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) {
    super(x1, y1, x2, y2);
  }
}
