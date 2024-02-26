// https://www.youtube.com/watch?v=16yMmAJSGek
// https://www.youtube.com/watch?v=I7dwJxGuGYQ
import React, {createContext, useState} from 'react';

export const updateDict = (key, value) => {
    setIsLoading(true);
    setDict({...dict, [key]: value});
};   

export default function DictContextProvider({children}) {
    const [dict, setDict] = useState({
        eventName: eventName,
        scouterName: user.name,
        teamNumber: teamNumber,
        matchNumber: matchNumber,
        matchType: matchType, // qualification, practice, or elimination
        driveStation: driveStation,
        alliance: driveStation < 4 ? 'RED' : 'BLUE', // red or blue
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
        // robotType: 'EMPTY', // AMP_SCORER, SPEAKER_SCORER, BOTH_SCORER, Default: EMPTY
        timeOfCreation: '',
    });

    return (
        <DictContextProvider.Provider value={{dict, updateDict}}>
            {children}
        </DictContextProvider.Provider>
    );
}