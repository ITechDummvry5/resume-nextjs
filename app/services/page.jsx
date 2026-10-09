import LegacyPage from "@/components/LegacyPage";
import pages from "@/content/pages.json";
export const metadata = { title: pages["/services"].title, description: pages["/services"].description };
export default function Page() { return <LegacyPage page={pages["/services"]} />; }
