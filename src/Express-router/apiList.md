# API list that are require for the App to workk

## authProfileRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET/profile/view
- GET /profile/edit
- PATCH /profile/edit/password

## connectionRequestRouter
- POST /request/interested/:userID
- POST /request/ignored/:userID
- POST /request/review/accepted/:userID
- POST /request/review/rejected/:userID