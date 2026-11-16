import { defaultFormatDay, defaultFormatTime } from './defaultFormats';

describe('defaultFormatDay', () => {
  it('with an invalid date, returns an empty string', () => {
    const date = new Date('nope');

    const label = defaultFormatDay(date);

    expect(label).toBe('');
  });

  it('with a valid date, returns a label holding the year', () => {
    const date = new Date(2026, 10, 2, 9, 0);

    const label = defaultFormatDay(date);

    expect(label).toContain('2026');
  });
});

describe('defaultFormatTime', () => {
  it('with an invalid date, returns an empty string', () => {
    const date = new Date('nope');

    const label = defaultFormatTime(date);

    expect(label).toBe('');
  });
});
