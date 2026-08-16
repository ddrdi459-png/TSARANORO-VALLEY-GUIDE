const KEY="tsaranoro_circuits_v2", ACT="tsaranoro_activities_v1", HOT="tsaranoro_hotels_v1", RES="tsaranoro_reservations_v1", GUIDE_KEY="tsaranoro_guides_v1";

const defaults=[
["Circuit Buvoika Tsaranoro","🔴 Difficile","À compléter"],
["Circuit Buvoika Dondy","🔴 Difficile","À compléter"],
["Circuit Grand Tour Tsaranoro","🔴 Difficile","7h à 8h"],
["Circuit Caméléon","🟡 Assez facile","5h à 6h"],
["Forêt + Piscine naturelle + Village","🟢 Facile","3h à 4h"],
["Circuit Cascade","🟡 Assez facile","5h à 6h"],
["Circuit Dondy","🔴 Difficile","8h"],
["Circuit Pyramide","🔴 Difficile","5h à 6h"],
["Envers du Tsaranoro","⚪ À compléter","5h à 6h"]
];
const defaultActivities=[
{id:1001,name:"Parapente",duration:"À définir",price:"",difficulty:"À définir",description:"Vol en parapente au-dessus des paysages de Tsaranoro.",trek:"",equipment:"Parapente, casque et équipement de sécurité.",photo:""},
{id:1002,name:"Escalade",duration:"À définir",price:"",difficulty:"À définir",description:"Escalade sur les parois et sites adaptés de Tsaranoro.",trek:"",equipment:"Corde, baudrier, casque, chaussons et matériel d’assurage.",photo:""},
{id:1003,name:"Canoë",duration:"À définir",price:"",difficulty:"À définir",description:"Activité nautique en canoë selon les sites et conditions disponibles.",trek:"",equipment:"Canoë, pagaie et gilet de sauvetage.",photo:""}
];
const defaultGuides=[
{id:1,name:"Guide local Tsaranoro",description:"Guide local recommandé pour découvrir la Vallée de Tsaranoro.",phone:"034 59 195 32",photo:""},
{id:2,name:"Guide Andringitra",description:"Accompagnement pour randonnée, trek et découverte des villages.",phone:"034 59 195 32",photo:""}
];
const defaultHotels=[
{id:1,name:"Tsarasoa Lodge",description:"Hébergement dans la Vallée de Tsaranoro.",location:"Vallée de Tsaranoro, Madagascar",url:"https://www.tsarasoa.com/",photos:[]}
];

function read(k,f=[]){try{const v=JSON.parse(localStorage.getItem(k));return Array.isArray(v)?v:f}catch(e){return f}}
function write(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch(e){console.warn("Stockage local indisponible ou plein",e);return false}}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function circuitsData(){let a=read(KEY,[]);if(!a.length){a=defaults.map((d,i)=>({id:i+1,name:d[0],difficulty:d[1],duration:d[2],description:"",price:"",itinerary:"",points:"",photos:[]}));write(KEY,a)}return a}
function activityData(){let a=read(ACT,[]);if(!a.length){a=defaultActivities;write(ACT,a)}return a}
function guideData(){let a=read(GUIDE_KEY,[]);if(!a.length){a=defaultGuides;write(GUIDE_KEY,a)}return a}
function hotelData(){let a=read(HOT,[]);if(!a.length){a=defaultHotels;write(HOT,a)}return a}

function render(){
 const a=circuitsData(), el=document.getElementById("circuitsList"), choice=document.getElementById("choice");
 el.innerHTML=a.map(x=>{const p=x.photos?.[0]||"assets/tsaranoro.jpg";return `<article class="card"><div class="photo" style="background-image:url('${esc(p)}')"></div><h3>🥾 ${esc(x.name)}</h3><p>${esc(x.difficulty)} · ⏱️ ${esc(x.duration)}</p><p>${esc(x.description||"Découvrez les paysages de la Vallée de Tsaranoro.")}</p><button class="btn" onclick="openCircuit(${x.id})">Découvrir</button> <button class="btn" onclick="selectCircuit(${x.id})">Réserver</button></article>`}).join("");
 choice.innerHTML='<option value="">Choisir un circuit ou une activité</option>'+a.map(x=>`<option value="${esc(x.name)}">${esc(x.name)}</option>`).join("");
}
function renderActivities(){
 const a=activityData(),el=document.getElementById("activitiesList");
 el.innerHTML=a.map(x=>`<article class="card" onclick="openDetail('activity',${x.id})" style="cursor:pointer"><div class="photo" style="background-image:url('${esc(x.photo||"assets/tsaranoro.jpg")}')"></div><h3>🏄 ${esc(x.name)}</h3><p>${esc(x.description||"")}</p>${x.duration?`<p>⏱️ ${esc(x.duration)}</p>`:""}<p>⭐ <b>Recommandé</b></p><button class="btn" onclick="event.stopPropagation();reserveActivity('${jsSafe(x.name)}')">Réserver</button></article>`).join("")||'<p class="empty">Aucune activité disponible.</p>';
}
function renderGuides(){
 const a=guideData(),el=document.getElementById("guidesList");
 el.innerHTML=a.map(g=>`<article class="card"><div class="photo" style="background-image:url('${esc(g.photo||"assets/tsaranoro.jpg")}')"></div><h3>👨‍🏫 ${esc(g.name)}</h3><p>${esc(g.description||"Guide local recommandé.")}</p><p>⭐ <b>Recommandé</b></p><button class="btn" onclick="openDetail('guide',${g.id})">Voir le guide</button> <button class="btn" onclick="reserveGuide('${jsSafe(g.name)}')">Réserver</button></article>`).join("");
 document.getElementById("guideChoice").innerHTML='<option value="">Choisir un guide (optionnel)</option>'+a.map(g=>`<option value="${esc(g.name)}">${esc(g.name)}</option>`).join("");
}
function renderHotelsPublic(){
 const a=hotelData(),el=document.getElementById("hotelsList");
 el.innerHTML=a.map(h=>`<article class="card"><div class="photo" style="background-image:url('${esc(h.photos?.[0]||"assets/tsaranoro.jpg")}')"></div><h3>🏨 ${esc(h.name)}</h3><p>${esc(h.description||"")}</p><p>📍 ${esc(h.location||"")}</p>${h.url?`<a class="btn light" href="${esc(h.url)}" target="_blank" rel="noopener">Site web</a>`:""} <button class="btn" onclick="reserveHotel('${jsSafe(h.name)}')">Réserver</button></article>`).join("");
 document.getElementById("hotelChoice").innerHTML='<option value="">Choisir un hébergement (optionnel)</option>'+a.map(h=>`<option value="${esc(h.name)}">${esc(h.name)}</option>`).join("");
}
function jsSafe(s){return String(s??"").replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(/\r?\n/g," ")}
function selectCircuit(id){const x=circuitsData().find(z=>z.id===id);if(!x)return;document.getElementById("choice").value=x.name;document.getElementById("booking").scrollIntoView({behavior:"smooth"})}
function openCircuit(id){const x=circuitsData().find(z=>z.id===id);if(!x)return;document.getElementById("detailContent").innerHTML=`<div class="photo large" style="background-image:url('${esc(x.photos?.[0]||"assets/tsaranoro.jpg")}')"></div><h2>🥾 ${esc(x.name)}</h2><p>${esc(x.description||"Découvrez ce circuit à Tsaranoro.")}</p><p>⏱️ ${esc(x.duration||"À définir")} · ${esc(x.difficulty||"À définir")}</p>${x.itinerary?`<p><b>Itinéraire :</b> ${esc(x.itinerary)}</p>`:""}${x.points?`<p><b>Points importants :</b> ${esc(x.points)}</p>`:""}<button class="btn" onclick="selectCircuit(${x.id});closeDetail()">Réserver</button>`;document.getElementById("detailModal").hidden=false}
function openDetail(type,id){
 let x=type==="guide"?guideData().find(z=>z.id===id):type==="hotel"?hotelData().find(z=>z.id===id):activityData().find(z=>z.id===id);if(!x)return;
 const photo=x.photo||(x.photos&&x.photos[0])||"assets/tsaranoro.jpg";
 const title=type==="guide"?"👨‍🏫 "+x.name:type==="hotel"?"🏨 "+x.name:"🏄 "+x.name;
 const extra=type==="activity"?`<p>${esc(x.description||"")}</p>${x.duration?`<p>⏱️ ${esc(x.duration)}</p>`:""}${x.difficulty?`<p>📊 ${esc(x.difficulty)}</p>`:""}${x.trek?`<p>🥾 <b>Trek :</b> ${esc(x.trek)}</p>`:""}${x.equipment?`<p>🧰 <b>Matériel :</b> ${esc(x.equipment)}</p>`:""}`
 :`<p>${esc(x.description||"")}</p>${x.location?`<p>📍 ${esc(x.location)}</p>`:""}${x.phone?`<p>📞 ${esc(x.phone)}</p>`:""}${x.url?`<p><a href="${esc(x.url)}" target="_blank" rel="noopener">Voir le site web</a></p>`:""}`;
 const reserve=type==="activity"?`reserveActivity('${jsSafe(x.name)}')`:type==="guide"?`reserveGuide('${jsSafe(x.name)}')`:`reserveHotel('${jsSafe(x.name)}')`;
 document.getElementById("detailContent").innerHTML=`<div class="photo large" style="background-image:url('${esc(photo)}')"></div><h2>${esc(title)}</h2>${extra}<p>⭐ <b>Recommandé</b></p><button class="btn" onclick="${reserve}">Réserver</button>`;
 document.getElementById("detailModal").hidden=false;
}
function closeDetail(){document.getElementById("detailModal").hidden=true}
function reserveActivity(name){closeDetail();document.getElementById("choice").value="Activité : "+name;document.getElementById("booking").scrollIntoView({behavior:"smooth"})}
function reserveGuide(name){closeDetail();document.getElementById("guideChoice").value=name;document.getElementById("booking").scrollIntoView({behavior:"smooth"})}
function reserveHotel(name){closeDetail();document.getElementById("hotelChoice").value=name;document.getElementById("booking").scrollIntoView({behavior:"smooth"})}

function whatsapp(message){window.open("https://wa.me/261345919532?text="+encodeURIComponent(message),"_blank","noopener")}
document.getElementById("wa").href="https://wa.me/261345919532?text="+encodeURIComponent("Bonjour, je souhaite visiter la Vallée de Tsaranoro et réserver un guide.");

document.getElementById("bookingForm").addEventListener("submit",e=>{
 e.preventDefault();
 const r={id:Date.now(),name:document.getElementById("name").value.trim(),country:document.getElementById("country").value.trim(),circuit:document.getElementById("choice").value,guide:document.getElementById("guideChoice").value,hotel:document.getElementById("hotelChoice").value,date:document.getElementById("date").value,people:document.getElementById("people").value,email:document.getElementById("email").value.trim(),phone:"",message:document.getElementById("message").value.trim(),status:"En attente"};
 const rs=read(RES,[]);rs.push(r);write(RES,rs);
 whatsapp(`Bonjour, je souhaite visiter la Vallée de Tsaranoro et faire une réservation.

Client : ${r.name}
Pays : ${r.country}
Circuit/Activité : ${r.circuit}
Guide : ${r.guide||"—"}
Hôtel : ${r.hotel||"—"}
Date : ${r.date}
Personnes : ${r.people}
Email : ${r.email||"—"}
Message : ${r.message||"—"}`);
});

document.addEventListener("keydown",e=>{if(e.key==="Escape")closeDetail()});
render();renderActivities();renderGuides();renderHotelsPublic();
