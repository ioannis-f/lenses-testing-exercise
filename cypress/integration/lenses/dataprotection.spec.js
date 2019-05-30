// Added in order to be able to use keyboard tab. still in beta thought.
//require('cypress-plugin-tab')

// Added in order to force cypress to stop after n error:
Cypress.on('fail', () => {
  Cypress.stop()
})


describe.only("Data Protection", () => {
  beforeEach(() => {
    cy.login();
    cy.get(".navbar", { timeout: 20000 }).should("exist");

  });


  context("Default Policies", () => {
    it("I can navigate to the Policies page", () => {
      cy.get('.navbar a[href="/dataprotection/policies"]', { timeout: 20000 })
      .should("contain", "POLICIES")
      .click();

      // 
      // Check if "Category" column exist
      // HTML: <th class="sortable" style="width: 100px;">Category<span class="order-4"></span></th>
      //
      cy.get('th[class="sortable"]', { timeout: 20000 })
      .should("contain", "Category")
      ;

    });
  });


  context("Policy Creation", () => {
    it("I can navigate to the Policies page", () => {
      cy.get('.navbar a[href="/dataprotection/policies"]', { timeout: 20000 })
      .should("contain", "POLICIES")
      .click();

      cy.get("#dataProtectionContainer").should("exist");

      //cy.pause();

      //
      // Ensure that the policy "TestLenses" is not already created 
      // 
      // Filter out the policy ("TestLenses")
      // HTML: <input class="form-control" type="text" placeholder=" Filter policies...">
      // 
      cy.get('input[class="form-control"]', { timeout: 20000 })
      //.should("contain", "Filter policies")
      .type("TestLenses")
      ;
      // 
      // Check if policy named "TestLenses" is not present
      // HTML: <a href="/dataprotection/policies/details/213e67d8-3905-4f01-a1e3-fee4e17da890">TestLenses</a>
      //
      cy.get("a")
      .should("not.contain", "TestLenses")
      ;

      // 
      // Open the "Add New Policy" form
      // 
      cy.get('button[class="btn btn-secondary btn-secondary-lenses"]')
      .should("contain", "New policy" )
      .click();

      // 
      // Type into "Name" input field
      // 
      cy.get("#name")
      .should("exist" )
      .type("TestLenses");

      // 
      // Type into "Redaction" input field
      // 
      cy.get("#obfuscation")
      .select("Initials");

      // 
      // Type into "Category" field
      // HTML: <div class="lenses-creatable-autocomplete__input" style="display: inline-block;"><input autocapitalize="none" autocomplete="off" autocorrect="off" id="react-select-6-input" spellcheck="false" tabindex="0" type="text" aria-autocomplete="list" value="" style="box-sizing: content-box; width: 2px; background: 0px center; border: 0px; font-size: inherit; opacity: 1; outline: 0px; padding: 0px; color: inherit;"><div style="position: absolute; top: 0px; left: 0px; visibility: hidden; height: 0px; overflow: scroll; white-space: pre; font-size: 13px; font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, Roboto, sans-serif, FontAwesome; font-weight: 400; font-style: normal; letter-spacing: normal; text-transform: none;"></div></div>
      cy.get("#react-select-2-input", { timeout: 20000 })           
      // Check autocomplete functionality
      .type("PI{enter}", { force:true })
      // Without checking autocomplete:
      //.type("Address{enter}", { force:true })
      ;
      
      // 
      // Selct "Impact"
      // 
      cy.get("#impactType")
      .select("HIGH");
      ;

      // 
      // Type in "Add a field"
      // HTML: <div class="react-tagsinput-input" style="display: inline-block;"><input type="text" placeholder="Add a field" value="" style="box-sizing: content-box; width: 63px;"><div style="position: absolute; top: 0px; left: 0px; visibility: hidden; height: 0px; overflow: scroll; white-space: pre; font-size: 13px; font-family: sans-serif; font-weight: 400; font-style: normal; letter-spacing: normal; text-transform: none;"></div><div style="position: absolute; top: 0px; left: 0px; visibility: hidden; height: 0px; overflow: scroll; white-space: pre; font-size: 13px; font-family: sans-serif; font-weight: 400; font-style: normal; letter-spacing: normal; text-transform: none;">Add a field</div></div>
      // 
      cy.get(".react-tagsinput-input")
      .should("contain", "Add a field" )
      .find("input")
      .type("TestField")
      ;

      // In order to enable "Save" Button
      cy.get("#name")
      .click()
      .click()
      ;

      cy.wait(2000); // *** 
//cy.pause();

      // 
      // Fire "save" button
      // HTML: <button type="submit" disabled="" class="btn btn-secondary btn-policy float-right mx-2 btn-success"><i icon="floppy-o" class="fa f fa-floppy-o mr-2" aria-hidden="true"></i>Save</button>
      // 
      cy.get('button[class="btn btn-secondary btn-policy float-right mx-2 btn-success"]')
      .should("contain", "Save" )
      .click()
      ;

      cy.wait(2000);

      cy.get(".navbar", { timeout: 20000 }).should("exist");    // ***

//cy.pause();

      // 
      // Confirm that policy was created
      //
      // Filter out the policy ("TestLenses")
      // HTML: <input class="form-control" type="text" placeholder=" Filter policies...">
      //
      cy.get('input[class="form-control"]', { timeout: 20000 })
      .type("TestLenses")
      ;
      // 
      // Check if policy named "TestLenses" is present
      // HTML: <a href="/dataprotection/policies/details/213e67d8-3905-4f01-a1e3-fee4e17da890">TestLenses</a>
      //
      cy.get("a")
      .should("exist");
      ;
      
    });
  });


  context("Policy Deletion", () => {
    it("I can navigate to the Policies page", () => {
      cy.get('.navbar a[href="/dataprotection/policies"]', { timeout: 20000 })
      .should("contain", "POLICIES")
      .click();
 
      // 
      // Filter out the policy to be deleted ("TestLenses")
      // HTML: <input class="form-control" type="text" placeholder=" Filter policies...">
      // 
      cy.get('input[class="form-control"]', { timeout: 20000 })
      .type("TestLenses")
      ;
      
      // 
      // Click delete policy
      // HTML: <a href="#" class="text-danger p-1 text-lg"><i icon="trash" class="fa f fa-trash " aria-hidden="true"></i></a>
      // 
      cy.get('a[class="text-danger p-1 text-lg"]', { timeout: 20000 }) // 
      .click()
      ;

//cy.pause();

      // 
      // Confirm to delete policy
      // 
      // HTML: <button type="button" class="btn btn-danger"><i icon="trash" class="fa f fa-trash mr-2" aria-hidden="true"></i>Delete</button>
      cy.get('button[class="btn btn-danger"]')
      .click()
      ;

      cy.wait(3000);  // ***
    });
  });


  context("Policy Deletion confirmation", () => {
    it("I can navigate to the Policies page", () => {
      cy.get('.navbar a[href="/dataprotection/policies"]', { timeout: 20000 })
      .should("contain", "POLICIES")
      .click();

      //cy.pause();

      // 
      // Filter out the policy ("TestLenses")
      // HTML: <input class="form-control" type="text" placeholder=" Filter policies...">
      // 
      cy.get('input[class="form-control"]', { timeout: 20000 })
      .type("TestLenses")
      ;
      // 
      // Check if policy named "TestLenses" is not present
      // HTML: <a href="/dataprotection/policies/details/213e67d8-3905-4f01-a1e3-fee4e17da890">TestLenses</a>
      //
      cy.get("a")
      .should("not.contain", "TestLenses")
      ;

    });
  });


});


