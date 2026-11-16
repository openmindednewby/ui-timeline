# @dloizides/ui-timeline

Entries by time for the dloizides RN-web portals. One organism, two layouts: a rail with dots on a phone, entries grouped by day on a desktop. The layout follows the window width (`TIMELINE_BREAKPOINT` = ui-layout `LAYOUT_COLLAPSE_BREAKPOINT`, 768).

```tsx
import { Timeline } from '@dloizides/ui-timeline';
import { BadgeTone } from '@dloizides/ui-layout';

<Timeline
  accessibilityLabel={FM('customer.timeline')}
  openItemHint={FM('customer.timelineOpenHint')}
  items={[{ id: '1', at: '2026-11-02T09:00:00Z', title: 'Session started', meta: 'Web', tone: BadgeTone.Info }]}
  onOpenItem={(item) => openRecord(item.id)}
  empty={<EmptyState title={FM('customer.noHistory')} />}
/>
```

| Prop | Type | Notes |
|---|---|---|
| `items` | `TimelineItem[]` | `id`, `at` (Date, ISO string or ms), `title`, optional `meta`, `tone` (ui-layout `BadgeTone`) |
| `accessibilityLabel` | `string` | label of the list |
| `onOpenItem` | `(item) => void` | each entry becomes a pressable row: pointer, hover/pressed tint, focus ring, Enter (ROW-OPEN-1); required unless `rowAction={{ none: '<reason>' }}` |
| `rowAction` | `{ none: string }` | the named ROW-OPEN-1 exception, same shape as ui-tables `RowActionNone` |
| `renderItem` | `(item) => ReactNode` | slot replacing the default entry body |
| `layout` | `TimelineLayout` | `Auto` (default), `Rail`, `Day` |
| `breakpoint` | `number` | default 768 |
| `formatDay`, `formatTime` | `(date) => string` | default the viewer's locale; ui-tables `RelativeTime` is not used because it is itself a button and would nest inside the entry button; for relative labels wrap ui-tables `formatRelativeTime`: `(d) => formatRelativeTime(d, Date.now(), strings)` |
| `openItemHint` | `string` | accessibility hint on each entry |
| `empty` | `ReactNode` | shown when `items` is empty |
| `testID` | `string` | default `timeline`; entries `timeline-item-<id>`, days `timeline-day-<yyyy-mm-dd>` |

The package holds no text: every label comes in through props. Items are sorted newest first; an item whose `at` does not parse is kept, last.

Peers: `@dloizides/ui-layout >= 1.44.0`, `@dloizides/ui-buttons >= 1.23.0`, `@dloizides/ui-feedback >= 1.23.0`.

## Exports by layer (UI-ATOMIC-1)

| Layer | Export | Job |
|---|---|---|
| Atom | `RailDot` | dot in the entry's tone plus the rail line |
| Molecule | `EntryBody` | time line, title, meta (ui-layout `AppText`) |
| Molecule | `TimelineEntry` | one entry, pressable when it opens |
| Molecule | `DayGroup` | a day label column beside its entries |
| Organism | `Timeline` | the list, rail or day groups by width |
