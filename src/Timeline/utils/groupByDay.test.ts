import { groupByDay, sortNewestFirst } from './groupByDay';

describe('sortNewestFirst', () => {
  it('with mixed times, returns the newest first', () => {
    const items = [
      { id: 'a', at: new Date(2026, 10, 1, 9, 0).toISOString(), title: 'A' },
      { id: 'b', at: new Date(2026, 10, 3, 9, 0).getTime(), title: 'B' },
      { id: 'c', at: new Date(2026, 10, 2, 9, 0), title: 'C' },
    ];

    const sorted = sortNewestFirst(items);

    expect(sorted.map((item) => item.id)).toEqual(['b', 'c', 'a']);
  });

  it('with an unparseable time, keeps the item and puts it last', () => {
    const items = [
      { id: 'bad', at: 'not a date', title: 'Bad' },
      { id: 'good', at: new Date(2026, 10, 1, 9, 0), title: 'Good' },
    ];

    const sorted = sortNewestFirst(items);

    expect(sorted.map((item) => item.id)).toEqual(['good', 'bad']);
  });
});

describe('groupByDay', () => {
  it('with two items on one day and one on another, returns two groups newest day first', () => {
    const items = [
      { id: 'early', at: new Date(2026, 10, 2, 8, 0), title: 'Early' },
      { id: 'other', at: new Date(2026, 10, 1, 23, 59), title: 'Other' },
      { id: 'late', at: new Date(2026, 10, 2, 18, 30), title: 'Late' },
    ];

    const groups = groupByDay(items);

    expect(groups.map((group) => [group.key, group.items.map((item) => item.id)])).toEqual([
      ['2026-11-02', ['late', 'early']],
      ['2026-11-01', ['other']],
    ]);
  });

  it('with no items, returns no groups', () => {
    const items: { id: string; at: Date; title: string }[] = [];

    const groups = groupByDay(items);

    expect(groups).toEqual([]);
  });

  it('with an unparseable time, groups it under the invalid key', () => {
    const items = [{ id: 'bad', at: 'nope', title: 'Bad' }];

    const groups = groupByDay(items);

    expect(groups.map((group) => group.key)).toEqual(['invalid']);
  });
});
