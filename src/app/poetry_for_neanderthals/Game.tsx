'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';


export default class Game{
    addLog:(msg:string)=>void;
    broadcastLog:(msg:string)=>void;
    roomId:string;

    constructor(roomId:string,addLog=console.log,broadcastLog=console.log){
        this.addLog=addLog;
        this.broadcastLog=broadcastLog;
        this.roomId=roomId;
    }
    async joinGame(nick:string){

        this.broadcastLog(nick+" is joining...");
                const data = {
                playerNick: nick
                };

            const res = await fetch(`/api/poetry_for_neanderthals/${this.roomId}/join`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error('Failed to join game');
            }
            const {updatedGame}=await res.json();
            if(updatedGame==null){
                this.broadcastLog(nick+" reconnected");
            }else{
                
                this.broadcastLog(nick+" joined");
                this.addLog("CURRENT GAME STATE: "+JSON.stringify(updatedGame,null,2));
                console.log(updatedGame);

                let minTeam:string='';
                for(let i in updatedGame.teams){
                    console.log(i);
                    if(!(minTeam in updatedGame.teams) ||updatedGame.teams[i].players.length<=updatedGame.teams[minTeam].players.length)minTeam=i;
                }
                this.joinTeam(nick,minTeam);
                this.addLog(nick+" joined team ["+updatedGame.teams[updatedGame.players?.[nick]?.team].name+"] <- on join");
            }
            
                
                    

    };

    async joinTeam(nick:string,team:string){
        
        this.addLog("Attempting to join team...");
        const {game}=await fetch(`/api/poetry_for_neanderthals/${this.roomId}/get`).then((res)=>{return res.json();});
        if(!(team in game.teams)){
            this.addLog("Team Join Failed -> No team["+team+"] exists");
            return;
        }
        const teamJoinData={
                    playerNick:nick,
                    team:team
                };
                const res = await fetch(`/api/poetry_for_neanderthals/${this.roomId}/team/join`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(teamJoinData),
                });
                    if (!res.ok) {
                throw new Error('Failed to join game');
            }
                        const {updatedGame} = await res.json(); 
                    
                        this.broadcastLog(nick+" joined team ["+updatedGame.teams[updatedGame.players?.[nick]?.team].name+"]"); 
                        
            
                
                    

    };

    async createTeam(teamName:string){
        
        this.addLog("Attempting to create team...");
        
        const teamCreateData={
                    teamName
                };
                const res = await fetch(`/api/poetry_for_neanderthals/${this.roomId}/team/create`, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(teamCreateData),
                });
                    if (!res.ok) {
                throw new Error('Failed to create team');
            }
                        const {updatedGame} = await res.json(); 
                    
                        this.broadcastLog("Created team ["+updatedGame.teams[teamName].name+"]"); 
                        
            
                
                    

    };
}
    