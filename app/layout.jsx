import "./globals.css";
export const metadata = { title: "Charles Andrei — Portfolio", description: "Portfolio of Charles Andrei, a full-stack developer." };
export default function RootLayout({ children }) { return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mrs+Saint+Delafield&display=swap"/></head><body>{children}</body></html>; }
