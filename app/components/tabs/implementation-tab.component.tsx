import { Accordion } from '../accordion.component';
import { Keyword } from '../typeography.component';

export function ImplementationTab() {
    return (
        <div className="p-6 animate-fadeIn text-base text-gray-700">
            <section className="">
                <h2 className="text-2xl font-semibold text-gray-600 mb-4">Implementation</h2>
                <p className="text-gray-600 mb-4">
                </p>
            </section>

            <section className="">
                <Accordion title="Tech Stack">
                    <ul className="list-disc ml-6">
                        <li>
                            <a href="https://nextjs.org/" target="_blank" className="text-blue-500">Next.js</a>
                            <span> / </span>
                            <a href="https://reactjs.org/" target="_blank" className="text-blue-500">React</a>
                            <span> - Runs this whole thing</span>
                        </li>
                        <li>
                            <a href="https://bun.sh/" target="_blank" className="text-blue-500">Bun</a> - Using Bun instead of Node
                        </li>
                        <li>
                            <a href="https://tailwindcss.com/" target="_blank" className="text-blue-500">Tailwind CSS</a> - All CSS styling
                        </li>
                        <li>
                            <a href="https://reactjs.org/" target="_blank" className="text-blue-500">tesseract.js</a> - OCR library for JavaScript
                        </li>
                        <li>
                            <a href="https://www.docker.com/" target="_blank" className="text-blue-500">Docker</a> - Containerization for deployment
                        </li>
                        <li>
                            <a href="https://railway.app/" target="_blank" className="text-blue-500">Railway</a> - Deployment platform
                        </li>
                        <li>
                            <a href="https://eslint.org/" target="_blank" className="text-blue-500">ESLint</a> - Linting
                        </li>
                        <li>
                            <a href="https://jestjs.io/" target="_blank" className="text-blue-500">Jest</a> - Testing
                        </li>
                    </ul>
                </Accordion>
            </section>

            <section className="">
                <Accordion title="Challenges">
                    <h2 className="text-lg font-semibold text-gray-600 mb-4">1. OCR Overlay scaling</h2>
                    <p className="my-3">
                        Overlaying the OCR results on top of the image was not as straightforward as it might seem.
                    </p>
                    <p className="my-3">
                        The first issue is the scaling of the image according to the <Keyword text="object-fit" /> property of the layout.
                        This requires a calculation of the scaling ratio between the image loaded by the <Keyword text="DOM" /> and the
                        CSS-transformed image that will fill it&apos;s container.
                    </p>
                    <p className="my-3">
                        The second issue is that Next.js does image optimization, which meant that the image in the <Keyword text="DOM" /> is
                        served at a different resolution than the original image. This causes an incorrect scaling ratio
                        to be calculated if using the <Keyword text="naturalWidth" /> and <Keyword text="naturalHeight" /> properties of the image.
                        The solution is to not use the <Keyword text="Image" /> component, but instead use a regular <Keyword text="img" /> tag.
                    </p>

                    <h2 className="text-lg font-semibold text-gray-600 mt-6 mb-4">2. OCR Overlay Interaction</h2>
                    <p className="my-3">
                        There were two approaches that came to mind, both of which I tried:
                    </p>
                    <ul className="list-disc ml-6">
                        <li>Use the areas in the OCR calculation as individual canvas areas for the user to draw on</li>
                        <li>Use a single canvas overlay on top of the image, and use the OCR data to determine where lines can be drawn.</li>
                    </ul>
                    <p className="my-3">
                        The first approach was easier, since I had already implemented a <Keyword text="<HighlightArea />" /> component for
                        tracking the OCR regions, and that could be used to handle the drawing by itself. Unfortunately, this turned out to be
                        a <strong>poor user experience</strong>, since the areas were not perfectly aligned, and you couldn&apos;t keep your mouse down from one
                        area to the next.
                    </p>
                    <p className="my-3">
                        The second approach was trickier, and <strong>more computationally intensive</strong>. I had to calculate the intersection of the
                        OCR regions with the position of the mouse at each movement, and then draw the lines from point to point.
                        It also made the layer data larger, which required an implementation for merging the lines.
                    </p>

                    <h2 className="text-lg font-semibold text-gray-600 mt-6 mb-4">3. Merging output data</h2>
                    <p className="my-3">
                        This wasn&apos;t too great of a challenge, but it involved some maths. The canvas implementation
                        creates dozens of lines from point to point, wherever the mouse moves. In order to have a more
                        manageable data structure (for export / later edit / fun challenges),
                        <strong> I merged the lines by checking if the distance</strong> between one point and
                        the next was less than a certain threshold.
                    </p>
                    <p className="my-3">
                        In short, if the end of one line is less than the threshold distance to the start of the next line,
                        they are merged into a single line. Works great! 🎉 <br />
                        ...that is, until you move your mouse from right to left. 😅 <br />
                        A fix would not be too difficult, but it was not a priority for this demo.
                    </p>
                    <h2 className="text-lg font-semibold text-gray-600 mt-6 mb-4">4. All components were implemented from scratch</h2>
                    <p className="my-3">
                        A minor challenge, but worth a mention nonetheless. I love working with backend code, but all those
                        engineers claiming to <em>enjoy a tough problem</em> that refuse to work on front end code are missing
                        out on CSS hell 🔥.
                        I am glad I have my trusty friend Tailwind to help me out.
                    </p>
                    <p className="my-3">
                        I actually tried using <Keyword text="mix-blend-mode" /> to see if I could make those highlights ⭐️pop⭐️, but
                        it didn&apos;t work as I hoped. I scratched that attempt.
                    </p>
                </Accordion>
            </section>

            <section className="">
                <Accordion title="Future Improvements">
                    <p className="mb-2">
                        Of course, there are things that could be improved. Since this is just a demo I didn&apos;t want to spend
                        too much time on the project beyond the main task, so here is a list of potential improvements:
                    </p>
                    <ul className="list-disc ml-6">
                        <li>The lines produced by the OCR library aren&apos;t perfect. Needs tweaking and real word detection</li>
                        <li>Resizing the window does not recompute the overlay sizing. This shouldn&apos;t be very difficult</li>
                        <li>There is no dark mode. Seems to be an app killer these days.</li>
                        <li>A button to CLEAR all the existing highlights could be useful</li>
                        <li>Import / Export of highlight data</li>
                    </ul>
                </Accordion>
            </section>
        </div>
    );
}