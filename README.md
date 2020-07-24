# Officeworks Candidate Test

## Welcome

Thank you for taking the time to participate in this technical test.

We understand that your time is valuable so wanted to provide a process that
will allow us to adequately assess you technically, and also not cost you a
great deal of your time.

Feedback on this section of the interview process is naturally very welcome,
we'd appreciate the chance to improve for all future candidates who will be
taking this test.

Ideally we'd like our candidates to spend 2 hours on this task. Anything you run out of time for, leave some comments in the code and raise them with us in the walkthrough.

## Getting started

This service has been built using Node 8.17.0, however it should work at least on Node 10.

Let's start the server

`npm i && npm start`

This will install the requisite dependencies and start the server on port 3000.

There's only the single endpoint created for this service accessible at:

`GET http://localhost:3000/api/delivery/<postcode>?partNumber=<comma delimited ID>`

Successful results only come from a `postcode` with the value `3000` and the
`partNumber` being a single number between one and ten, or a comma delimited
list such as `1,5,9` (no whitespace).

Feel free to test the endpoint any way you like, however my personal preference is [Postman](https://getpostman.com)

## How do I complete the test?

Provided in this repository is a simple Express server we've created for the purpose of this test.

Your task is to submit a PR cleaning up the various code smells and anti-patterns we've left around the place. Dig deep, extra points for finding stuff we didn't identify ourselves first.

With an emphasis on:

* Usage of ES6/7 where possible
* Up to date async handling patterns
* Removing excessive mutability
* Unused or unecessary variables
* Edge case bugs that are unhandled
* Service architecture and circular patterns
* Add notes for things you don't get to in a file or in the PR


If renaming or moving files please consider the impact on readability of the diff in the resulting pull request.

It would also be great to have a few automated unit/integration tests written, but feel free not to go overboard there.

Once the PR is submitted, we will review internally and then run through a code review like the standard PR process as part of your interview.

## FAQ/Hints

### Will I be marked down for using tabs vs. spaces, single vs. double quotes, certain code styling that doesn't affect functionality or "best practice"?

Not at all. But you might need to change your code style here and there to fit the team when you come aboard.

### This code isn't great, is this stuff I'll be working on in the job?

This repo was created in order to see our candidates' eye for detail and how they apply their craft in a semi-realistic environment. There is a fair amount of anti-patterns/code smells going on for the purpose of this test. Not to say our current repositories are complete perfection either (What code is?).

### How do you handle async at Officeworks?

Mostly async/await with some promises scattered around, callbacks are avoided

### Should I be following the existing patterns set in this repo?

Not really, the idea is to improve the code to reduce bugs, side-effects and overall reliability and performance. Feel free to slice and dice where you see fit. The repo is supposed to have a fair bit of cruft, so don't worry about offending us.

---

Good luck, looking forward to chatting soon.
