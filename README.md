# todo list app
A simple todo list app that demonstrates full stack development (backend: spring-boot, ui: react)

## description
The app has server and backend parts as separate projects.
You need to run both to make it work.

### start server app 

Run the following commands:
`cd server && ./gradlew build && java -jar build/libs/todolist-0.0.1.jar`

and check server is up and running by looking at [http://localhost:8088/api](http://localhost:8088/api).

### start the ui app 

Run the following commands (in a different terminal):
`cd ui && yarn start`

a browser tab will be opened automatically which loads [http://localhost:3000](http://localhost:3000).

You can start using the app now from this browser window.
