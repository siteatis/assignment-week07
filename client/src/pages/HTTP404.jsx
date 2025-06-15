import { Link } from "react-router";

export function HTTP404() {
  return (
    <>
      <h1>Page not found (404)</h1>
      <h4>Use link to return to the home page</h4>
      <Link to="/">Home</Link>
    </>
  );
}
