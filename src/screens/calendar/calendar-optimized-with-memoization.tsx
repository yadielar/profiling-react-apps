import { useState } from 'react';
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

  function handleToggleSelectedEvent(eventId: string, checked: boolean) {
    if (checked) {
      setSelectedEventIds([...selectedEventIds, eventId]);
    } else {
      setSelectedEventIds(
        selectedEventIds.filter(selectedEventId => selectedEventId !== eventId)
      );
    }
  }

  return (
    <Layout>
      <LayoutSidebar>
        <div className="p-4">
          <Typography variant="h4" component="h1">
            Calendar (Optimized using Memoization)
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

function EventCard({
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
}
