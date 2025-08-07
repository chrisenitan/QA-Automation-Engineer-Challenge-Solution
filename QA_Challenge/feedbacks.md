## Ongoing comments

- Some elements do not have test-id, I used their main id attriutes. This will discrepancies in how elements are resolved (.locator vs geByTestId).
  - We could name variables to reflect this, or force all elements to use test IDS.
- Would be happy to add more data test id to some elements. Eg : `suite-info__title-text`
- Country and phone error fields dont have id wwe can use... making it difficult to write a wholesome logic to handle things gracefully. but i duplicated the selector object with minimal fields
- There is a big of discrepancy in how i wroite the dates... leading zeros... Wish i had thought of that poperly instead of backfliping structure... i treid to keep it simple though, only one place that really needs no leading zero and that is where we handle the zero.

- I don't know if items are called property or suites. Seems to be properties cus props have suites and the API route suggest properties as the parent document which then contains units.
  - This is where reaching out to the team or a Dev would be perfect before proceeding
- each test seems to take 3 hours.. 8-11 but thats assuming i have to do grioud build for the framework. im hoping this reduces
- As at 3pm, i honestly started feeling the loss of all the work knowing its all just an interview, i could just start hacking my way through this now... but i have to try and be disciplined
- As at 5:30 i had just finished half of checkout form. Skipping the rest and moving to the API...
  - If im lucky, i will get enough time to complete soime ui tests, but for now, i do have 4 of them.
- Recording test cases on Google sheet is almost a redundant QA practice but keeping a record of test steps has its benefits. For now i opted to abandon the completion.
  - Perhaps we can find a way to automate this by using playwright `test.step`

1. Sudden magic mouse battery dead, will need 1 hour to charge it to fair level

---

## Feedbacks

1.  I considered the effect of my testing on production API and Booking platform could be averted with a staging variant for applicants.
2.  Considering my unfamiliarity with the platform and the need to setup a new framework for the project, my total time on task was approximately `8 hours`
