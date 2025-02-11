describe('Namespace page', () => {
  beforeEach(() => {
    cy.interceptApi();

    cy.visit('/namespaces/default');

    cy.wait('@namespace-api');
  });

  it('have the correct namespace information with labels', () => {
    cy.get('[data-cy="namespace-title"]').should(
      'to.contain',
      'Namespace: default',
    );
    cy.get('[data-cy="namespace-description"]').should(
      'to.contain',
      'Description: Default namespace for Temporal Server.',
    );
    cy.get('[data-cy="namespace-owner"]').should(
      'to.contain',
      'Owner: Unknown',
    );
    cy.get('[data-cy="namespace-global"]').should('to.contain', 'Global? No');
    cy.get('[data-cy="namespace-retention"]').should(
      'to.contain',
      'Retention Period: 1 day',
    );
    cy.get('[data-cy="namespace-history"]').should(
      'to.contain',
      'History Archival: Disabled',
    );
    cy.get('[data-cy="namespace-visibility"]').should(
      'to.contain',
      'Visibility Archival: Disabled',
    );
    cy.get('[data-cy="namespace-failover"]').should(
      'to.contain',
      'Failover Version: 0',
    );
    cy.get('[data-cy="namespace-clusters"]').should(
      'to.contain',
      'Clusters: us-east1 (active), us-east2',
    );
  });
});
