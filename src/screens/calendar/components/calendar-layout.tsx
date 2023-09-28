import React from 'react';

function CalendarRoot({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full p-4">
      <table className="table-fixed w-full h-96 md:h-full">
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function CalendarRow({ children }: { children: React.ReactNode }) {
  return <tr>{children}</tr>;
}

function CalendarCell({ children }: { children: React.ReactNode }) {
  return (
    <td className="border border-gray-200 relative">
      <div className="flex flex-col place-content-center p-4 absolute inset-0">
        {children}
      </div>
    </td>
  );
}

function CalendarCard({
  children,
  isSelected,
}: {
  children: React.ReactNode;
  isSelected: boolean;
}) {
  return (
    <div
      className={`flex-1 p-2 rounded-lg border border-blue-200 bg-blue-50 ${
        isSelected ? 'border-blue-500' : ''
      }`}
    >
      {children}
    </div>
  );
}

export { CalendarRoot, CalendarRow, CalendarCell, CalendarCard };
