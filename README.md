# Juice Shop Login Form

A basic Juice Shop-inspired login page built for a web security assignment. The project demonstrates client-side and server-side input validation using HTML, CSS, JavaScript, Node.js, and Express.

## Features

- Email and password input fields
- Password masking
- Prevention of empty submissions
- Email validation requiring an `@` symbol
- Password validation requiring at least eight characters
- Independent server-side validation
- Feedback displayed using `textContent` instead of interpreting messages as HTML

## Technologies

- **HTML and CSS:** Page structure and styling
- **JavaScript:** Browser validation and form submission
- **Node.js and Express:** Web server and backend validation

## Getting Started

### Prerequisites

Install a supported Node.js LTS release, npm, and Git.

### Installation

Clone the repository:

```bash
git clone https://github.com/willytrees/OWASP-Juice-Shop.git
cd OWASP-Juice-Shop
```

Open a terminal in the folder containing `package.json` and `server.cjs`. If the application is inside a `juice-login` subfolder, run:

```bash
cd juice-login
```

Install the dependencies:

```bash
npm ci
```

Start the server:

```bash
node server.cjs
```

Open **http://127.0.0.1:3000** in your browser.

Keep the terminal running while using the application. Press **Ctrl+C** to stop the server.

## Application Files

Paths below are relative to the application folder.

| File | Purpose |
|---|---|
| `public/index.html` | Login form and page styling |
| `public/script.js` | Client-side validation and requests to the server |
| `server.cjs` | Express server and server-side validation |
| `package.json` | Project configuration and dependencies |
| `package-lock.json` | Locked dependency versions |

## How It Works

1. The user enters an email and password.
2. Browser JavaScript checks that both fields are filled, the email contains `@`, and the password has at least eight characters.
3. Invalid inputs produce a message without sending a request.
4. Valid inputs are sent as JSON to `POST /login`.
5. The server independently validates the fields, including their data types.
6. The server returns HTTP `400` for invalid inputs or HTTP `200` when validation passes.

Server-side validation remains necessary because users can bypass browser checks and send requests directly.

## Manual Testing

### Browser Checks

| Email | Password | Expected result |
|---|---|---|
| Empty | Empty | Required-fields error |
| `student` | `password123` | Email-format error |
| `student@example.com` | `1234567` | Password-length error |
| `student@example.com` | `12345678` | Validation passed |

### Server Check

With the server running, execute this in another terminal:

```bash
curl -i http://127.0.0.1:3000/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"student@example.com","password":"abc"}'
```

Expected result: HTTP `400 Bad Request` with a message explaining that the password must contain at least eight characters. This checks server validation independently of browser JavaScript.

## Security and Limitations

This project demonstrates input validation, not a complete authentication system. It does not store credentials, query a database, verify account ownership, or create authenticated sessions.

Checking for `@` satisfies the assignment’s basic email requirement but does not establish that an email address is valid or belongs to the user.

Messages use `textContent`, and submitted credentials are not echoed into the page. These choices reduce opportunities for HTML injection in this implementation. Passing the validation checks does not establish that an input is safe for every possible use.

Use dummy credentials when testing this local demonstration.
