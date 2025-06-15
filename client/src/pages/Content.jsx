import { usePollComments } from "../utils/usePollComments";
import { useState } from "react";

// TODO: Maybe conditionally render some items (filter comments)
// TODO: Getting a console error for x.id as key even though it's clearly unique - look into this

export function Content({ users }) {
  const comments = usePollComments();

  async function giveKudos(username) {
    const url = import.meta.env.VITE_SERVER_URL + "giveKudos";
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    // TODO: Must trigger reload of users
  }

  return (
    <>
      <h2>Comments so far:</h2>
      {comments.map((x) => (
        <div key={x.id}>
          <p>{`Comment by ${x.username} on ${new Date(
            x.when_posted.replace(" ", "T")
          )} titled '${x.subject}':`}</p>
          <p>{x.text}</p>
          <button type="button" onClick={() => giveKudos(x.username)}>
            Kudos!
          </button>
        </div>
      ))}
    </>
  );
}
/*
// this User Profile page needs to be dynamic!
// params will look like: /:username or /profiles/:username
// it's nested inside another route (/.../)
// we'll need a useParams hook to manage the value that we'll add to the :username params
import { useParams, useSearchParams, Link, Outlet } from "react-router";

export default function UserProfile({ users }) {
  const { username } = useParams();
  const [searchArgs, setSearchArgs] = useSearchParams();
  // we can use the params value to find matching data in DB
  const validText = users.find((x) => x === username)
    ? "Hello!"
    : "P.S. Not a valid user!";
  const orderBy = searchArgs.get("orderBy");
  // Most apps work this way putting sort/filter in the URL and this allows sharing or
  // keeping links that recreate a view without having to renavigate and reconfigure.

  // When working with nested routes, the outer route could have various child routes
  // nested inside it, and a component of the outer route can't necessarily know what
  // is going to be rendered below it, and indeed won't want anything rendered below it
  // at all when the outer route is navigated to. The <Outlet /> solves this problem by
  // acting as a placeholder in the component, saying "I don't know what will be rendered by
  // any routes nested inside mine, but this blank space is where I want React to put it".
  return (
    <>
      <h1>
        Profile Page : {username} [{validText}]; details ordered by {orderBy}.
      </h1>
      <Outlet />
      <Link to={`profile/${username}`}>My Profile</Link>
      <form>
        <label>
          Order by:
          <select
            value={orderBy || ""}
            onChange={(ev) => setSearchArgs({ orderBy: ev.target.value })}
          >
            <option value="" hidden>
              Select...
            </option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </form>
    </>
  );
  // UserOrders isn't routed from here, otherwise it'd display on the profiles page
}
*/
