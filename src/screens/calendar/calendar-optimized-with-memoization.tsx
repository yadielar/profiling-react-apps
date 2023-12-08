import { memo, useCallback, useState } from 'react';
import { Typography } from '@/components/ui/typography';
import { Checkbox } from '@/components/ui/checkbox';
import { Layout, LayoutMain, LayoutSidebar } from '@/components/core/layout';
import { CalendarEvent } from '@/types/calendar';
import { calendarData } from '@/data/calendar';
import {
  CalendarCard,
  CalendarCell,
  CalendarRoot,
  CalendarRow,
} from './components';

export function CalendarOptimizedWithMemoization() {
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);

  // We're doing two things that will help us optimize re-renders:
  // 1. We're using the `useCallback` hook to memoize the function reference.
  //    This will help us optimize the `EventCard` component because it will
  //    receive the same function reference on every render.
  // 2. We're using the updater function form of setState. This avoids the need
  //    to include `selectedEventIds` in the dependency array of `useCallback`,
  //    which would cause the function reference to change.
  const handleToggleSelectedEvent = useCallback(
    (eventId: string, checked: boolean) => {
      if (checked) {
        setSelectedEventIds(prevSelectedEventIds => [
          ...prevSelectedEventIds,
          eventId,
        ]);
      } else {
        setSelectedEventIds(prevSelectedEventIds =>
          prevSelectedEventIds.filter(
            selectedEventId => selectedEventId !== eventId
          )
        );
      }
    },
    []
  );

  return (
    <Layout>
      <LayoutSidebar>
        <div className="p-4">
          <Typography variant="h4" component="h1">
            Calendar (Optimized using Memoization)
          </Typography>
          <Typography variant="p">
            This calendar is optimized using memoization tools such as{' '}
            <Typography variant="code">memo</Typography> and{' '}
            <Typography variant="code">useCallback</Typography>. By memoizing
            the <em>EventCard</em> component, only the card that was selected
            re-renders.
          </Typography>
          <Typography variant="p">
            However, there's no easy way to memoize the <em>CalendarRow</em> and{' '}
            <em>Day</em> components, so they all still re-render.
          </Typography>
        </div>
      </LayoutSidebar>
      <LayoutMain>
        <CalendarRoot>
          {calendarData.weeks.map((week, weekIndex) => (
            <CalendarRow key={weekIndex}>
              {week.map(day => (
                <Day
                  key={day.dayFormatted}
                  events={day.events}
                  selectedEventIds={selectedEventIds}
                  onToggleSelectedEvent={handleToggleSelectedEvent}
                />
              ))}
            </CalendarRow>
          ))}
        </CalendarRoot>
      </LayoutMain>
    </Layout>
  );
}

function Day({
  events,
  selectedEventIds,
  onToggleSelectedEvent,
}: {
  events: CalendarEvent[];
  selectedEventIds: string[];
  onToggleSelectedEvent: (eventId: string, checked: boolean) => void;
}) {
  return (
    <CalendarCell>
      {events.map(event => (
        <EventCard
          key={event.id}
          event={event}
          isSelected={selectedEventIds.includes(event.id)}
          onToggleSelected={onToggleSelectedEvent}
        />
      ))}
    </CalendarCell>
  );
}

// We memoize the component so that it only re-renders when its props change.
// We will see a performance improvement here when calendar events are selected
// because the `event` and `isSelected` props will only change for the events
// that were toggled, and the `onToggleSelected` prop is stable.
const EventCard = memo(function EventCard({
  event,
  isSelected,
  onToggleSelected,
}: {
  event: CalendarEvent;
  isSelected: boolean;
  onToggleSelected: (eventId: string, checked: boolean) => void;
}) {
  return (
    <CalendarCard isSelected={isSelected}>
      <Checkbox
        onCheckedChange={checked =>
          onToggleSelected(event.id, checked === true)
        }
        checked={isSelected}
      />
    </CalendarCard>
  );
});
