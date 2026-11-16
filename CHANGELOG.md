# Changelog

## 0.1.0

- `Timeline` organism (MODC-1 "Module C unified console", AC-UI-6): a rail with dots below 768 px, entries grouped by day from 768 px, chosen by window width; `renderItem` slot; `onOpenItem` makes each entry a pressable row (ROW-OPEN-1).
- Parts: `RailDot` (atom), `EntryBody`, `TimelineEntry`, `DayGroup` (molecules); `onOpenItem` required unless `rowAction={{ none }}`; helpers `groupByDay`, `sortNewestFirst`, `resolveTimelineLayout`.
