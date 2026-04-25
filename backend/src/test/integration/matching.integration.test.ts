/**
 * Matching Integration Test
 *
 * Tests the full matching flow using real application services.
 *
 * Responsibilities:
 * - Retrieve adopters and pets from the service layer
 * - Execute matching pipelines via the dispatcher
 * - Apply hard rules and scoring rules together
 * - Output final match results
 *
 * This test validates that all parts of the system work together correctly.
 * It relies on real data and does not isolate individual rules.
 */