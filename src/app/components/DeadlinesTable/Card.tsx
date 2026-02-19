"use client";
import { VoterRegistrationDeadlines } from "src/db/types";
import { css } from "styled-system/css";
import { formatDate, RegistrationLink, StateName } from "./shared";

const cardStyles = css({
  border: '1px solid',
  borderColor: 'gray.200',
  borderRadius: 'lg',
  padding: '4',
  display: 'flex',
  flexDirection: 'column',
  gap: '2',
});

const cardLabelStyles = css({
  fontSize: 'xs',
  color: 'gray.500',
  fontWeight: '600',
});

const cardValueStyles = css({
  fontSize: 'sm',
});

export default function Card({ deadline }: { deadline: VoterRegistrationDeadlines }) {
  return (
    <div className={cardStyles}>
      <div className={css({ fontWeight: 'bold', fontSize: 'md', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1' })}>
        <StateName deadline={deadline} />
      </div>
      <div className={css({ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2' })}>
        <div>
          <span className={cardLabelStyles}>In Person</span>
          <p className={cardValueStyles}>{deadline.DeadlineInPerson ? formatDate(deadline.DeadlineInPerson) : "—"}</p>
        </div>
        <div>
          <span className={cardLabelStyles}>By Mail</span>
          <p className={cardValueStyles}>{deadline.DeadlineByMail ? formatDate(deadline.DeadlineByMail) : "—"}</p>
        </div>
        <div>
          <span className={cardLabelStyles}>Online</span>
          <p className={cardValueStyles}>{deadline.DeadlineOnline ? formatDate(deadline.DeadlineOnline) : "—"}</p>
        </div>
        <div>
          <span className={cardLabelStyles}>Register</span>
          <p className={cardValueStyles}><RegistrationLink url={deadline.OnlineRegistrationLink} /></p>
        </div>
      </div>
      {deadline.ElectionDayRegistration && (
        <p className={css({ fontSize: 'sm', color: 'gray.600' })}>
          <span className={css({ fontWeight: '500' })}>Election Day Registration:</span> {deadline.ElectionDayRegistration}
        </p>
      )}
      {deadline.Description && (
        <p className={css({ fontSize: 'sm', color: 'gray.500', borderTop: '1px solid', borderColor: 'gray.100', paddingTop: '2' })}>
          {deadline.Description}
        </p>
      )}
    </div>
  )
};