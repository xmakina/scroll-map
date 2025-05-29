import resetDb from "./reset-db";

export default async function () {
  console.log("setting up");
  await resetDb();
}
