export function Users({ users }) {
  const mildlyUnfair = (kudos) => Math.max(20, Math.ceil(kudos * 1.2));
  return (
    <>
      <p>The following people have kindly added their comments:</p>
      {users.map((x) => (
        <>
          {/* username is a safe key, since it's unique in the underlying DB */}
          <p
            key={x.username}
          >{`User "${x.username}" has ${x.reputation} kudos.`}</p>
          <p>{`Keep posting! You only need ${mildlyUnfair(
            x.reputation
          )} kudos to get a special reward!`}</p>
        </>
      ))}
    </>
  );
}
