describe('Activating a MarfeelPress', function() {

	let url;

	before( () => {
		cy.on('uncaught:exception', (err, runnable) => {
			return false
		});

		cy.generateSite().then((payload) => {

			url = payload.url;

			cy.visit(payload.urlWithPass, {
					onBeforeLoad: (win) => {
					win.onerror = null
				}
			});

			cy.visit(`${payload.url}/wp-login.php?action=logout`, {
				failOnStatusCode: false
			});
			cy.get('a').click();

			cy.get("#user_login").type("test");
			cy.get("#user_pass").type("12345");
			cy.get("#wp-submit").click();

			cy.get("a.menu-icon-plugins").click();
			cy.get('a.page-title-action').click();
			cy.get('a.upload-view-toggle.page-title-action').click();

			const fileName = 'marfeelpress.zip';

			cy.fixture('/marfeelpress.2.0.1964.zip').then(fileContent => {
				cy.get('input[name=pluginzip]').upload(
					{ fileContent, fileName, mimeType: 'application/zip' },
					{ subjectType: 'input' },
					);
			})

			cy.get("input[name=install-plugin-submit]").click();
		})
  });

	it('Activating for the first time', function() {

		cy.visit(`${url}wp-admin/plugins.php`);
		cy.get('tr[data-slug=marfeelpress] a.edit').click();

		cy.visit(`${url}wp-admin/admin.php?page=onboarding`);

		cy.wait(30000);
		
		cy.get('button.mrf-onboarding-panle__activate-button').click();

		cy.wait(2000);

		// GO TO POST ONBOARDING
		cy.visit(`${url}wp-admin/admin.php?page=onboarding`);
		cy.get('.wizard-list');

		// waiting for marfeel to be compiled
		cy.wait(300000);

		cy.visit(url);
		cy.get('script[data-mrf-script="garda"]');
	});

	after( () => {


		/*cy.visit(`${url}/wp-admin/plugins.php`);

		cy.get('tr[data-slug=marfeelpress] a.delete').click();*/

		//TODO remove tenant from Insight!

    } );
})