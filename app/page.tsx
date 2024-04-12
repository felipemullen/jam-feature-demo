import { HighlightFeature } from './components/highlighting/highlight-feature.component';

export default function HomePage() {
    return (
        <main className="h-full pb-6">
            <div className="flex flex-grow h-full max-w-screen-2xl m-auto">
                <HighlightFeature image="/image/screenshot.png" />
            </div>
        </main>
    );
}
