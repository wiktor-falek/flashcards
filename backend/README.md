# Auth

## POST `/auth/login`
Authenticates an user, creates sessionId and sets a 
cookie with sessionId and username
### Body 
```
username: string
password: string
```

<br>

## POST `/auth/register`
Creates an user if username is available, and specified email is not already verified
### Body
```
username: string
password: string
email: string
```

<br>

## GET `/auth/verify/:token`
This url is sent as in an confirmation email, confirms email when requested

# API v1

TODO: ADD DOCUMENTATION FOR ALL ROUTES


## POST `/api/v1/character`

