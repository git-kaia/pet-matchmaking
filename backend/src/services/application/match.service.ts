// match.service.ts
/**
 * Match Service (Application Layer - Orchestrator)
 *
 * Responsible for coordinating the full matching process.
 *
 * Responsibilities:
 * - Retrieve adopter and pet data from services/repositories
 * - Select appropriate matching pipeline via the matching engine (dispatcher)
 * - Execute matching process
 * - Return ranked match results
 *
 * This service does NOT implement matching logic itself.
 * It delegates all evaluation to the matching domain layer.
 */