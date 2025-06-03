import Rand from "rand-seed";
import randomNumber from "./randomNumber";

const lowercaseAsciiStart = 97;

export const randomLetter = (rand: Rand) => {
  const letterIndex = randomNumber(rand, 0, 26);
  const letter = String.fromCharCode(lowercaseAsciiStart + letterIndex);
  return letter;
};
