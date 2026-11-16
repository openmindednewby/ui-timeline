export interface RowActionNone {
  none: string;
}

interface OpensItems<T> {
  onOpenItem: (item: T) => void;
  rowAction?: RowActionNone;
}

interface DeclaresNoOpen<T> {
  onOpenItem?: (item: T) => void;
  rowAction: RowActionNone;
}

export type TimelineRowAction<T> = OpensItems<T> | DeclaresNoOpen<T>;
