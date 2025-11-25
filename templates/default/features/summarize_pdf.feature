Feature: Summarize claim PDFs
  As a claims adjuster
  I want to summarize a claim PDF
  So that I can triage risk quickly without missing clauses.

  Background:
    Given the system is configured with approved policy sources

  Scenario: Summary includes risk clause and uncertainty
    Given a claim PDF with a payout cap clause
    When I request a summary
    Then the summary should mention the payout cap
    And the risk clauses list should include "cap at $10,000"

  Scenario: Uncertain cause is flagged
    Given a claim PDF with ambiguous damage cause
    When I request a summary
    Then the response should state uncertainty explicitly
