import { useState, useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    const request = new Request(
      "https://workshop-api-project.herokuapp.com/api/v1/dramas",
      {
        method: "POST",
        body: JSON.stringify({ title: ":):(" }),
      }
    );

    const { url, method, credentials } = request;

    console.log("ur ", url);
    console.log("method ", method);
    console.log("credentials ", credentials);

    fetch(request)
      .then((res) => {
        if (res.status === 200) {
          res.json();
        } else {
          console.log(res.status);
          console.log(res.statusText)
          throw new Error("Something went wrong on the API SERVER");
        }
      })
      .then((json) => console.log("json ", json))
      .catch((error) => console.log(error.message));
  }, []);

  return (
    <div>
      <h1>Fetch API</h1>
    </div>
  );
}

async function get(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.statusText} : ${response.status}`);
  } catch (error) {
    return { error: true, message: error.message };
  }
}
