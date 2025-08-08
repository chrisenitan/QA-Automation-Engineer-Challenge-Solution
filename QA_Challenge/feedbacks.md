## Feedbacks

There are even more feedback on the PDF file in the parent folder. These here are rather technical.

1.  I considered the effect of my testing on production API and Booking platform could be averted with a staging variant for applicants.
2.  Considering my unfamiliarity with the platform and the need to setup a new framework for the project, my total time on task was approximately `8 hours` for technical and another 3 for Documentations. Each test took around `1 hour`.
3.  Recording test cases on Google sheet is almost a redundant QA practice but keeping a record of test steps has its benefits. I'm attempting an approach to log every test step on `suites_booking.spec.ts`
4.  I'm afraid the QA challenge, my and other applicants solutions are now public projects on Github, giving any future applicant a cheat sheet. Although I can't deny the ease benefit of using public project.
5.  I think I might have complicated the booking date Types. In real life scenario, I'd be happy clean that up the moment it shows signs of further complications

---

## Ongoing comments

#### this is just a mind dump, you can ignore this segment.

- Related AI assistant chat for the whole project: https://chatgpt.com/share/68950978-f44c-8000-be29-6cf9e2320272
- Some elements do not have test-id, I used their main id attributes. This will discrepancies in how elements are resolved (.locator vs geByTestId).
  - I considered naming selector variables to reflect this, or forcing all elements to use test IDS from FrontEnd. Eg : `suite-info__title-text`, `h3` used for suite title identification
- Checkout form Country and PhoneNumber error fields don't have test-id nor id... making it difficult to write a wholesome logic to handle the form gracefully. So i had to escape some fields.
- Project is heavy because i opted to commit the report files as well. >100mb
- I don't know if items are called property or suites. Seems to be properties because props have suites and the API route suggest properties as the parent document which then contains units. not sure.
  - This is where reaching out to the team or a Dev would be perfect before proceeding
- Each test seems to take 3 hours to write.. 8-11 but thats assuming I have to build the framework over each time. Im hoping this reduces
- Perfect timing, the magic mouse battery ran out, will need 1 hour to charge it to fair level.
- As at 3pm Thursday, I honestly started feeling the loss of all the work knowing its all just an interview, I could just start hacking my way through this now... but I have to remain disciplined.
- As at 5:30 I had just finished half of checkout form. Skipping the rest and moving to the API...
  - If I'm lucky, i will get enough time to complete some more UI tests.
- Recording test cases on Google sheet is almost a redundant QA practice but keeping a record of test steps has its benefits.
  - Perhaps we can find a way to automate this by using playwright `test.step`
