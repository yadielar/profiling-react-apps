import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type SelectedBadgeProps = {
  count: number;
  onClear: () => void;
};

export function SelectedBadge({ count, onClear }: SelectedBadgeProps) {
  return (
    <Badge className="ml-2" variant="secondary">
      {count} selected
      <button
        className="ml-1 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        onClick={onClear}
      >
        <X className="h-3 w-3" />
        <span className="sr-only">Close</span>
      </button>
    </Badge>
  );
}
