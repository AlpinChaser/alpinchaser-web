import { getAllPasses, getPassById } from "@/lib/passes";
import { notFound } from "next/navigation";
import PassDetailPage from "@/components/PassDetailPage";
import type { Metadata } from "next";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return getAllPasses().map(p => ({ id: p.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const pass = getPassById(params.id);
  if (!pass) return { title: "Pass nicht gefunden" };

  const title = `${pass.name} (${pass.elevation}m) | AlpinChaser`;
  const description = `${pass.heroClaim} — ${pass.mustRideDescription.slice(0, 140)}`;

  return {
    title,
    description,
    openGraph: {
      title: `${pass.name} — ${pass.elevation}m`,
      description,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${pass.name} — ${pass.elevation}m`,
      description,
    },
  };
}

export default function Page({ params }: Props) {
  const pass = getPassById(params.id);
  if (!pass) notFound();

  const allPasses = getAllPasses();

  return <PassDetailPage pass={pass} allPasses={allPasses} />;
}
