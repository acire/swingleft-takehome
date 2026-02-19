import { VoterRegistrationDeadlines } from "src/db/types";
import { css } from "styled-system/css";
import DeadlinesTable from "./components/DeadlinesTable";

const LOCAL_API = `${process.env.API_URL}/deadlines`;

const mainStyles = css({
  paddingX: { base: '4', md: '6' },
  paddingY: { base: '6', md: '8' },
  maxWidth: 'container.lg',
  margin: 'auto',
});

const titleStyles = css({
  fontSize: { base: 'xl', md: '2xl' },
  fontWeight: 'bold',
  marginBottom: { base: '4', md: '6' },
});

export default async function Page() {
  const response = await fetch(LOCAL_API);
  if (!response.ok) {
    return (
      <main className={mainStyles}>
        <h1 className={titleStyles}>Oops! Something went wrong</h1>
        <p className={css({ color: 'gray.600', marginBottom: '4' })}>Failed to fetch deadlines. Please try again later.</p>
      </main>
    )
  }
  const deadlines: VoterRegistrationDeadlines[] = await response.json();

  return (
    <main className={mainStyles}>
      <h1 className={titleStyles}>
        Find Your State's Voter Registration
      </h1>
      <DeadlinesTable deadlines={deadlines} />
    </main>
  );
}
