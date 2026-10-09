import LegacyPage from "@/components/LegacyPage";
import pages from "@/content/pages.json";
export const metadata = { title: pages["/about"].title, description: pages["/about"].description };
export default function Page() { return <LegacyPage page={pages["/about"]} />; }
