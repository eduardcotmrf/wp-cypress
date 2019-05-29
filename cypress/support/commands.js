// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-file-upload';

Cypress.Commands.add('generateSite', () => {
	return cy.request({
		url: 'http://wpsandbox.pro/create?src=delighted-chamois&key=SSHsPhIm7g6zIj5t',
		method: 'GET'
	}).then((resp) => {
		const url = resp.redirects[0].split(': ')[1];
		return {
			url: url.split('?')[0],
			urlWithPass: url
		};
	})
});