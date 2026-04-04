import { Pass } from "@/types/pass";
import passesRaw from "@/data/passes.json";

export function getAllPasses(): Pass[] {
  return passesRaw as Pass[];
}

export function getPassById(id: string): Pass | null {
  return (passesRaw as Pass[]).find(p => p.id === id) ?? null;
}
