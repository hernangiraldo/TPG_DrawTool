import { Rectangle } from './Rectangle';


describe('Testing RectangleClass', () => {
  it('New Rectangle', () => {
    const line = new Rectangle(20, 1, 16, 3);
    expect(line.x1).toEqual(16);
    expect(line.y1).toEqual(1);
    expect(line.x2).toEqual(20);
    expect(line.y2).toEqual(3);
  });
});
