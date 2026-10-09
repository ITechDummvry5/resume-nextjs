import LegacyPage from "@/components/LegacyPage";
import pages from "@/content/pages.json";
export const metadata = { title: pages["/skills"].title, description: pages["/skills"].description };
export default function Page() { return <LegacyPage page={pages["/skills"]} />; }
