import { uniqueNamesGenerator } from "unique-names-generator";

export default function (...dictionaries: string[][]) {
  const shortName: string = uniqueNamesGenerator({
    dictionaries: dictionaries,
    separator: " ",
    style: "capital",
  });

  return shortName;
}
