# Antisocial Network API

[![Hippocratic License HL3-FULL](https://img.shields.io/static/v1?label=Hippocratic%20License&message=HL3-FULL&labelColor=5e2751&color=bc8c3d)](https://firstdonoharm.dev/version/3/0/full.html)

An api for a hypothetical social network built with MongoDB and Mongoose.


---
**Table of Contents**
* [Installation](#installation)
* [Usage](#usage)
* [Demo video](#demo-video)
* [License](#license)
* [Questions](#questions)
---

## Installation

You'll need Node.js, npm, and MongoDB to be installed before you begin. Clone this repo. From your command line, go to the repo directory and run `npm install`. 

With that out of the way, you can run `npm start` to start the server.

## Usage

You can hit the endpoints to perform CRUD actions for users, thoughts, and reactions.

### Users

Endpoint: `/api/users`

* `GET` all users
* `POST` a new user:
````JavaScript
{
   "username": "kramer",
   "email": "kramer@example.com"
}
````

Endpoint: `/api/users/userID`

* `GET` a single user
* `DELETE` a single user AND all associated thoughts
* `PUT` update a user with a new username or email:
````JavaScript
{
   "email": "cosmo.kramer@example.com"
}
````

Endpoint: `/api/users/userID/friends/friendID`

* `POST` add a new friend to a user's friend list
* `DELETE` remove a friend from a user's friend list


### Thoughts & Reactions

Endpoint: `/api/thoughts`

`GET` get all thoughts

`POST` create a new thought:

````JavaScript
{
	"username": "newman",
	"thoughtText": "Hello, Jerry."
}
````

Endpoint: `/api/thoughts/thoughtID`

* `GET` a single thought
* `PUT` update a thought's thoughtText:
````JavaScript
{
	"thoughtText": "Hello, ~Jerry~"
}
````
* `DELETE` remove a thought

Endpoint: `/api/thoughts/thoughtID/reactions`

* `POST` creates a reaction to a thought and stores it in the parent thought's `reactions` array
* `DELETE` removes a reaction by its reactionId:
````JavaScript
{
	"reactionId": "62fec182d2e24bc9bbd6ab5d"
}
````

## Demo video






## License
This project uses the [Hippocratic License, v3.0](https://firstdonoharm.dev). TL;DR, it's not *quite* open source, but as long as you're not violating human rights, being a fossil fuel company, conducting military operations, etc (see license for full details), you can essentially treat it as open source.

## Questions?

Contact [lshillman](https://github.com/lshillman) via methods described at [lukehillman.net](https://lukehillman.net).
