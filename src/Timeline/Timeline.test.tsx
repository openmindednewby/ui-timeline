import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { UiProvider } from '@dloizides/ui-feedback';
import type { UiTheme } from '@dloizides/ui-feedback';

import { Timeline } from './Timeline';
import { TimelineLayout } from './TimelineLayout';

const theme: UiTheme = {
  colors: { background: '#fff', surface: '#fff', surfaceElevated: '#f4f4f5', text: '#18181b', textSecondary: '#52525b', border: '#d4d4d8' },
  palette: { primary: { '500': '#2563eb' } },
  semantic: { error: { '500': '#dc2626' } },
};

const ITEMS = [
  { id: 'one', at: new Date(2026, 10, 2, 9, 0), title: 'First' },
  { id: 'two', at: new Date(2026, 10, 1, 9, 0), title: 'Second', meta: 'note' },
];

function renderTimeline(props: Partial<React.ComponentProps<typeof Timeline>> = {}): void {
  render(
    <UiProvider t={(key) => key} theme={theme}>
      <Timeline accessibilityLabel="history" items={ITEMS} {...props} />
    </UiProvider>,
  );
}

describe('Timeline', () => {
  it('with an onOpenItem and a press on an entry, opens that item', () => {
    const onOpenItem = jest.fn();
    renderTimeline({ onOpenItem, layout: TimelineLayout.Rail });

    fireEvent.click(screen.getByTestId('timeline-item-two'));

    expect(onOpenItem).toHaveBeenCalledWith(ITEMS[1]);
  });

  it('with an onOpenItem and Enter on a focused entry (keydown, keyup), opens that item once', () => {
    const onOpenItem = jest.fn();
    renderTimeline({ onOpenItem, layout: TimelineLayout.Day });
    const entry = screen.getByTestId('timeline-item-one');
    entry.focus();

    fireEvent.keyDown(entry, { key: 'Enter', code: 'Enter' });
    fireEvent.keyUp(entry, { key: 'Enter', code: 'Enter' });

    expect(onOpenItem.mock.calls).toEqual([[ITEMS[0]]]);
  });

  it('without onOpenItem, renders no entry as a button', () => {
    renderTimeline({ layout: TimelineLayout.Rail });

    const buttons = screen.queryAllByRole('button');

    expect(buttons).toHaveLength(0);
  });

  it('with the Day layout, groups entries under one group per day', () => {
    renderTimeline({ layout: TimelineLayout.Day });

    const days = [screen.queryByTestId('timeline-day-2026-11-02'), screen.queryByTestId('timeline-day-2026-11-01')];

    expect(days.every((day) => day !== null)).toBe(true);
  });

  it('with the Rail layout, draws a dot per entry and no day groups', () => {
    renderTimeline({ layout: TimelineLayout.Rail });

    const state = [screen.queryAllByTestId(/-dot$/).length, screen.queryAllByTestId(/^timeline-day-/).length];

    expect(state).toEqual([2, 0]);
  });

  it('with a renderItem slot, uses it for the entry body', () => {
    renderTimeline({ layout: TimelineLayout.Rail, renderItem: (item) => <span data-testid={`custom-${item.id}`} /> });

    const custom = screen.queryByTestId('custom-one');

    expect(custom).not.toBeNull();
  });

  it('with no items, renders the empty slot', () => {
    renderTimeline({ items: [], empty: <span data-testid="nothing" /> });

    const empty = screen.queryByTestId('nothing');

    expect(empty).not.toBeNull();
  });

  it('with injected day and time formatters, labels each rail entry with both', () => {
    renderTimeline({ layout: TimelineLayout.Rail, formatDay: () => 'D', formatTime: () => 'T', onOpenItem: jest.fn() });

    const entry = screen.getByTestId('timeline-item-one');

    expect(entry.getAttribute('aria-label')).toBe('First, D T');
  });
});
