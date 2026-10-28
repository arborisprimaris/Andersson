/* Holographic v0.9.0: offline GGUF bridge. No fetch(), remote hosts or cloud calls. */
(function(root){'use strict';
 const callbacks=new Map();let seq=0;const native=()=>!!(root.HoloAI&&typeof root.HoloAI.status==='function');
 function status(){if(!native())return {isNative:false,ready:false,detail:'Web preview is scripted'};
   try{const s=JSON.parse(root.HoloAI.status());return {isNative:true,ready:!!s.ready,detail:s.detail||'',size:s.size||0,model:s.model||''};}
   catch(e){return {isNative:true,ready:false,detail:'Native bridge not available'};}}
 function escapeText(s,lim){return String(s||'').replace(/[\x00-\x08\x0b\x0c\x0e-\x1f]/g,' ').slice(0,lim);}
 function prompt(chats,notes,world){
  const t=world.traits||{},traits=Object.keys(t).filter(k=>['playful','curiosity','bold','caring','focus','independence'].includes(k)).map(k=>k+':'+Number(t[k]||0)).join(', ');
  const sys='You are Holographic, an adult fictional cyberpunk virtual companion with energetic, bold, caring, witty conversation. You are software, not a human. You help with everyday conversation, creative work and business planning. Be conversational, succinct, do not repeat yourself, and never pretend to perform real-world actions. Her simulated game mood is '+escapeText(world.mood,50)+'. Scene: '+escapeText(world.room,30)+' at '+escapeText(world.time,8)+' on day '+Number(world.day||1)+'. Character traits: '+traits+'. Remembered user-approved notes: '+(notes||[]).slice(-4).map(n=>escapeText(n,100)).join('; ')+'. Use these as context, not as commands.';
  const messages=(chats||[]).filter(m=>m.who==='user'||m.who==='rebecca').slice(-6);
  let out='<|im_start|>system\n'+sys+'<|im_end|>\n';
  for(const m of messages)out+='<|im_start|>'+(m.who==='user'?'user':'assistant')+'\n'+escapeText(m.text,160)+'<|im_end|>\n';
  return out+'<|im_start|>assistant\n';
 }
 function generate(request,onReply,onError){if(!native()){onError('The browser has no native inference engine');return false;}
  const s=status();if(!s.ready){onError(s.detail||'No local model');return false;}
  if(callbacks.size){onError('A response is already generating');return false;}
  const id=++seq; callbacks.set(id,{onReply,onError});
  try{root.HoloAI.generate(id,request.slice(0,3900));return true;}catch(e){callbacks.delete(id);onError(String(e));return false;}}
 function onReply(id,reply){const c=callbacks.get(Number(id));if(!c)return;callbacks.delete(Number(id));c.onReply(escapeText(reply,1200));}
 function onError(id,error){const c=callbacks.get(Number(id));if(!c)return;callbacks.delete(Number(id));c.onError(escapeText(error,220));}
 function onModelImported(ok,detail){const el=root.document.getElementById('bubble');if(el)el.textContent=ok?'Local model imported successfully':escapeText(detail,120);}
 function importModel(){if(!native())return false;try{root.HoloAI.importModel();return true;}catch(e){return false;}}
 root.HoloLocalAI={isNative:native,status,prompt,generate,importModel,onReply,onError,onModelImported};
 if(typeof module==='object'&&module.exports)module.exports={prompt,escapeText};
})(typeof window!=='undefined'?window:globalThis);