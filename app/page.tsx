import { getAllPasses } from "@/lib/passes";
import MapView from "@/components/MapView";

export default function Home() {
  const passes = getAllPasses();
  return <MapView passes={passes} />;
}
