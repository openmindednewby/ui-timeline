import { TimelineLayout } from '../TimelineLayout';
import { resolveTimelineLayout } from './resolveTimelineLayout';

const BREAKPOINT = 768;

describe('resolveTimelineLayout', () => {
  it('with Auto below the breakpoint, returns Rail', () => {
    const width = 360;

    const layout = resolveTimelineLayout(TimelineLayout.Auto, width, BREAKPOINT);

    expect(layout).toBe(TimelineLayout.Rail);
  });

  it('with Auto at the breakpoint, returns Day', () => {
    const width = 768;

    const layout = resolveTimelineLayout(TimelineLayout.Auto, width, BREAKPOINT);

    expect(layout).toBe(TimelineLayout.Day);
  });

  it('with Rail on a wide screen, returns Rail', () => {
    const width = 1280;

    const layout = resolveTimelineLayout(TimelineLayout.Rail, width, BREAKPOINT);

    expect(layout).toBe(TimelineLayout.Rail);
  });

  it('with Day on a phone, returns Day', () => {
    const width = 360;

    const layout = resolveTimelineLayout(TimelineLayout.Day, width, BREAKPOINT);

    expect(layout).toBe(TimelineLayout.Day);
  });
});
