code2token
==========

simple node.js webserver for exchanging authorization_code for access_token in hh.ru oauth2 auth flow.

hh.ru endpoints hardcoded.

optimized for heroku environment.

taking client_id and client_secret from ENV so you should add them:

```
heroku config:add CLIENT_ID=FOOOO
heroku config:add CLIENT_SECRET=BAAAAR
```
