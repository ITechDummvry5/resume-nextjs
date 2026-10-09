import LegacyPage from "@/components/LegacyPage";
import pages from "@/content/pages.json";
export const metadata = { title: pages["/contact"].title, description: pages["/contact"].description };
export default function Page() { return <LegacyPage page={pages["/contact"]} />; }
