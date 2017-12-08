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

Feel free to test the endpoint any way you like, however my personal preference is [Postman](https://getpostman.com)

## How do I complete the test?

Provided in this repository is a simple Express server we've created for the
purpose of this test.

Your task is to submit a PR cleaning up the various code smells and anti-patterns we've left around the place. Dig deep, extra points for finding stuff we didn't identify ourselves first.

With an emphasis on:
- Usage of ES6/7 where possible
- Removing excessive mutability
- Unused or unecessary variables
- Edge case bugs that are unhandled
- Service architecture, folder structure and circular patterns

It would also be great to have a few automated tests written, but feel free not to go overboard there.

Once the PR is submitted, we will review internally and then schedule a short video chat to run through a code review like the standard PR process.

## FAQ/Hints

1. Will I be marked down for using tabs vs. spaces, single vs. double quotes, certain code styling that doesn't affect functionality or "best practice"?

    Not at all. But you might need to change your code style here and there to fit the team when you come aboard.

2. This code isn't great, is this stuff I'll be working on in the job?

    This repo was created in order to see our candidates' eye for detail and how they apply their craft in a semi-realistic environment. There is a fair amount of anti-patterns/code smells going on for the purpose of this test. Not to say our current repositories are complete perfection either (What code is?).


Good luck, looking forward to chatting soon.