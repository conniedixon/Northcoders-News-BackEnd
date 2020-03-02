# Northcoders News Server

A RESTful server built using express, knex and axios. Gives access to databases containing articles, comments, topics and users

### Hosted on heroku at https://ced-nc-news.herokuapp.com/api

## Installation

After cloning, run the listen.js file using node:

```zsh
npm install
node listen.js
```

# Avaliable Endpoints

### GET - /api

https://ced-nc-news.herokuapp.com/api

Responds with an array of all the possible actions and endpoints on this server.

### GET - /api/topics

https://ced-nc-news.herokuapp.com/api/topics

Responds with an array of all topics on a key of topics. 

### GET - /api/articles/

https://ced-nc-news.herokuapp.com/api/articles

Responds with an array of all articles on a key of articles.

##### Accepts the following queries:

- `sort_by`, defualting to date
- `order`, asc or desc, defaults to asc
- `author`, filters the articles by the username value specified in the query
- `topic`, filters the articles by the topic value specified in the query

## USERS endpoint

### GET - /api/users/:username

Responds with a single user on the key of user.

https://ced-nc-news.herokuapp.com/api/users/butter_bridge

## ARTICLES endpoint

### GET - /api/articles/:article_id

Responds with a single article on a key of article. 

https://ced-nc-news.herokuapp.com/api/articles/1

### PATCH /api/articles/:article_id

Amends votes (increasing or decreasing) with the given body.

Increasing example: body: { "inc_votes": 1 } 
Decreasing example: body: { "inc_votes": -1 }

https://ced-nc-news.herokuapp.com/api/articles/33

## COMMENTS endpoint

### GET - api/articles/:article_id/comments

Responds with an array of comments for given article ID, on the key of comments.

https://ced-nc-news.herokuapp.com/api/articles/1/comments

##### Accepts queries

- `sort_by`, sorts the comments by any valid column (defaults to created_at)
- `order`, `asc` or `desc` (defaults to descending)

### POST /api/articles/:article_id/comments

Responds with a single comment that is given in the POST body.

Body example: { "username": "mossiscool", "body": "Good morning, that's a nice tnettenba" }

https://ced-nc-news.herokuapp.com/api/articles/1/comments

### DELETE /api/comments/:comment_id

Deletes comment by given comment ID. Does not give a response.

https://ced-nc-news.herokuapp.com/api/comments/20

### PATCH /api/comments/:comment_id

Responds with a single comment that has been amended with the given body, increasing or decreasing votes.

Example: { "inc_votes": 1 } || { "inc_votes": -1 }

https://ced-nc-news.herokuapp.com/api/comments/196