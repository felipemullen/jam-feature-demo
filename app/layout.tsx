import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Jamdotdev - Highlighter Feature Demo',
    description: 'A hopeful submission to the team at Jam for a developer position.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
