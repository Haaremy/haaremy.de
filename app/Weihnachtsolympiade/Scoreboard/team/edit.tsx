"use client"
import { useState, useEffect } from 'react';
import Saved from './saved';

type GameData = {
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  pT: number;
  stamp: string;
}[];

interface TeamData {
  name: string;
  punkte: number;
  player1: string;
  player2: string;
  player3: string;
  player4: string;
  games: {
    game1: GameData;
    game2: GameData;
    game3: GameData;
    game4: GameData;
    game5: GameData;
    game6: GameData;
    game7: GameData;
    game8: GameData;
    game9: GameData;
    game10: GameData;
    game11: GameData;
    game12: GameData;
    game13: GameData;
    game14: GameData;
    game15: GameData;
    game16: GameData;
    game17: GameData;
    game18: GameData;
    game19: GameData;
    game20: GameData;
    game21: GameData;
    game22: GameData;
    game23: GameData;
    game24: GameData;
  };
}

type TeamRefs = {
  ids: string[];
  pins: string[];
};

export default function EditTeam({ teams }: { teams: TeamRefs }) {
  const { ids, pins } = teams;
  const [teamQuery, setTeamQuery] = useState('');
  const [pinQuery, setPinQuery] = useState('');
  const [teamData, setTeamData] = useState<{ [key: string]: TeamData }>({});
  const [showEditor, setshowEditor] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedID, setSelectedID] = useState(""); // zum speichern der Datei
  const [showSaved, setShowSaved] = useState(false); // Speicherbestätigung Popup
  const [showNotSaved, setShowNotSaved] = useState(false); // Speicher fehler Popup
  const [errorMessage, setErrorMessage] = useState("");
  const handleNotSavedOpen = () => setShowNotSaved(true);
  const handleNotSavedlClose = () => setShowNotSaved(false);
  const handleSavedOpen = () => setShowSaved(true);
  const handleSavedlClose = () => setShowSaved(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamData>({
    name: '',
    punkte: 0,
    player1: '',
    player2: '',
    player3: '',
    player4: '',
    games: {
      game1: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game2: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game3: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game4: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game5: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game6: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game7: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game8: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game9: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game10: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game11: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game12: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game13: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game14: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game15: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game16: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game17: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game18: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game19: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game20: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game21: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game22: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game23: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game24: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
    },
  });

  const humanReadableTimestamp = new Date(Date.now()).toLocaleString('de-DE', {
    day: 'numeric',
    month: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const createTeamFile = async (name: string) => {
    const newTeam: TeamData = {
          name: "",
          punkte: 0,
          player1: "",
          player2: "",
          player3: "",
          player4: "",
          games: {
            game1: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game2: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game3: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game4: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game5: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game6: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game7: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game8: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game9: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game10: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game11: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game12: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game13: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game14: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game15: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game16: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game17: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game18: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game19: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game20: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game21: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game22: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game23: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
            game24: [{ p1: -1, p2: -1, p3: -1, p4: -1, pT: 0, stamp: '' }],
          },
        };
        setTeamData((prevData) => ({
          ...prevData,
          [name]: newTeam,
        }));
        
        await fetch('/api/saveTeamData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: name, teamData: newTeam }),
        });
  }

  const fetchAndSaveTeamData = async (name: string) => {
    setError(null);
  
    try {
      const filePath = `/christmas/teams/${name}.json`;
      setSelectedID(name);
  
      // Try to fetch the team data directly, if the file doesn't exist, it will throw an error
      const response = await fetch(filePath);
      
      if (response.ok) {
        // File exists, parse the JSON and update state
        const existingTeamData = await response.json();
  
        // Update the state with the fetched team data
        setTeamData((prevData) => ({
          ...prevData,
          [name]: existingTeamData as TeamData,
        }));
      } else {
        // If the file does not exist, create a new team file
        await createTeamFile(name);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };
  

  
  const handleTeamSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamQuery(event.target.value);
  };

  const handlePinSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPinQuery(event.target.value);
  };

  const handleSubmit = async () => {
    const teamIndex = ids.findIndex((id) => id.toLowerCase() === teamQuery.toLowerCase());
    
    if (teamIndex !== -1 && pins[teamIndex].toLowerCase() === pinQuery.toLowerCase()) {
      const teamName = ids[teamIndex];
      await fetchAndSaveTeamData(teamName);  // Fetch and save team data
  
      setTeamQuery("");  // Reset input fields
      setPinQuery("");
      setshowEditor(true);
      
      // We wait for teamData to update using useEffect
    } else {
      setError('No matching ID found or PIN is incorrect');
    }
  };
  
  useEffect(() => {
    // Only set the selectedTeam after the team data has been updated
    if (teamData[selectedID]) {
      setSelectedTeam(teamData[selectedID]);
    }
  }, [teamData, selectedID]); // This will run when teamData or selectedID changes
  
  

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof TeamData) => {
    const { value } = event.target;
  
    setSelectedTeam((prevTeam) => ({
      ...prevTeam,
      [field]: value,
    }));
  };

  const gameResults = (i: number) => {
  selectedTeam.games[`game${i}`].pT = (Number(selectedTeam.games[`game${i}`][0].p1) || 0) +  (Number(selectedTeam.games[`game${i}`][0].p2) || 0) + (Number(selectedTeam.games[`game${i}`][0].p3) || 0) +  (Number(selectedTeam.games[`game${i}`][0].p4) || 0);   
  }

  const gameResult1 = () => {
      selectedTeam.games.game1[0].pT += selectedTeam.games.game1[0].p1==0 ? 10 : 0;
      selectedTeam.games.game1[0].pT += selectedTeam.games.game1[0].p2==0 ? 10 : 0;
      selectedTeam.games.game1[0].pT += selectedTeam.games.game1[0].p3==0 ? 10 : 0;
      selectedTeam.games.game1[0].pT += selectedTeam.games.game1[0].p4==0 ? 10 : 0;   
  }

  const gameResult2 = () => {
    selectedTeam.games.game2[0].pT += selectedTeam.games.game2[0].p1==0 ? 10 : 0;
    selectedTeam.games.game2[0].pT += selectedTeam.games.game2[0].p2==0 ? 10 : 0;
    selectedTeam.games.game2[0].pT += selectedTeam.games.game2[0].p3==0 ? 10 : 0;
    selectedTeam.games.game2[0].pT += selectedTeam.games.game2[0].p4==0 ? 10 : 0;   
}

const gameResult4 = () => {
  selectedTeam.games.game4[0].pT += selectedTeam.games.game4[0].p1==0 ? 10 : 0;
  selectedTeam.games.game4[0].pT += selectedTeam.games.game4[0].p2==0 ? 10 : 0;
  selectedTeam.games.game4[0].pT += selectedTeam.games.game4[0].p3==0 ? 10 : 0;
  selectedTeam.games.game4[0].pT += selectedTeam.games.game4[0].p4==0 ? 10 : 0;   
}

const gameResult7 = () => {
  for(let i=1; i<=4; i++){
    if(selectedTeam.games.game7[0].p1<30){ // < Zeitlimit
      selectedTeam.games.game7[0].pT += 10;
    } else if(selectedTeam.games.game7[0][`p${i}`]<40){
      selectedTeam.games.game7[0].pT += 8;
    } else if(selectedTeam.games.game7[0][`p${i}`]<50){
      selectedTeam.games.game7[0].pT += 6;
    } else if(selectedTeam.games.game7[0][`p${i}`]<60){
      selectedTeam.games.game7[0].pT += 4;
    } else if(selectedTeam.games.game7[0][`p${i}`]<70){
      selectedTeam.games.game7[0].pT += 2;
    }
    
  }
}

const gameResult8 = () => {
    const numAns = [0,0,0,0];

    for(let i=1; i<=4; i++){
      if(selectedTeam.games.game8[0].p1==numAns[i]){ // < Zeitlimit
        selectedTeam.games.game8[0].pT += 10;
      } else if(selectedTeam.games.game7[0][`p${i}`]==(numAns[i]+(numAns[i]*0.1))){
        selectedTeam.games.game8[0].pT += 8;
      } else if(selectedTeam.games.game7[0][`p${i}`]<(numAns[i]+(numAns[i]*0.2))){
        selectedTeam.games.game8[0].pT += 6;
      } else if(selectedTeam.games.game7[0][`p${i}`]<(numAns[i]+(numAns[i]*0.3))){
        selectedTeam.games.game8[0].pT += 4;
      } else if(selectedTeam.games.game7[0][`p${i}`]<(numAns[i]+(numAns[i]*0.4))){
        selectedTeam.games.game8[0].pT += 2;
      }
      
    }

  }

const gameResult24 = () => {
  if(selectedTeam.games.game24[0].p1<30){ // <Zeitlimit i Feld 1
    selectedTeam.games.game24[0].pT += 10;
  } else if(selectedTeam.games.game24[0].p1<40){
    selectedTeam.games.game24[0].pT += 8;
  } else if(selectedTeam.games.game24[0].p1<50){
    selectedTeam.games.game24[0].pT += 6;
  } else if(selectedTeam.games.game24[0].p1<60){
    selectedTeam.games.game24[0].pT += 4;
  } else if(selectedTeam.games.game24[0].p1<70){
    selectedTeam.games.game24[0].pT += 2;
  }
  
  selectedTeam.games.game24[0].pT += selectedTeam.games.game24[0].p2==0 ? 10 : 0;
  selectedTeam.games.game24[0].pT += selectedTeam.games.game24[0].p3==0 ? 10 : 0;
  selectedTeam.games.game24[0].pT += selectedTeam.games.game24[0].p4==0 ? 10 : 0;   
}

  

  const getPoints = () => {
    let points: number;
    points = 0;

    for(let i=1; i<=24; i++){
      if(selectedTeam.games[`game${i}`][0].p1<0 && selectedTeam.games[`game${i}`][0].p2<0 && selectedTeam.games[`game${i}`][0].p3<0 && selectedTeam.games[`game${i}`][0].p4<0){
      } else if(selectedTeam.games[`game${i}`][0].p1>=0 && selectedTeam.games[`game${i}`][0].p2>=0 && selectedTeam.games[`game${i}`][0].p3>=0 && selectedTeam.games[`game${i}`][0].p4>=0){
        if(selectedTeam.games[`game${i}`][0].stamp==""){
          selectedTeam.games[`game${i}`][0].stamp=humanReadableTimestamp; 
        switch(i){
          case 3: case 4:case 6: gameResults(i); break;
          case 1: gameResult1(); break;
          case 2: gameResult2(); break;
          case 4: gameResult4(); break;
          case 7: gameResult7(); break;
          case 8: gameResult8(); break;
          case 24: gameResult24(); break;
          default: console.log(`Game${i} Results not found.`); break;
        }
      }
      } else { // Inhalte unvollständig
        setErrorMessage(`Fehler: Eingabe ist leer oder enthält Zeichen außer Zahlen. (GAME${i})`)
        handleNotSavedOpen();
        return; // punkte null -> kein Speichern
      }

    }


    for (let c = 1; c <= 24; c++) {
      const gameKey = `game${c}` as keyof TeamData['games'];
      points += selectedTeam.games[gameKey][0].pT || 0; // Add pT, default to 0 if undefined
    }
    return points;
  }

  const handleSave = async () => {
    if (selectedTeam) {
      selectedTeam.punkte=getPoints();
      if(selectedTeam.punkte!=null){

        const updatedTeam = {
          ...selectedTeam,
          timestamp: humanReadableTimestamp,
        };
    
        
        try {
          const response = await fetch('/api/saveTeamData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: selectedID, teamData: updatedTeam }),
          });
      
          // Check if the response is successful
          if (response.ok) {
            // Open the modal after the data is saved successfully
            handleSavedOpen();
      
            // Update the team data in the state
            setTeamData((prevData) => ({
              ...prevData,
              [selectedID]: updatedTeam, // update the state with new data
            }));
          } else {
            // Handle errors if the response is not successful
            console.error('Failed to save team data:', response.statusText);
            setErrorMessage("Fehler: Es gabe ein Serverproblem! (POST)")
            handleNotSavedOpen();
          }
        } catch (error) {
          // Handle any network or unexpected errors
          console.error('Error saving team data:', error);
        }

      }
      
    
      
    }
  };

  const handleGameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    gameKey: keyof TeamData['games'],
    playerIndex: number,
    field: keyof GameData[0]
  ) => {
    const { value } = event.target;
  
    setSelectedTeam((prevTeam) => {
      const updatedGames = { ...prevTeam.games };
  
      // Update the specific field of the player in the game
      const newValue = isNaN(Number(value)) ? 0 : Number(value);  // default to 0 if not a number
  
      updatedGames[gameKey][playerIndex] = {
        ...updatedGames[gameKey][playerIndex], // Keep the previous values
        [field]: newValue, // Update the specific field (e.g., p1, p2, p3, p4, etc.)
      };
  
      return {
        ...prevTeam,
        games: updatedGames,
      };
    });
  };

  

  return (
    <main className="flex min-h-screen flex-col p-8 pt-20 bg-pink-50 dark:bg-gray-900">
      <div className="mb-6">
      <a
          href="/Weihnachtsolympiade"
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
        >
          Games
        </a>
        <a
          href="/Weihnachtsolympiade/Scoreboard"
          className="bg-pink-500 text-white px-4 py-2 m-2 rounded hover:bg-pink-600 transition"
        >
          Scoreboard
        </a>
      </div>
      <h1 className="text-3xl font-semibold text-center text-gray-900 dark:text-white">Teams</h1>

      <div className="mt-6 flex justify-center space-x-4">
      <input
  type="text"
  placeholder="TEAM ID"
  value={teamQuery}
  onChange={handleTeamSearchChange}
  className={`${showEditor ? "hidden" : ""} text-gray-900 w-full sm:w-72 max-w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
  id="team"
/>

<input
  type="password"
  placeholder="PIN"
  value={pinQuery}
  onChange={handlePinSearchChange}
  className={`${showEditor ? "hidden" : ""} text-gray-900 w-full sm:w-72 max-w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
/>
{showSaved && (
                <Saved message="Erfolgreich gespeichert!" onClose={handleSavedlClose} />
            )}
{showNotSaved && (
                <Saved message={errorMessage} onClose={handleNotSavedlClose} />
            )}
      </div>

      <button
        onClick={handleSubmit}
        className={`${showEditor ? "hidden" : ""} mt-6 py-2 px-6 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-200 focus:outline-none`}
        id="loader"

      >
      Load Team
      </button>

      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {selectedTeam && (
        <div className={`${showEditor ? "visible" : "hidden"} mt-8 p-6 bg-white shadow-lg rounded-md space-y-4`}>          <h2 className="text-2xl font-semibold text-gray-900">Edit Team</h2>

          {/* Edit team name */}
          <input
            type="text"
            placeholder="Team Name"
            value={selectedTeam.name}
            onChange={(e) => handleInputChange(e, 'name')}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
          />

          {/* Edit players */}
          {[1, 2, 3, 4].map((i) => (
            <input
              key={`player${i}`}
              type="text"
              placeholder={`Player ${i}`}
              value={selectedTeam[`player${i}` as keyof TeamData] as string}
              onChange={(e) => handleInputChange(e, `player${i}` as keyof TeamData)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200"
            />
          ))}
          <button
            onClick={handleSave}
            className="mt-4 py-2 px-6 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition duration-200 focus:outline-none"
          >
            Save Changes
          </button>
          {/* Edit game data */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(Object.keys(selectedTeam.games) as Array<keyof TeamData['games']>).map((gameKey) => (
  <div
    key={gameKey}
    className={`${
      selectedTeam.games[gameKey][0]?.stamp !== ""
        ? "bg-gray-100"
        : "bg-blue-100"
    } p-4 rounded-md shadow-md space-y-2`}
  >
    <h3 className="text-lg font-semibold text-gray-800">
      Eintrag {gameKey.toUpperCase()}
    </h3>

    {/* Map through each playerData for the current game */}
    {selectedTeam.games[gameKey].map((playerData, playerIndex) => (
      <div key={`${gameKey}-player-${playerIndex}`} className="space-y-2">
        {(['p1', 'p2', 'p3', 'p4'] as Array<keyof GameData[0]>).map((playerField, i) => (
          <input
            key={`${gameKey}-${playerIndex}-${playerField}`}
            type="number"
            placeholder={`# ${i + 1}`}
            disabled={playerData.stamp !== ""}
            value={
              playerData[playerField] != -1 ? playerData[playerField] : ''
            } // empty when Entry is -1
            onChange={(e) =>
              handleGameInputChange(
                e,
                gameKey,
                playerIndex,
                playerField
              )
            }
            className={`${
              selectedTeam.games[gameKey][0]?.stamp !== "" ? "bg-grey-100 text-gray-400" : "bg-white text-gray-900"
            } w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200`}
          />
        ))}
      </div>
    ))}


  </div>
))}
            
          </div>

          
        </div>
      )}
    </main>
  );
}
