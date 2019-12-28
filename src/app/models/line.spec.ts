import { Line } from './Line';

describe('Testing LineClass', () => {
  it('New Line', () => {
    const line = new Line(6, 2, 1, 2);
    expect(line.x1).toEqual(1);
    expect(line.y1).toEqual(2);
    expect(line.x2).toEqual(6);
    expect(line.y2).toEqual(2);
  });
});
