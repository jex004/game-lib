'use client';

import { useEffect, useState } from 'react';
import PusherClient from './PusherClient';
import SendButton from './SendButton';
import GameClient from './GameClient';

import ConsoleBox from '../ConsoleBox';
import { useParams, useRouter } from 'next/navigation';


export default function TestingPage() {
    
  const [logs, setLogs] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const params = useParams();


  const roomId= params.id as string;  ;
  // const { id } = use(params);
    const addLog = (log: string) => {
      setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${log}`]);
    };
    useEffect(()=>{
      

      addLog(roomId);



  },[]);

//stuff dealing with setting nickname :))
const [nick, setNick] = useState('');
const [hasNick, setHasNick]=useState(false);
  const setNickname=()=>{
    if (!nick.trim()) return;
    localStorage.setItem("nickname",nick);
    setHasNick(true);
    addLog("Set Nickname -> "+nick);
  }
useEffect(() => {
  
      console.log("fuck you");
    const stored = localStorage.getItem('nickname') as string;
    if(!nick&&stored){
    setNick(stored);
    //setHasNick(true);
    
    }
  }, []);



  // console.log({
  //   appId: process.env.PUSHER_APP_ID,
  //   key: process.env.PUSHER_KEY,
  //   secret: process.env.PUSHER_SECRET,
  //   cluster: process.env.PUSHER_CLUSTER,
  // });

    return (
      <div>
        {hasNick && nick ?( 
          <div>
              <GameClient nickname={nick}/>
          </div>):(
            //if doesn't have nickname
            <div>

                    <input
              type="text"
              value={nick}
              onChange={(e) => setNick(e.target.value)}
              placeholder="Type your nickname :)"
              />

              <br/>
              <button style={{ display: 'block', color:"#ff0000", backgroundColor :"#ddaa00" }} onClick={setNickname}>Set Nickname</button>
              <br/>
            </div>
          )
        }
      </div>
    );
}
