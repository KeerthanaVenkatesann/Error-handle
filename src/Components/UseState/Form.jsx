import React, { useState, useEffect } from "react";

export default function Form() {
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track API call loading state

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch(
        "https://64d496a1b592423e46944c9c.mockapi.io/workingemployees/Food",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const newEmail = await response.json();
      setEmails([...emails, newEmail]);
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchEmails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://64d496a1b592423e46944c9c.mockapi.io/workingemployees/Food");
        if (!response.ok) {
          throw new Error(
            `Error fetching emails with status ${response.status}`
          );
        }
        const fetchedEmails = await response.json();
        setEmails(fetchedEmails);
      } catch (error) {
        console.error("Error fetching emails:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmails();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div>
        <form action="" method="POST" onSubmit={handleSubmit} className="">
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-success text-white"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit here!"}
            </button>
          </div>
        </form>

        {emails.length > 0 && (
          <table className="table table-striped w-50 mt-5">
            <thead>
              <tr>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {emails.map((email, index) => (
                <tr key={index}>
                  <td>{email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
