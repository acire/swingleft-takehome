import { VoterRegistrationDeadlines } from "src/db/types";

const LOCAL_API = `${process.env.API_URL}/deadlines`;

function Table({ deadlines }: { deadlines: VoterRegistrationDeadlines[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>State</th>
          <th>Deadline In Person</th>
          <th>Deadline By Mail</th>
          <th>Deadline Online</th>
          <th>Election Day Registration</th>
          <th>Register Online</th>
          {/* <th>Description</th> */}
        </tr>
      </thead>
      <tbody>
        {deadlines.map(deadline => (
          <tr key={deadline.State}>
            <td>{deadline.State}</td>
            <td>{deadline.DeadlineInPerson}</td>
            <td>{deadline.DeadlineByMail}</td>
            <td>{deadline.DeadlineOnline}</td>
            <td>{deadline.ElectionDayRegistration}</td>
            <td><a href={deadline.OnlineRegistrationLink} target="_blank">Register Online</a></td>
            {/* <td>{deadline.Description}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default async function Page() {
  const response = await fetch(LOCAL_API);
  const deadlines: VoterRegistrationDeadlines[] = await response.json();

  return (
    <main>
      <h1>Voter Registration Deadlines</h1>
      <Table deadlines={deadlines} />
    </main>
  );
}
