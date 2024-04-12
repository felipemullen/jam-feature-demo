import { it, expect, describe, beforeEach } from 'bun:test';
import { getContainedSize, mergeStrokes } from '@/app/util/image-util';

describe('image-util.ts', () => {
    describe('getContainedSize', () => {
        let image: {
            naturalWidth: number;
            naturalHeight: number;
            height: number;
            width: number;
        };

        beforeEach(() => {
            image = {
                naturalWidth: 1000,
                naturalHeight: 600,
                width: 500,
                height: 300
            }
        });

        it('calculates the correct scaling ratio', () => {
            const result = getContainedSize(image as any);
            expect(result.scalingRatio).toBe(0.5);
        });

        it('calculates the correct top position', () => {
            const result = getContainedSize(image as any);
            expect(result.top).toBe(0);
        });

        it('calculates the correct left position', () => {
            const result = getContainedSize(image as any);
            expect(result.left).toBe(0);
        });

        it('calculates the correct width', () => {
            const result = getContainedSize(image as any);
            expect(result.width).toBe(500);
        });

        it('calculates the correct height', () => {
            const result = getContainedSize(image as any);
            expect(result.height).toBe(300);
        });
    });

    describe('mergeStrokes', () => {
        it('merges strokes that are within threshold distance', () => {
            const strokes = [
                { left: 0, top: 0, width: 10, height: 10 },
                { left: 15, top: 0, width: 10, height: 10 },
                { left: 20, top: 0, width: 10, height: 10 },

                // This stroke is too far away
                { left: 100, top: 0, width: 10, height: 10 }
            ];

            const result = mergeStrokes(strokes, 25);
            expect(result.length).toEqual(2);
        });

        it('merges strokes and combines their size', () => {
            const strokes = [
                { left: 0, top: 0, width: 22, height: 10 },
                { left: 24, top: 0, width: 30, height: 10 }
            ];

            const result = mergeStrokes(strokes, 5);
            expect(result).toEqual([{ left: 0, top: 0, width: 52, height: 10 }]);
        });
    });
});