describe('Country List', () => {
    it('page loads successfully', () => {
        cy.visit('http://localhost:3000')
        cy.get('h1').should('contain.text', 'Country Filter')
        cy.get('label').should('contain.text', 'Enter country code : ')
        cy.get('button').should('contain.text', 'Refresh')
    })

    it('initial api data fetch', () => {
        cy.request({
                method: 'POST',
                url: 'https://countries.trevorblades.com/',
                body: {
                  query: `query {
                    countries {
                       code
                       name
                    }
                  }`,
                },
            }).then((response) => { cy.wrap(response.body.data.countries).should('have.length', 250) })
    })

    it('check for user input data as EE', () => {
        let countryCode
        cy.get('input[name="country-code"]').invoke('val', '');
        cy.get('input[name="country-code"]').type("EE").as('code')
        cy.get('@code').then((val) => {
            countryCode = val[0].value
            cy.request({
                method: 'POST',
                url: 'https://countries.trevorblades.com/',
                body: {
                  query: `query {
                    country(code: "${countryCode}") {
                      code  
                      name
                    }
                  }`,
                },
            }).then((response) => { expect(response.body.data.country.name).to.eq('Estonia') })
        })
    })

  })