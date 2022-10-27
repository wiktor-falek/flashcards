# Auth

## POST `/auth/login`

`Creates sessionId and sends cookies on successful login.`

|   Body   | Required? |  Type  | minLen | maxLen |
| :------: | :-------: | :----: | :----: | :----: |
| username |  Yes ✅   | string |   6    |   30   |
| password |  Yes ✅   | string |   8    |  100   |

<br>

## POST `/auth/register`

`Creates an user if username is available and email is not already verified.`

|   Body   | Required? |  Type  | minLen | maxLen |
| :------: | :-------: | :----: | :----: | :----: |
| username |  Yes ✅   | string |   6    |   30   |
| password |  Yes ✅   | string |   8    |  100   |
|  email   |  Yes ✅   | string |   6    |  254   |

<br>

<br>

## GET `/auth/verify/:token`

`This url is sent to the registration email. When requested confirms the users email if it's not already taken, or the user already verified email.`

# API v1

## GET `/api/v1/flashcard`

`Responds with an array of all flashcards`

## POST `/api/v1/flashcard`

`Creates a new flashcard and returns it`

| Body  | Required? |  Type  | minLen | maxLen |
| :---: | :-------: | :----: | :----: | :----: |
| front |  Yes ✅   | string |   1    |  512   |
| back  |  Yes ✅   | string |   1    |  512   |
| code  |   No ❌   | string |   1    |  512   |

## PATCH `/api/v1/flashcard/:id`

TODO

## DELETE `/api/v1/flashcard/:id`

TODO
