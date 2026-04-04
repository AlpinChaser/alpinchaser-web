import { Pass } from "@/types/pass";
import passesRaw from "@/data/passes.json";

export function getAllPasses(): Pass[] {
  return passesRaw as Pass[];
}
