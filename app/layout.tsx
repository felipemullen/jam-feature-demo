import type { Metadata } from 'next';
import { Header } from './components/header.component';
import './globals.css';

export const metadata: Metadata = {
    title: 'Jamdotdev - Highlighter Feature Demo',
    description: 'A hopeful submission to the team at Jam for a developer position.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="h-screen">
            <body style={{ overscrollBehavior: 'none' }} className="h-screen">
                <div className="h-full flex flex-col">
                    <Header />
                    {children}
                </div>
            </body>
        </html>
    );
}
