1. I spinned up the lenses container in a vps of mine at http://173.249.13.210:3030/
   So I had to set some timeouts od delays because the vps server at some points delayed to responce.
2. I connected cypress by changing cypress.json

3. I am testing also the autocomplete functionality for the "Category" field of the "Add New Policy" form. 

4. I choose to add rich comments including the HTML of the element targeted (if is not too big), but this has to do with the team's policy

5. Since this is not production code i choose to have more context areas but i could use less.

6. In order for you to see the way i am thinking, I didn't delete the checking points (cy.pause) i used.

7. I added the following in order to force cypress to stop after n error:
    Cypress.on('fail', () => {
      Cypress.stop()
    })

