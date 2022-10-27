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

## GET `/api/v1/flashcard`
`Responds with an array of all flashcards`

## POST `/api/v1/flashcard`
`Creates a new flashcard and returns it`

| Body   | Required?    | Type   | minLen | maxLen |
| :---:  | :---:        | :---:  | :---:  | :---:  |
| front  | Yes          | string | 1      | 512    |
| back   | Yes          | string | 1      | 512    |
| code   | No           | string | 1      | 512    |


## PATCH `/api/v1/flashcard/:id`
TODO

## DELETE `/api/v1/flashcard/:id`
TODO
