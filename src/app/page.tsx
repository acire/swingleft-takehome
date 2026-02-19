import { VoterRegistrationDeadlines } from "src/db/types";
import { css } from "styled-system/css";
import DeadlinesTable from "./components/DeadlinesTable";

const LOCAL_API = `${process.env.API_URL}/deadlines`;

export default async function Page() {
  const response = await fetch(LOCAL_API);
  const deadlines: VoterRegistrationDeadlines[] = await response.json();

  return (
    <main className={css({ paddingX: { base: '4', md: '6' }, paddingY: { base: '6', md: '8' }, maxWidth: 'container.lg', margin: 'auto' })}>
      <h1 className={css({ fontSize: { base: 'xl', md: '2xl' }, fontWeight: 'bold', marginBottom: { base: '4', md: '6' } })}>Voter Registration Deadlines</h1>
      <DeadlinesTable deadlines={deadlines} />
    </main>
  );
}
