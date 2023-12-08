import { useRef, useState } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '@/lib/utils';
import { Layout, LayoutMain, LayoutSidebar } from '@/components/core/layout';
import { Typography } from '@/components/ui/typography';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { makeData } from './utils';
import { SelectedBadge } from './components';

export function TableOptimizedWithVirtualization() {
  // Since we're virtualizing the list of rows, we can use any large number
  const [data] = useState(() => makeData(50_000));
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 53,
    overscan: 20,
  });

  function handleSelectRow(id: number) {
    setSelectedRows(prev => {
      const prevSelected = prev.includes(id);
      if (prevSelected) {
        return prev.filter(prevId => prevId !== id);
      } else {
        return [...prev, id];
      }
    });
  }

  function clearSelectedRows() {
    setSelectedRows([]);
  }

  return (
    <Layout>
      <LayoutSidebar>
        <div className="p-4">
          <Typography variant="h4" component="h1">
            Table (Optimized with Virtualization)
          </Typography>
          <Typography variant="p">
            This table is optimized using virtualization. It will only render
            the rows that are visible in the viewport.
          </Typography>
          <Typography variant="p">
            Since it only renders the rows that are visible and and it will only
            re-render them when they scroll into view, it can render thousands
            of rows without any performance issues.
          </Typography>
        </div>
      </LayoutSidebar>
      <LayoutMain hideOverflow>
        <div
          className="hidden md:block md:h-full md:overflow-y-auto relative"
          ref={parentRef}
        >
          <div
            className={
              selectedRows.length > 0
                ? 'fixed top-4 left-1/2 translate-x-1/2 w-32'
                : 'hidden'
            }
          >
            <SelectedBadge
              count={selectedRows.length}
              onClear={clearSelectedRows}
            />
          </div>
          <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Visits</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Profile Progress</TableHead>
                  <TableHead>Created At</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {virtualizer.getVirtualItems().map((virtualRow, index) => {
                  const row = data[virtualRow.index];
                  const selected = selectedRows.includes(row.id);
                  return (
                    <TableRow
                      key={row.id}
                      className={cn(selected && 'bg-blue-50 hover:bg-blue-50')}
                      style={{
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${
                          virtualRow.start - index * virtualRow.size
                        }px)`,
                      }}
                      onClick={() => handleSelectRow(row.id)}
                    >
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.firstName}</TableCell>
                      <TableCell>{row.lastName}</TableCell>
                      <TableCell>{row.age}</TableCell>
                      <TableCell>{row.visits}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.progress}</TableCell>
                      <TableCell>{row.createdAt.toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="md:hidden p-4">
          <Typography>
            This example is not available on mobile devices.
          </Typography>
        </div>
      </LayoutMain>
    </Layout>
  );
}
