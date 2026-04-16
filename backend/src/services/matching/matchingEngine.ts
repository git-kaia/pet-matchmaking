// matchingEngine.ts
/**
 * Matching Engine (Dispatcher)
 *
 * Responsible for selecting the correct matching pipeline
 * based on the pet type (e.g. bird, dog, etc.).
 *
 * This enables the system to support multiple species
 * while keeping matching logic modular and extensible.
 */

getMatchingService(petType: string) {
  switch (petType) {
    case "bird":
      return birdMatchingService;
    case "dog":
      return dogMatchingService;
    case "cat":
        return catMatchingService;
    case "rodent":
      return rodentMatchingService;
    case "reptile":
      return reptileMatchingService;
    case "amphibian":
      return amphibianMatchingService;
    case "fish":
      return fishMatchingService;
    default:
      return genericMatchingService;
  }
}