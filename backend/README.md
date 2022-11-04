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

## GET `/auth/verify/:token`

`This url is sent to the registration email. When requested confirms the users email if it's not already taken, or the user already verified email.`

# API v1

## GET `/api/v1/flashcard`

`Responds with an array of all flashcards`

<br>

## POST `/api/v1/flashcard`

`Creates a new flashcard and returns it`

| Body  | Required? |  Type  | minLen | maxLen |
| :---: | :-------: | :----: | :----: | :----: |
| front |  Yes ✅   | string |   1    |  512   |
| back  |  Yes ✅   | string |   1    |  512   |
| code  |   No ❌   | string |   1    |  512   |

<br>

## POST `/api/v1/flashcard`

`Creates a new flashcard and returns the flashcard`

| Body  | Required? |  Type  | minLen | maxLen |
| :---: | :-------: | :----: | :----: | :----: |
| front |  Yes ✅   | string |   1    |  512   |
| back  |  Yes ✅   | string |   1    |  512   |
| code  |   No ❌   | string |   1    |  512   |

<br>

## POST `/api/v1/flashcard/increment/:id`

`Increments reviewedCount and returns updated flashcard`

| Params | Required? |  Type  | minLen | maxLen |
| :----: | :-------: | :----: | :----: | :----: |
|   id   |  Yes ✅   | string |   24   |   24   |

<br>

## POST `/api/v1/flashcard/move/memorized/:id`

`Moves flashcard to memorized array field`

| Params | Required? |  Type  | minLen | maxLen |
| :----: | :-------: | :----: | :----: | :----: |
|   id   |  Yes ✅   | string |   24   |   24   |

<br>

## POST `/api/v1/flashcard/move/flashcards/:id`

`Moves flashcard to flashcards array field`

| Params | Required? |  Type  | minLen | maxLen |
| :----: | :-------: | :----: | :----: | :----: |
|   id   |  Yes ✅   | string |   24   |   24   |

<br>

## PATCH `/api/v1/flashcard/:id`

TODO

<br>

## DELETE `/api/v1/flashcard/:id`

`Deletes the flashcard and returns the id if successful`

| Params | Required? |  Type  | minLen | maxLen |
| :----: | :-------: | :----: | :----: | :----: |
|   id   |  Yes ✅   | string |   24   |   24   |

<br>
