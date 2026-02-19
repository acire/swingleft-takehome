"use client";

import { useState, Fragment } from "react";
import { sortableColumns } from "src/db/deadlines";
import { VoterRegistrationDeadlines } from "src/db/types";
import { css } from "styled-system/css";
import Card from "./Card";
import Table from "./Table";
import { SortableColumn } from "./shared";

const inputStyles = css({
  padding: '2',
  border: '1px solid',
  borderColor: 'gray.300',
  borderRadius: 'md',
  width: '100%',
  maxWidth: '320px',
  '&:focus': {
    outline: 'none',
    borderColor: 'blue.500',
  },
});

const cardListStyles = css({
  display: { base: 'flex', md: 'none' },
  flexDirection: 'column',
  gap: '3',
});

export default function DeadlinesTable({ deadlines }: { deadlines: VoterRegistrationDeadlines[] }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortableColumn>("State");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  function handleSort(column: SortableColumn) {
    if (sortBy === column) {
      setSortOrder(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  }

  function sortIndicator(column: SortableColumn) {
    const isActive = sortBy === column;
    return (
      <span className={css({
        display: 'inline-flex',
        verticalAlign: 'middle',
        marginLeft: '1',
        width: '18px',
        opacity: isActive ? 1 : 0,
      })}>
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
          {isActive && sortOrder === "desc" ? "arrow_downward" : "arrow_upward"}
        </span>
      </span>
    );
  }

  const filteredDeadlines = deadlines.filter(deadline =>
    deadline.State.toLowerCase().includes(search.toLowerCase())
  );
  const sortedDeadlines = [...filteredDeadlines].sort((a, b) => {
    const aVal = a[sortBy] ?? "";
    const bVal = b[sortBy] ?? "";
    return sortOrder === "asc"
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  return (
    <div className={css({ display: 'flex', flexDirection: 'column', gap: '4' })}>
      <input
        className={inputStyles}
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by state..."
      />
      {search && (
        <p className={css({ fontSize: 'sm', color: 'gray.500' })}>
          {sortedDeadlines.length} {sortedDeadlines.length === 1 ? "result" : "results"} found
        </p>
      )}

      {/* Desktop: Table */}
      <Table deadlines={sortedDeadlines} search={search} handleSort={handleSort} sortIndicator={sortIndicator} />

      {/* Mobile: Cards */}
      <div className={cardListStyles}>
        {sortedDeadlines.length === 0 ? (
          <p className={css({ textAlign: 'center', padding: '8', color: 'gray.400' })}>
            No states match &ldquo;{search}&rdquo;
          </p>
        ) : (
          sortedDeadlines.map((deadline) => <Card key={deadline.State} deadline={deadline} />)
        )}
      </div>
    </div>
  );
}