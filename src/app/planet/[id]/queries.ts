import OutpostService from "@/services/OutpostService";

const outpostService = await OutpostService.get();

export async function getOutposts(planetId: string) {
  return await outpostService.getAll(planetId);
}
