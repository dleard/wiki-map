# Wiki-Map (CuteMap) Midterm Project

CuteMap is a single page web app made with the google maps api.
It is a community-based map creation service that allows users to create custom maps and add points
to maps shared among the community.

This app was created by Nick Doyle and Dylan Leard.

## Real picture of Nick and Dylan working
!["Screenshot of URLs Page: "](https://github.com/dleard/wiki-map/blob/master/surfing.png)

## Screenshots
!["Screenshot of a Populated Map: "](https://github.com/dleard/wiki-map/blob/master/mapwithpoints.png)
!["Screenshot of The Browser Pane: "](https://github.com/dleard/wiki-map/blob/master/browserpane.png)

## Dependencies

- Node.js
- Express
- EJS
- bcrypt
- body-parser
- cookie-parser
- method-override
- bootstrap
- dotenv
- knex
- knex-logger
- morgan
- node-sass-middleware
- pg

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node run local` command.

## Using the app

- Browsing maps and users can be done without logging in
- Map creation is limited to users who are logged in
- Marker editing and deleting is also limited to users who are logged in
- Marker creation can be done by users who are not logged in, but will not persist
- The log in button is currently hard-coded to a demo user
