import LegacyPage from "@/components/LegacyPage";
import pages from "@/content/pages.json";
export const metadata = { title: pages["/"].title, description: pages["/"].description };
export default function Page() { return <LegacyPage page={pages["/"]} />; }
