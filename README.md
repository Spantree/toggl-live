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
Add the toggl api keys for any user you want to list in the activity dashboard to the ~/.node-configs/user-admin.json file. E.g.:
```javascript
{
  "user_accounts":[
    {
      "name": "Jon Doe",
      "key": "XXXX_KEY_XXXXX",
      "email": "jon.doe@mail.com"
    }
  ]
}
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
