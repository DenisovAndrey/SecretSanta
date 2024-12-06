# Secret Santa Application 🎄🎁

This is a Node.js-based application for organizing a **Secret Santa** game. The app provides an intuitive interface to add participants, assign gift recipients randomly, and manage the Secret Santa process with specific rules.

---

## Features

1. **Participant Management**:
    - Add participants via a form.
    - Validate input to prevent duplicates.

2. **Recipient Assignment**:
    - Randomly assign a recipient to each participant.
    - Avoid self-selection and predefined disallowed pairs (e.g., Eva cannot select Kirill).
    - If no valid recipients are available, fallback logic allows previously assigned recipients to be chosen.

3. **Display Progress**:
    - Show participants who have already been assigned a recipient.
    - Display the assigned recipient with a polished reveal page.

4. **Reset Game**:
    - Reset all assignments and start a new game.

5. **Error Handling**:
    - Handles edge cases (e.g., no valid recipients) with meaningful error messages.

---

## Prerequisites

- **Node.js**: Ensure Node.js is installed on your system.
- **npm**: Comes bundled with Node.js.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/secret-santa.git
   cd secret-santa

2. Install dependencies:
    ```bash
   npm install


---
## Usage

1. Start the server:
   ```bash
    node app.js
   
2. Open your browser and navigate to:
    ```bash
   http://localhost:3000
