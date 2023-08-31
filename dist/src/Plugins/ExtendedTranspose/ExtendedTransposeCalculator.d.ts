import { ITransposeCalculator, Pitch, KeyInstruction, OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import { TransposeOptions } from "./TransposeOptions";
export interface IExtendedTransposeCalculator extends ITransposeCalculator {
    Options?: TransposeOptions;
    transposePitch(pitch: Pitch, currentKeyInstruction: KeyInstruction, halftones: number): Pitch;
    transposeKey(keyInstruction: KeyInstruction, transpose: number): void;
}
export declare class ExtendedTransposeCalculator implements IExtendedTransposeCalculator {
    private osmd;
    Options: TransposeOptions;
    constructor(osmd?: OpenSheetMusicDisplay);
    test(): void;
    get MainKey(): number;
    private pitchToComma;
    private pitchToDegree;
    private commaToPitch;
    transposePitch(pitch: Pitch, currentKeyInstruction: KeyInstruction, halftones: number): Pitch;
    transposeKey(keyInstruction: KeyInstruction, transpose: number): void;
}
