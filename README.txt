1. I spinned up the lenses container in a vps of mine at http://173.249.13.210:3030/ and I connected cypress by changing cypress.json.
   After that I had to set some timeouts because the vps server at some points delayed to responce.
   Before the final push i restored the setting to use localhost.

2. I added the following in order to force cypress to stop after an error:
    Cypress.on('fail', () => {
      Cypress.stop()
    })

3. In order for you to see the way i am thinking, I didn't delete the checking points (cy.pause) I used.

4. I usually create comments with the structure first and then add the code in order to work on a solid structure. Also I include to the comments the HTML of the element targeted (if is not too big), but this has to do with the team's policy.

5. I am testing also the autocomplete functionality for the "Category" field of the "Add New Policy" form. 



If I had amble of time, I would:
1. Analyse the business critical points of the specific page and I would cover them with tests. Eg I would create policies about sensitive customer data and test them while data are presented on the respective page.
2. According to the test coverage target, I would enrich the tests by testing more Dom elements and functionality, trying to keep the overall testing time needed as low as possible.


Thank you.