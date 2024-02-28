import { create } from 'zustand';

export const useDictStore = create((set) => ({
    dict: {
        eventName: '',
        scouterName: '',
        teamNumber: '',
        matchNumber: '',
        matchType: '', // qualification, practice, or elimination
        driveStation: '',
        alliance: '', // red or blue
        preloaded: null, // true or false
        robotLeft: null, // true or false
        autonSpeakerNotesScored: 0,
        autonAmpNotesScored: 0,
        autonMissed: 0,
        autonNotesReceived: 0,
        autonIssues: [], // NOT_MOVING, STOPPED, OUT_OF_CONTROL, Default: EMPTY
        telopSpeakerNotesScored: 0,
        telopAmpNotesScored: 0,
        telopAmplifiedSpeakerNotes: 0,
        telopSpeakerNotesMissed: 0,
        telopAmpNotesMissed: 0,
        telopNotesReceivedFromHumanPlayer: 0,
        telopNotesReceivedFromGround: 0,
        endGame: 'EMPTY', // PARKED, ONSTAGE, SPOTLIGHT, Default: EMPTY
        trap: 0,
        fouls: 0,
        techFouls: 0,
        yellowCards: 0,
        redCards: 0,
        telopIssues: [], // NOT_MOVING, LOST_CONNECTION, FMS_ISSUES, DISABLED, Default: EMPTY
        didTeamPlayDefense: null, // YES, NO, Default: null
        timeOfCreation: '',
    },
    setDict: (key, value) => set((state) => ({ dict: {...state.dict, [key]: value} })),
}))