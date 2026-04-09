// Dispatcher (species handler)

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