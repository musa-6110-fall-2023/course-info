# Philadelphia "Trail Waze" App

See the live version at https://musa-611-spring-2022.github.io/trail_waze/frontend/

## Code Documentation

* Client-side [annotated code](https://musa-611-spring-2022.github.io/trail_waze/docs/frontend/js/issue_reporter.html)
* Server-side [annotated code](https://musa-611-spring-2022.github.io/trail_waze/docs/backend/server.html)

## Running locally (for debugging and development)

1.  **Install the requirements**

    This project uses the following Node JS packages:

    * `express`
    * `knex`
    * `cors`
    * `better-sqlite3`

    All of these packages are listed in the `package.json` file and thus can be
    installed using the Node Package Manager (NPM) by running `npm install`.

2.  **Initialize the backend database**

    In the Firebase console, create a project, and create a new app for the Web within it.
    Don't worry about setting up hosting for the app right now.

    Copy the `import` and `firebaseConfig` code after creating the app.
    From the _backend/_ folder, run the `init_database.sh` script. This file
    will create a SQLite3 database file named `db.sqlite3` inside of the folder,
    and will create a table in that database named `trail_issue`.

    > Note that the `init_database.sh` script _should_ work if you have Python3
    > installed _and_ you are on a Mac or Linux computer. **If you are on Windows**
    > then it may not work. Instead, you might be able to copy and run the
    > following on the command line while in the _backend/_ folder:
    >
    > ```bash
    >  sqlite3 db.sqlite3 "
    >    CREATE TABLE IF NOT EXISTS trail_issue (
    >      id INTEGER PRIMARY KEY AUTOINCREMENT,
    >      category TEXT,
    >      encountered_at TEXT,
    >      latitude REAL,
    >      longitude REAL,
    >      details TEXT,
    >      trail_id INTEGER,
    >      trail_label TEXT,
    >      created_at TEXT DEFAULT (datetime('now', 'localtime'))
    >    );
    >  "
    >  ```

3.  **Start the backend server**

    From within the _backend/_ folder, run the following:

    ```bash
    npx nodemon server.js
    ```

    That command should start a new server at http://localhost:3000.

    > Note that we could just start the server with `node server.js`, but using
    > the `nodemon` tool makes it so that the server will restart whenever we
    > make a change to the code in `server.js`. This can be extremely useful
    > while you're doing development.

4.  **Visit the app**

    At this point you should be able to open the _frontend/index.html_ file in your browser by copying the full path to that file and pasting it into your browser's URL bar. You do _not_ need to start a local file server to view the app.
