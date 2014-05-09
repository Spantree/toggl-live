### Live Toggl Feed
Displays current activities of users in Toggl.

### Requirements
* node
* grunt
* bower


### Installation

1. Install node. We can install node with nvm:
```bash
nvm install node v0.10.28
```

2. Install grunt.
```bash
npm install -g grunt-cli
```

3. Install bower.
```bash
npm install -g bower
```

4. Install the dependencies for the server.
```bash
npm install
```

5. Install the dependencies for the front end.
```bash
cd public
npm install
bower install
```

6. Add the Toggl keys:
Add the toggl api keys for any user you want to list in the activity dashboard to the accounts.js file. E.g.:
```javascript
module.exports = [
  { 'name': 'Jon Doe', 'key': '12355'},
  { 'name': 'Jane Doe', 'key': '034412355'},
];
```

### Running the Application
1. Start the server.
```bash
node server
```

2. Start the frontend.
```bash
cd public
grunt serve
```

The application can be accessed at __localhost:3000__.
The list of tasks can be viewed at __localhost:3000/#tasks__.
