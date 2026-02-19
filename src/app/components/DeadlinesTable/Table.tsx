"use client";
import { VoterRegistrationDeadlines } from "src/db/types";
import { css } from "styled-system/css";
import { RegistrationLink, SortableColumn, StateName } from "./shared";
import { Fragment, useState } from "react";

const TABLE_COLUMNS = 5;

const sortableHeaders: { key: SortableColumn; label: string }[] = [
  { key: "State", label: "State" },
  { key: "DeadlineInPerson", label: "Deadline In Person" },
  { key: "DeadlineByMail", label: "Deadline By Mail" },
  { key: "DeadlineOnline", label: "Deadline Online" },
];

const tableWrapperStyles = css({
  display: { base: 'none', md: 'block' },
  border: '1px solid',
  borderColor: 'gray.200',
  borderRadius: 'lg',
  overflow: 'hidden',
});

const tableStyles = css({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: '0',
  '& th, & td': {
    textAlign: 'left',
    padding: '3',
    borderBottom: '1px solid',
    borderColor: 'gray.200',
  },
  '& thead th': {
    backgroundColor: 'gray.50',
    fontWeight: '600',
    fontSize: 'sm',
    color: 'gray.600',
  },
  '& tbody tr:last-child td': {
    borderBottom: 'none',
  },
});

const sortableHeaderStyles = css({
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover span': {
    color: 'gray.900',
  },
});

const rowStyles = css({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'gray.50',
  },
});

const expandedRowStyles = css({
  '& td': {
    backgroundColor: 'gray.50',
    borderBottom: 'none',
  },
});

interface TableProps {
  deadlines: VoterRegistrationDeadlines[];
  search: string;
  handleSort: (column: SortableColumn) => void;
  sortIndicator: (column: SortableColumn) => React.ReactNode;
}

export default function Table({ deadlines, search, handleSort, sortIndicator }: TableProps) {
  const [expandedState, setExpandedState] = useState<string | null>(null);

  function toggleExpand(state: string) {
    setExpandedState(prev => prev === state ? null : state);
  }

  return (
    <div className={tableWrapperStyles}>
      <table className={tableStyles}>
        <thead>
          <tr>
            {sortableHeaders.map(({ key, label }) => (
              <th key={key} className={sortableHeaderStyles} onClick={() => handleSort(key)}>
                {label}{sortIndicator(key)}
              </th>
            ))}
            <th>Register Online</th>
          </tr>
        </thead>
        <tbody>
          {deadlines.length === 0 ? (
            <tr>
              <td colSpan={TABLE_COLUMNS} className={css({ textAlign: 'center', padding: '8', color: 'gray.400' })}>
                No states match &ldquo;{search}&rdquo;
              </td>
            </tr>
          ) : (
            deadlines.map((deadline) => {
              const isExpanded = expandedState === deadline.State;
              return (
                <Fragment key={deadline.State}>
                  <tr
                    className={rowStyles}
                    onClick={() => toggleExpand(deadline.State)}
                  >
                    <td>
                      <span className={css({ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle', marginRight: '1' })}>
                        <span className="material-symbols-outlined" style={{ fontSize: '18px', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          expand_more
                        </span>
                      </span>
                      <StateName deadline={deadline} />
                    </td>
                    <td>{deadline.DeadlineInPerson ?? "—"}</td>
                    <td>{deadline.DeadlineByMail ?? "—"}</td>
                    <td>{deadline.DeadlineOnline ?? "—"}</td>
                    <td><RegistrationLink url={deadline.OnlineRegistrationLink} /></td>
                  </tr>
                  {isExpanded && (
                    <tr className={expandedRowStyles}>
                      <td colSpan={TABLE_COLUMNS}>
                        <div className={css({ padding: '2', fontSize: 'sm', color: 'gray.600' })}>
                          {deadline.Description
                            ? deadline.Description
                            : <span className={css({ color: 'gray.400', fontStyle: 'italic' })}>No additional details available.</span>
                          }
                          {deadline.ElectionDayRegistration && (
                            <p className={css({ marginTop: '1', fontWeight: '500' })}>
                              Election Day Registration: {deadline.ElectionDayRegistration}
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}