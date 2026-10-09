import LegacyPage from "@/components/LegacyPage";
import pages from "@/content/pages.json";
export const metadata = { title: pages["/projects"].title, description: pages["/projects"].description };
export default function Page() { return <LegacyPage page={pages["/projects"]} />; }
