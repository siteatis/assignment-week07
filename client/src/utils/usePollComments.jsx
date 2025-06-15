import { useState, useEffect } from "react";

// TODO: Rewrite so that it's refreshing data from the DB onto the DOM, not collecting frogs!

export function usePollComments() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const poll = async () => {
      //setPolledData(await (await fetch(url)).json().image); // foxes
      const url = import.meta.env.VITE_SERVER_URL + "pollComments";
      setComments(await (await fetch(url)).json());
    };
    poll();
    const timer = setInterval(poll, 20000); // Poll every 20 seconds
    return () => clearInterval(timer);
  }, []);
  console.log(comments); // TODO
  return comments;
}
