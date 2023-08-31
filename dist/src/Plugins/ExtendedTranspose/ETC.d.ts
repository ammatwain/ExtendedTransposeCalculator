/****************************************************************************/
/****************************************************************************/
export interface ETCPitch {
    fundamentalNote: number;
    alterations: number;
    octave: number;
}
export declare type ETCDirections = "down" | "up";
export interface ETCProximity {
    from: number;
    to: number;
    distanceUp: number;
    distanceDown: number;
    up: number;
    closest: number;
    down: number;
    closestIs: ETCDirections;
}
export declare class ETC {
    /******************************************** BEGIN PRIVATE *********************************************/
    private static version;
    private static fifhtyLeapNotes;
    private static fundamentalAscendingNotes;
    private static fundamentalDescendingNotes;
    private static fundamentalAscendingCommas;
    private static fundamentalDescendingCommas;
    private static octaveSize;
    private static commaOctaveLowKey;
    private static commaOctaveHighKey;
    private static commaFifhtyLeap;
    private static multiplicativeInverseOfCommaFifhRespectToCommaOctave;
    private static minDrawableKey;
    private static maxDrawableKey;
    private static keysAboveOctave;
    private static commasAboveOctave;
    private static keysBelowOctave;
    private static commasBelowOctave;
    private static keyChromaticFactor;
    private static keyDiatonicFactor;
    static commaIntervals: any;
    private static diatonicSemitones;
    private static chromaticSemitones;
    /**
     * **ETC.computeKeyRelation** method establishes a key relationship between
     * the main key and the key to which it is intended to transpose. The achieved
     * result should not be reduced through key simplification operations.
     * The key relationship is a straightforward operation: TransposedKey - MainKey.
     * The recovery of the transposedKey is equally simple:
     * transposedKey = keyRelation + MainKey
     * The obtained value serves to bypass the issue of OSMD not responding when
     * a transpose value of 0 is given.
     * @param mainKey
     * @param transposeKey
     * @returns number
     */
    static computeKeyRelation(mainKey: number, transposeKey: number): number;
    static recoverTransposedKey(mainKey: number, keyRelation: number): number;
    /**
     * **ETC.extendedEuclidean** method is an extended Euclid's algorithm to calculate GCD and Bézout coefficients
     * @param a number
     * @param b number
     * @returns [number,number,number]
     */
    private static extendedEuclidean;
    /**
     * **ETC.findInverse** method find the multiplicative inverse of "a" with respect to "m"
     * @param a number
     * @param m number
     * @returns number
     */
    private static findInverse;
    /**
     * **ETC.keyPrimitiveOrigin** method return the primitive original value of the the key
     * @param key number
     * @returns a number from 0 to 6
     */
    private static keyPrimitiveOrigin;
    /**
     * **ETC.keyFundamentalNote** method return the semitonal value of the primitive value of key
     * NB: int this context F is surclassed by F#
     * @param key
     * @returns number
     */
    private static keyFundamentalNote;
    /**
     * **ETC.keyAlterations** method return the alteration value of the key
     * @param key
     * @returns number
     */
    private static keyAlterations;
    /**
     * **ETC.commaToDegree** method returns a value representing the degree of the comma in the key context passed as a parameter.
     * @param comma number
     * @param majorKey number
     * @returns number
     */
    private static commaToDegree;
    /**
     * **ETC.commaToCommaProximity** method returns an object containing the proximity values between "comma" anmd "toComma".
     * In particular, "toComma" is presented with two alternatives placed in different octaves,
     * so that you can choose the most convenient direction to go from "comma" to "toComma".
     * @param comma number
     * @param toComma number
     * @returns ETCProximity
     */
    private static commaToCommaProximity;
    /********************************************  END PRIVATE  ********************************************/
    /******************************************** BEGIN PUBLIC *********************************************/
    /**
     * **ETC.KeyChromaticFactor** getter get the chromatic factor constant (7)
     */
    static get KeyChromaticFactor(): number;
    /**
     * **ETC.KeyDiatonicFactor** getter get the diatonic factor constant (-5)
     */
    static get KeyDiatonicFactor(): number;
    /**
     * **ETC.OctaveSize** getter get the size of octave, expressed in comma
     */
    static get OctaveSize(): number;
    /**
     * **ETC.commaToDrawablePitch** method search and select, among the available homophonic commas,
     * the first one that has an absolute value of alterations equal to or less than 3
     * compared to the comma passed as a parameter.
     * @param comma
     * @returns ETCPitch
     */
    static commaToDrawablePitch(comma: number): ETCPitch;
    /**
     * **ETC.commaToKey** method return the scalar key value of the comma
     * @param comma number
     * @returns number
     */
    static commaToKey(comma: number): number;
    /**
     * **ETC.commaToPitch** method is one of ETC core functions.
     * It converts the comma, which is a scalar value, to the pitch,
     * which is a type of vector-like value.
     * @param comma number
     * @returns ETCPitch;
     */
    static commaToPitch(comma: number): ETCPitch;
    /**
     * **ETC.chromaticSemitone** method returns the transpositional chromatic interval value of the parameter 'semitone'.
     * NB: param **semitone** does not need to be modulated by 12 because the function will perform this operation internally.
     * Tip: To achieve the best possible result, this function should be used with ***major keys < 0***
     * @param semitone number
     * @returns number
     */
    static chromaticSemitone(semitone: number): number;
    /**
     * **ETC.degreeToPitch** method method a ETCPitch of a "degree" recalculated in "majorKey" context passed as a parameter.
     * @param degree
     * @param majorKey
     * @returns ETCPitch
     */
    static degreeToPitch(degree: number, majorKey?: number): ETCPitch;
    /**
     * **ETC.diatonicSemitone** method returns the transpositional diatonic interval value of the parameter 'semitone'.
     * NB: param **semitone** does not need to be modulated by 12 because the function will perform this operation internally.
     * Tip: To achieve the best possible result, this function should be used with ***major keys >= 0***
     * @param semitone number
     * @returns number
     */
    static diatonicSemitone(semitone: number): number;
    /**
     * **ETC.keyToKeyProximity** method returns an object containing the proximity values between key and toKey.
     * The comma of the diminished fifth is closer than the comma of the augmented fourth.
     * This is okay, but on the staff, the visually larger distance is chosen.
     * ***swapTritoneSense*** is a boolean value that provides a small workaround
     *  by inverting the value of "closestIs" when it encounters this type of situation.
     * @param key mumber
     * @param toKey mumber
     * @param swapTritoneSense boolean
     * @returns ETCProximity
     */
    static keyToKeyProximity(key: number, toKey: number, swapTritoneSense?: boolean): ETCProximity;
    /**
     * **ETC.keyToPitch** method is an alternative to find the pitch starting from a key modulated in EDO-77
     * NB: This is an internal function of ETC, publicly exposed only to simplify parameter
     * passing with external Transpose Calculators.
     * @param key
     * @returns ETCPitch
     */
    static keyToPitch(key: number): ETCPitch;
    /**
     * **ETC.keyOctave** method returns the reference octave of the key passed as a parameter.
     * NB: This is an internal function of ETC, publicly exposed only to simplify parameter
     * passing with external Transpose Calculators.
     * @param key number
     * @returns number
     */
    static keyOctave(key: number): number;
    /**
     * **ECT.keyToComma** method returns the comma associated of the key passed as a parameter.
     * @param key
     * @returns number
     */
    static keyToComma(key: number): number;
    /**
     * **ETC.pitchToComma** method is one of ETC core functions.
     * It converts the pitch, which is a type of vector-like value,
     * to the comma which is a scalar value.
     * @param pitch ETCPitch
     * @returns number
     */
    static pitchToComma(pitch?: ETCPitch): number;
    /**
     * **ETC.pitchToDegree** method returns a value representing the degree of the "pitch" in the "mahorKey" context passed as a parameter.
     * @param pitch
     * @param majorKey
     * @returns number
     */
    static pitchToDegree(pitch?: ETCPitch, majorKey?: number): number;
    /**
     * ETC.pitchToKey method is an alternative to find the modulated key in EDO-77 starting from a pitch.
     * NB: This is an internal function of ETC, publicly exposed only to simplify parameter
     * passing with external Transpose Calculators.
     * @param pitch
     * @returns number
     */
    static pitchToKey(pitch?: ETCPitch): number;
    /**
     * **ETC.FundamentalNotes** getter
     */
    static get FundamentalNotes(): number[];
    /**
     * ETC.FundamentalCommas getter
     */
    static get FundamentalCommas(): number[];
    /**
     * Everything is a key, that's the underlying concept of ETC.
     * **ETC.keyToMajorKey** method function ensures that this key
     * is brought back into the circle of fifths set.
     * @param key a number
     * @returns a number from -7 to +7
     */
    static keyToMajorKey(key: number): number;
    /**
     * Everything is a key, that's the underlying concept of ETC.
     * **ETC.keyToSimplifiedMajorKey**  method returns a simplified MajorKey within the range of -6 to 5
     * is brought back into the circle of fifths set.
     * @param key a number
     * @returns a number from -5 to +6
     */
    static keyToSimplifiedMajorKey(key: number): number;
    /**
     * ***ETC.Version*** getter return the ETC version.
     */
    static get Version(): string;
}
