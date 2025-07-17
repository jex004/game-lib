'use client';

import { useEffect, useState } from 'react';
import PusherClient from './PusherClient';
import SendButton from './SendButton';

import ConsoleBox from '../ConsoleBox';
import { useParams, useRouter } from 'next/navigation';
import Game from '../Game';


export default function GameClient({nickname}:{nickname:string}) {
    

  const [logs, setLogs] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const params = useParams();
  const [nick, setNick] = useState('');


const [inputText, setInputText] = useState('');

  const roomId= params.id as string;  ;
  // const { id } = use(params);
    const addLog = (log: string) => {
      setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${log}`]);
    };
    const broadcastLog = async(log: string) => {
        await fetch(`/api/poetry_for_neanderthals/${roomId}/chat`, {
            method: 'POST',
            body: JSON.stringify({ message: log  }),
            });
    };

    const [gameInstance,neverusethislolll]=useState(new Game(roomId,addLog,broadcastLog));


    // const joinGame=async (nick:string)=>{

    //     addLog(nick+" is joining...");
    //             const data = {
    //             playerNick: nick
    //             };

    //         const res = await fetch(`/api/poetry_for_neanderthals/${roomId}/join`, {
    //             method: 'POST',
    //             headers: {
    //             'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data),
    //         });

    //         if (!res.ok) {
    //             throw new Error('Failed to join game');
    //         }
    //         const {updatedGame}=await res.json();
    //         if(updatedGame==null){
    //             addLog(nick+" failed to join (exists already?)");
    //         }else{
                
    //             addLog(nick+" joined");
    //             addLog("CURRENT GAME STATE: "+JSON.stringify(updatedGame,null,2));
    //             console.log(updatedGame);
    //             let minTeam:number=0;
    //             for(let i:number=0;i<updatedGame.teams.length;i++){
    //                 if(updatedGame.teams[i].players.length<updatedGame.teams[minTeam].players.length)minTeam=i;
    //             }

    //             const teamJoinData={
    //                 playerNick:nick,
    //                 team:minTeam
    //             };
    //             await fetch(`/api/poetry_for_neanderthals/${roomId}/team/join`, {
    //                 method: 'POST',
    //                 headers: {
    //                 'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify(teamJoinData),
    //             }).then(async(res)=>{
                    
    //                     const {updatedGame} = await res.json(); 
    //                     return updatedGame;
    //             }).then((updatedGame)=>{
                    
    //                     addLog(nick+" joined team ["+updatedGame.teams[updatedGame.players?.[nick]?.team].name+"]"); 
    //             });
    //         }
            
                
                    

    // };



    //on join
    useEffect(()=>{
      
        //const storedNick = localStorage.getItem("nickname") as string;
        setNick(nickname);
    
        gameInstance.joinGame(nickname);
        
      addLog("Game Client Opened -> "+roomId);
      



  },[]);



  // console.log({
  //   appId: process.env.PUSHER_APP_ID,
  //   key: process.env.PUSHER_KEY,
  //   secret: process.env.PUSHER_SECRET,
  //   cluster: process.env.PUSHER_CLUSTER,
  // });

    return (
      <div>
              <h1>uwu{Date.now()}</h1>
            <h1>Realtime Messaging Test</h1>
            <h1>Test:{message}</h1>
            <br/>
            
                  <ConsoleBox messages={logs}/>
                  <br/>
        <div>
        <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message"
        />
        <button 
            style={{ display: 'block', color:"#ffaaaa", backgroundColor :"#aaaaaa" }}
            onClick={
                async () => {
                    if (!inputText.trim()) return;
                    if(inputText.charAt(0)==='/'){
                        let args=inputText.slice(1).split(' ');
                        switch(args[0]){
                            case "status":
                                
                                broadcastLog( "<"+nick+" used /status>");
                                fetch(`/api/poetry_for_neanderthals/${roomId}/get`).then((res:any)=>{
                                    return res.json();
                                }).then((thing)=>{
                                    addLog(JSON.stringify(thing.game,null,2));
                                });
                                
                                break;
                            case "team":
                                switch(args[1]){
                                    case "join":
                                        broadcastLog( "<"+nick+" used /team join>");
                                        gameInstance.joinTeam(nickname,args[2]);
                                        
                                        break;
                                    case "create":
                                        broadcastLog( "<"+nick+" used /team create>");
                                        gameInstance.createTeam(args[2]);
                                        
                                        break;
                                }
                                break;
                            default:
                                addLog( "<invalid command>");
                        }
                    }else
                    broadcastLog( nick+": "+inputText );

                }
            }
        >Send Message</button>
        </div>
            <PusherClient onMessage={addLog} roomId={roomId}/>
      </div>
    );
}
