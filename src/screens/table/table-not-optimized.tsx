import { useState } from 'react';
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

export function TableNotOptimized() {
  const [data] = useState(() => makeData(5000));
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

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
            Table (Not Optimized)
          </Typography>
          <Typography variant="p">
            This table is not optimized. It will render all 5,000 rows when the
            page mounts, and it will re-render all of them again on every state
            change.
          </Typography>
          <Typography variant="p">
            Since rendering thousands of rows is expensive, it takes a long time
            to render initially and after updates, making the app unresponsive
            every time the user interacts with it.
          </Typography>
        </div>
      </LayoutSidebar>
      <LayoutMain hideOverflow>
        <div className="hidden md:block md:h-full md:overflow-y-auto relative">
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
          <div>
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
                {data.map(row => {
                  const selected = selectedRows.includes(row.id);
                  return (
                    <TableRow
                      key={row.id}
                      className={cn(selected && 'bg-blue-50 hover:bg-blue-50')}
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
