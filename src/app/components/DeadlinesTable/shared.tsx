import { sortableColumns } from "src/db/deadlines";
import { VoterRegistrationDeadlines } from "src/db/types";
import { css } from "styled-system/css";

const linkStyles = css({
  color: 'blue.500',
  textDecoration: 'underline',
  '&:hover': {
    color: 'blue.600',
  },
});

const badgeStyles = css({
  display: 'inline-block',
  marginLeft: '2',
  padding: '0.5',
  paddingX: '2',
  fontSize: 'xs',
  fontWeight: '500',
  borderRadius: 'full',
  backgroundColor: 'green.100',
  color: 'green.700',
  whiteSpace: 'nowrap',
});

const infoIconStyles = css({
  display: 'inline-flex',
  verticalAlign: 'middle',
  marginLeft: '1',
  color: 'amber.500',
});

export function RegistrationLink({ url }: { url: string | null }) {
  if (!url) {
    return <span className={css({ color: 'gray.400' })}>—</span>;
  }
  return <a className={linkStyles} href={url} target="_blank" rel="noopener noreferrer">Register Online</a>;
}

export function StateName({ deadline }: { deadline: VoterRegistrationDeadlines }) {
  return (
    <>
      {deadline.State}
      {deadline.ElectionDayRegistration && (
        <span className={badgeStyles}>Election Day Reg</span>
      )}
      {hasImportantDescription(deadline) && (
        <span className={infoIconStyles}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>info</span>
        </span>
      )}
    </>
  );
}

function hasImportantDescription(d: VoterRegistrationDeadlines): boolean {
  return !!d.Description && (
    !d.DeadlineInPerson && !d.DeadlineByMail && !d.DeadlineOnline
  );
}

export type SortableColumn = typeof sortableColumns[number];

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}