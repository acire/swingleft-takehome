"use client";
import { VoterRegistrationDeadlines } from "src/db/types";
import { css } from "styled-system/css";
import { formatDate, RegistrationLink, SortableColumn, StateName } from "./shared";
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
  '& tbody:last-child tr:last-child td': {
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

const rowGroupStyles = css({
  cursor: 'pointer',
  '&:hover td': {
    backgroundColor: 'gray.50',
  },
});

const expandedRowStyles = css({
  '& td': {
    paddingTop: '0',
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
        {deadlines.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={TABLE_COLUMNS} className={css({ textAlign: 'center', padding: '8', color: 'gray.400' })}>
                No states match &ldquo;{search}&rdquo;
              </td>
            </tr>
          </tbody>
        ) : (
          deadlines.map((deadline) => {
            const isExpanded = expandedState === deadline.State;
            return (
              <tbody
                key={deadline.State}
                className={rowGroupStyles}
                onClick={() => toggleExpand(deadline.State)}
              >
                <tr className={isExpanded ? css({ '& td': { borderBottom: 'none' } }) : ''}>
                  <td>
                    <span className={css({ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle', marginRight: '1' })}>
                      <span className="material-symbols-outlined" style={{ fontSize: '18px', transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        expand_more
                      </span>
                    </span>
                    <StateName deadline={deadline} />
                  </td>
                  <td>{deadline.DeadlineInPerson ? formatDate(deadline.DeadlineInPerson) : "—"}</td>
                  <td>{deadline.DeadlineByMail ? formatDate(deadline.DeadlineByMail) : "—"}</td>
                  <td>{deadline.DeadlineOnline ? formatDate(deadline.DeadlineOnline) : "—"}</td>
                  <td><RegistrationLink url={deadline.OnlineRegistrationLink} /></td>
                </tr>
                {isExpanded && (
                  <tr className={expandedRowStyles}>
                    <td colSpan={TABLE_COLUMNS}>
                      <div className={css({
                        marginLeft: '5',
                        paddingLeft: '1',
                        paddingBottom: '2',
                        fontSize: 'sm',
                        color: 'gray.600',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1',
                      })}>
                        {deadline.Description && (
                          <p>{deadline.Description}</p>
                        )}
                        {deadline.ElectionDayRegistration && (
                          <p>
                            <span className={css({ fontWeight: '600' })}>Election Day Registration: </span>
                            {deadline.ElectionDayRegistration}
                          </p>
                        )}
                        {!deadline.Description && !deadline.ElectionDayRegistration && (
                          <p className={css({ color: 'gray.400', fontStyle: 'italic' })}>No additional details available.</p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            );
          })
        )}
      </table>
    </div>
  );
}