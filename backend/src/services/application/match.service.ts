// Orchestrates the matching process
// Handles:
// Runs hard rules first
// Calls scoringService
// Sorts + filters results
// Returns final matches
// Think: “what do we actually show the user?”

// getMatches(user) {
//   const pets = fetchPets();

//   return pets
//     .map(pet => {
//       if (hardRuleService.isRejected(user, pet)) return null;

//       const score = scoringService.calculate(user, pet);

//       return { pet, score };
//     })
//     .filter(Boolean)
//     .sort(byScore);
// }