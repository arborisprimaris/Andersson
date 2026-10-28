/* Holographic v0.8.5. Offline, deterministic physical choreography. Pure functions for testability. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;root.HoloPhysical=api;})(typeof window!=='undefined'?window:globalThis,function(){'use strict';
const GROUPS={
meal:{item:'meal',carry:true,verb:'Taking a meal to the table',pose:'taste',tool:'bowl'},
drink:{item:'water',carry:true,verb:'Carrying a drink',pose:'sip',tool:'cup'},
work:{item:'tablet',carry:false,verb:'Typing at the workstation',pose:'type',tool:'tablet'},
play:{item:'controller',carry:false,verb:'Playing a game',pose:'game',tool:'controller'},
clean:{item:'broom',carry:false,verb:'Tidying the apartment',pose:'sweep',tool:'broom'},
care:{item:'towel',carry:false,verb:'Freshening up',pose:'wash',tool:'towel'},
style:{item:'shirt',carry:false,verb:'Changing clothes',pose:'turn',tool:'shirt'},
gift:{item:'gift',carry:true,verb:'Bringing a present',pose:'offer',tool:'gift'},
read:{item:'book',carry:false,verb:'Reading quietly',pose:'read',tool:'book'},
plants:{item:'can',carry:false,verb:'Watering the plants',pose:'pour',tool:'can'},
exercise:{item:'dumbbell',carry:false,verb:'Exercising',pose:'lift',tool:'dumbbell'},
rest:{item:null,carry:false,verb:'Resting and recovering',pose:'sleep',tool:null},
talk:{item:null,carry:false,verb:'Listening and chatting',pose:'talk',tool:null}
};
const KEYS={
feed:'meal',breakfast:'meal',cook:'meal',drink:'drink',brew_tea:'drink',work:'work',coding_sprint:'work',
play:'play',arcade_match:'play',watch:'play',movie_night:'play',clean:'clean',room_reset:'clean',bed_making:'clean',
wash:'care',shower:'care',hot_shower:'care',skin_care:'care',outfit:'style',outfit_check:'style',
gift:'gift',read_comic:'read',water_plants:'plants',exercise:'exercise',morning_stretch:'exercise',
rest:'rest',sit:'rest',meditation:'rest',stargaze:'rest',talk:'talk'
};
function describe(kind){return GROUPS[KEYS[kind]||'talk'];}
function stage(task){if(!task)return {name:'idle',label:'Free exploration',item:null};const d=describe(task.kind);if(task.phase==='walking')return {name:'approach',label:'Walking to '+(task.propId||'activity'),item:null};if(task.phase==='preparing')return{name:'prepare',label:'Preparing '+(d.tool||'activity'),item: d.item};if(task.phase==='carrying')return{name:'carry',label:d.verb,item:d.item};if(task.phase==='acting'){
let p=Math.max(0,Math.min(1,(task.elapsed||0)/(task.duration||1)));
return {name:p<0.12?'start':p<0.85?'use':'finish',label:p<0.12?'Starting activity':p<0.85?d.verb:'Finishing up',item:d.item};
}return{name:'idle',label:'Ready',item:null};}
function carryDestination(kind,actor){const d=describe(kind);if(!d.carry)return null;return {x:actor.x>170?148:182,y:355};}
function moodPose(stats,traits,now){const energy=stats.energy||0, happy=stats.happy||0,hunger=stats.hunger||0;
if(energy<28)return{face:'tired',tilt:-.06,bob:0,label:'Sleepy'};
if(hunger<30)return{face:'hungry',tilt:.04,bob:0,label:'Hungry'};
if(happy<35)return{face:'down',tilt:-.03,bob:.4,label:'Low mood'};
if(happy>74)return{face:'happy',tilt:.015,bob:1+Math.sin(now/300)*1.5,label:'Happy'};
return{face:'neutral',tilt:0,bob:1,label:'Focused'};
}
function gesture(task,time,mood){const s=stage(task),d=task?describe(task.kind):GROUPS.talk,p=Math.max(0,Math.min(1,task?.progress||0));
let bob=0, tilt=0, hand=0;
if(s.name==='use'||s.name==='start'){const wave=Math.sin(time/180);hand=wave*3;
if(['taste','sip','offer','pour'].includes(d.pose))tilt=wave*.045;
else if(['type','game','read'].includes(d.pose))hand=wave*2.5;
else if(['sweep','lift','wash'].includes(d.pose))bob=wave*2.5;
else if(d.pose==='sleep'){bob=0;tilt=-.08;}}
if(s.name==='carry')bob=Math.sin(time/130)*1.8;
if(s.name==='idle'&&mood)bob=mood.bob||0;
return {stage:s.name,label:s.label,item:s.item,bob,tilt,hand,progress:p};}
return Object.freeze({describe,stage,carryDestination,moodPose,gesture});
});