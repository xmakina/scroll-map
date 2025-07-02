import {
  adjectives,
  animals,
  colors,
  names,
  NumberDictionary,
} from "unique-names-generator";
import generateUniqueName from "./generateUniqueName";

export default class {
  static ForShips() {
    return generateUniqueName(adjectives, animals);
  }

  static ForStations() {
    return generateUniqueName(adjectives, colors);
  }

  static ForOutposts() {
    return generateUniqueName(
      colors,
      names,
      NumberDictionary.generate({ min: 5, max: 49 })
    );
  }
}
