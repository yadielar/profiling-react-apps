import { create } from 'zustand';
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

// We're using Zustand to create a store that will hold the selected events.
const useCalendarStore = create(() => ({
  selectedEventIds: [] as string[],
}));

// We're creating a function that will be used to toggle the selected events.
// Since it's created outside of any component, it's reference is stable.
const toggleSelectedEvent = (eventId: string, checked: boolean) => {
  useCalendarStore.setState(state => {
    if (checked) {
      return {
        selectedEventIds: [...state.selectedEventIds, eventId],
      };
    } else {
      return {
        selectedEventIds: state.selectedEventIds.filter(
          selectedEventId => selectedEventId !== eventId
        ),
      };
    }
  });
};

export function CalendarOptimizedWithStore() {
  return (
    <Layout>
      <LayoutSidebar>
        <div className="p-4">
          <Typography variant="h4" component="h1">
            Calendar (Optimized using a Store)
          </Typography>
          <Typography variant="p">
            This calendar is optimized using a Zustand store. The store holds
            the selection state, and by using a selector to subscribe for state
            changes inside the <em>EventCard</em>, we can optimize the component
            so that only the selected cards re-render.
          </Typography>
          <Typography variant="p">
            Since only the affected card re-renders, neither{' '}
            <em>CalendarRow</em> nor <em>Day</em>, nor any other components
            re-render.
          </Typography>
        </div>
      </LayoutSidebar>
      <LayoutMain>
        <CalendarRoot>
          {calendarData.weeks.map((week, weekIndex) => (
            <CalendarRow key={weekIndex}>
              {week.map(day => (
                <Day key={day.dayFormatted} events={day.events} />
              ))}
            </CalendarRow>
          ))}
        </CalendarRoot>
      </LayoutMain>
    </Layout>
  );
}

function Day({ events }: { events: CalendarEvent[] }) {
  return (
    <CalendarCell>
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </CalendarCell>
  );
}

function EventCard({ event }: { event: CalendarEvent }) {
  // We're using Zustand's hook with a selector to get the relevant state for
  // this component. Zustand will only trigger a re-render of this component if
  // the value returned from the selector changes.
  const isSelected = useCalendarStore(state =>
    state.selectedEventIds.includes(event.id)
  );

  return (
    <CalendarCard isSelected={isSelected}>
      <Checkbox
        onCheckedChange={checked =>
          toggleSelectedEvent(event.id, checked === true)
        }
        checked={isSelected}
      />
    </CalendarCard>
  );
}
