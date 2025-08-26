'use client';
// made for vercel firewall bypass
// temporary dev auth page to set a cookie for site admin access

import React, { useState } from "react";


export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Set cookie with username as name and password as value
    document.cookie = `${encodeURIComponent(username)}=${encodeURIComponent(password)}; path=/;`;
    setSubmitted(true);
  };

  const getCookieValue = (name) => {
    const match = document.cookie.match(
      new RegExp('(?:^|;\\s*)' + encodeURIComponent(name) + '=([^;]*)')
    );
    return match ? decodeURIComponent(match[1]) : "(not found)";
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 24, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Make Me Site Admin</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              style={{ width: "100%", padding: 8, marginTop: 4 }}
              autoComplete="username"
            />
          </label>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: 8, marginTop: 4 }}
              autoComplete="current-password"
            />
          </label>
        </div>
        <button type="submit" style={{ padding: "8px 16px" }}>Submit</button>
      </form>
      {submitted && (
        <div style={{ marginTop: 16, color: "green" }}>
          {`saved: ${username} = ${getCookieValue(username)}`}
        </div>
      )}
    </div>
  );
};


