# Auth
TODO: specify min and max length for body/params

## POST `/auth/login`
Authenticates an user, creates sessionId and sends
cookie with sessionId and username
### Body 
```
username: string
password: string
```

<br>

## POST `/auth/register`
Creates an user if username is available, and specified email is not already verified by another user
### Body
```
username: string
password: string
email: string
```

<br>

## GET `/auth/verify/:token`
This url is sent to user email on registration.
When requested confirms the users email.

# API v1

## GET `/api/v1/character`
TODO

## POST `/api/v1/character`
TODO

## UPDATE `/api/v1/character/:id`
TODO

## DELETE `/api/v1/character/:id`
TODO
