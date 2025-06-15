//this form will send users' input to the server CREATE route
import { useState } from "react";

export default function Form() {
  // state to store data
  //submit listener and handler
  //change listener and handler

  //   function handleSubmit(event) {
  //   event.preventDefault();
  //collect data and update state

  //fetch the server route
  // fetch("serverEndpoint", {
  //     headers:,
  //     body:,
  // })
  //   }

  return (
    <>
      <h1>Form</h1>
      {/* set up an accessible form with semantic tags */}
      {/* remember to track the input changes (value) */}
    </>
  );
}

// TODO: set up a form to collect user's data
export function Form2() {
  const [formData, setFormData] = useState({
    username: "",
    subject: "",
    text: "",
  });

  const handleSubmit = (ev) => ev.preventDefault();
  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
  };

  return (
    <>
      <h1>Form</h1>
      {/* when we pass the handler to the event, the argument for the event parameter is the actual onSubmit */}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Post your message here:</legend>
          <label>
            Username:
            <input
              name="username"
              required
              minLength={3}
              maxLength={20}
              placeholder="Write your username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Subject:
            <input
              name="subject"
              required
              placeholder="gmail preferred"
              value={formData.subject}
              onChange={handleChange}
            />
          </label>
          <label>
            Message:
            <input
              name="text"
              required
              value={formData.text}
              onChange={handleChange}
            />
          </label>
        </fieldset>
        <p
          style={{
            color: "white",
            backgroundColor: "white",
            textAlign: "center",
          }}
        >
          Privacy Policy: Your details will be shared with carefully-selected
          partner organisations, based on our ethical principles of selling it
          for as much money as possible.
        </p>
        <button type="submit">Post it!</button>
        {/*<div>
          {formData.field1 && <p>{`Field 1 says: ${formData.field1}`}</p>}
          {field2 && <p>{`Field 2 says: ${field2}`}</p>}
        </div>*/}
      </form>
      <p>{formData.username}</p>
      <p>{formData.subject}</p>
      <p>{formData.text}</p>
    </>
  );
}
