const image=document.querySelector('img');
const title=document.getElementById('title');
const artist=document.getElementById('artist');
const music=document.querySelector('audio');
const progressContainer=document.getElementById('progress-container');
const progress=document.getElementById('progress')
const currentTimeEl=document.getElementById('current-time')
const durationEl=document.getElementById('duration')
const prevBtn=document.getElementById('prev');
const playBtn=document.getElementById('play');
const nextBtn=document.getElementById('next');

// Music
const songs = [
    {
        name:'music1',
        displayName:'Tera Isq Sufiana',
        artist:'Kamal Khan'
    },
    {
        name:'music3',
        displayName:'Rabba Pura Mera Ik Arman Karde ',
        artist:'Raman Goyal'
    } ,
     {
        name:'music4',
        displayName:'Ye Mehandi Ke Boote',
        artist:'Babul Supriyo,Alka Yagnik'
    }
]

// Check if Playing
let isPlaying=false;
// Play 
function playSong(){
    isPlaying=true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

// Pause
function pauseSong(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

// Play or Pause Event Listener

playBtn.addEventListener('click',()=> (isPlaying?pauseSong():playSong()))



// update the dom
function loadSong(song){
    title.textContent=song.displayName;
    artist.textContent=song.artist;
    music.src=`${song.name}.mpeg`;
    image.src=`${song.name}.png`;
}

// Current Song
let songIndex=0;

// Nest song
function nextSong(){
    songIndex++
    if(songIndex>songs.length-1){
        songIndex=0;
    }
loadSong(songs[songIndex]);
playSong();
}

// Previous Song
function prevSong(){
    songIndex--
    if(songIndex<0){
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On load -selwect First Song

loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e){
if(isPlaying){
    // console.log(e);
    const {duration,currentTime}=e.srcElement;
    //duration is not changes but current time is updated every sec
    //Update the progress bar width
    const progressPercent=(currentTime/duration)*100;
progress.style.width=`${progressPercent}%`;
// Calculate display for duration
const durationMinute=Math.floor(duration/60);
let durationSeconds=Math.floor(duration%60);
if(durationSeconds<10){
    durationSeconds=`0${durationSeconds}`;
}
//Delay switicing duration Element to avoid NaN
if(durationSeconds){
    durationEl.textContent=`${durationMinute}:${durationSeconds}`//`we use this to convert num to string to append in dom

}
// Calculate display for currentTime
const currentMinutes=Math.floor(currentTime/60);
let currentSeconds=Math.floor(currentTime%60);
if(durationSeconds<10){
    durationSeconds=`0${durationSeconds}`;
}
currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`
}
}


// Set progressBar
function setProgressBar(e){
    const width=this.clientWidth;
    const clickX = e.offsetX;//from e
const {duration}=music;
music.currentTime=(clickX/width)*duration;
}


// Event Listeners

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('ended',nextSong)//function already created
music.addEventListener('timeupdate',updateProgressBar);
progressContainer.addEventListener('click',setProgressBar)