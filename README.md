# Officeworks Candidate Test

## Welcome

Thank you for taking the time to participate in this technical test.

We understand that your time is valuable so wanted to provide a process that
will allow us to adequately assess you technically, and also not cost you a
great deal of your time.

Feedback on this section of the interview process is naturally very welcome,
we'd appreciate the chance to improve for all future candidates who will be
taking this test.

## Getting started

This service has been built using Node 8.9.1, however it should work at least on
Node 6+.

Let's start the server

`npm i && npm start`

This will install the requisite dependencies and start the server on port 3000.

There's only the single endpoint created for this service accessible at:

`GET localhost:3000/api/delivery/<postcode>?partNumber=<comma delimted ID>`

Successful results only come from a `postcode` with the value `3000` and the
`partNumber` being a single number between one and ten, or a comma delimited
list such as `1,5,9`.

## How do I complete the test?

Provided in this repository is a simple Express server we've created for the
purpose of this test.
