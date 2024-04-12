import { HighlightFeature } from './components/highlighting/highlight-feature.component';

export default function HomePage() {
    return (
        <main className="flex h-screen flex-col items-center justify-between p-12">
            <h1 className="text-4xl font-extrabold text-gray-600 mb-6">Image Highlighting</h1>
            <div className="h-full w-full flex text-sm">
                <HighlightFeature image="/image/screenshot.png" />
            </div>
        </main>
    );
}
