import { Line } from './Line';
import { Rectangle } from './Rectangle';
import { Fill } from './Fill';

export class Canvas {
  // tslint:disable:variable-name
  private _canvas: Array<Array<string>>;

  constructor(
    private _width: number,
    private _height: number
  ) {
    const w = _width + 2;
    const y = _height + 2;
    this._canvas = [];

    for (let i = 0; i < y ; i++) {
      this._canvas[i] = [];
      for (let j = 0; j < w; j++) {
        if (i === 0 || i === (y - 1)) {
          this._canvas[i][j] = '-';
        } else if ((j === 0 && j % (w - 1) === 0) || (j === (w - 1) && j % (w - 1) === 0)) {
          this._canvas[i][j] = '|';
        } else {
          this._canvas[i][j] = ' ';
        }
      }
    }
  }

  get width(): number {
    return this._width;
  }

  get height(): number {
    return this._height;
  }

  get canvas() {
    return this._canvas;
  }

  public drawLine(line: Line) {
    for (let i = line.y1; i <= line.y2 ; i++) {
      for (let j = line.x1; j <= line.x2 ; j++) {
        this._canvas[i][j] = 'x';
      }
    }
  }

  public drawRectangle(rectangle: Rectangle) {
    for (let i = rectangle.y1; i <= rectangle.y2 ; i++) {
      for (let j = rectangle.x1; j <= rectangle.x2 ; j++) {
        if (i === rectangle.y1 || i === rectangle.y2 || j === rectangle.x1 || j === rectangle.x2) {
          this._canvas[i][j] = 'x';
        } else {
          this._canvas[i][j] = ' ';
        }
      }
    }
  }

  public fillCanvas(fill: Fill) {
    if (this._canvas[fill.y][fill.x] !== ' ') {
      return;
    }

    this._canvas[fill.y][fill.x] = fill.color;
    this.fillCanvas(new Fill(fill.x + 1, fill.y, fill.color));
    this.fillCanvas(new Fill(fill.x - 1, fill.y, fill.color));
    this.fillCanvas(new Fill(fill.x, fill.y + 1, fill.color));
    this.fillCanvas(new Fill(fill.x, fill.y - 1, fill.color));
  }

  public emptyCanvas() {
    this._height = 0;
    this._width = 0;
    this._canvas = null;
  }

}
