let playList = [
    { name: 'Somewhere Only We Know', url: 'songs/somewhere.mp3', img: 'assets/somewhere.jpg', singers: 'Keane' },
    { name: 'Shape of You', url: 'songs/shape_of_you.mp3', img: 'assets/shape_of_you.jpg', singers: 'Ed Sheeran' },
    { name: 'One Dance', url: 'songs/one_dance.mp3', img: 'assets/one_dance.jpg', singers: 'Drake' },
    { name: 'Bella Ciao', url: 'songs/bella_ciao.mp3', img: 'assets/bella_ciao.jpg', singers: 'Giovanna Daffini' },
    { name: 'At My Worst', url: 'songs/at_my_worst.mp3', img: 'assets/at_my_worst.jpeg', singers: 'Pink Sweat$' },
    { name: 'Under The Influence', url: 'songs/under_the_influence.mp3', img: 'assets/under_the_influence.jpg', singers: 'Chris Brown' },
    { name: 'Gasolina', url: 'songs/gasolina.mp3', img: 'assets/gasolina.jpg', singers: 'Daddy Yankee and Eddie Dee' },
    { name: 'Believer', url: 'songs/believer.mp3', img: 'assets/believer.jpg', singers: 'Imagine Dragons' },
    { name: 'Cupid', url: 'songs/Cupid.mp3', img: 'assets/cupid.jpg', singers: 'Fifty Fifty | Sio and Aran)' },
    { name: 'Senorita', url: 'songs/senorita.mp3', img: 'assets/senorita.jpg', singers: 'Shawn Mendes & Camila Cabello' },
    { name: 'Dandelions', url: 'songs/dandelions.mp3', img: 'assets/dandelions.jpg', singers: 'Ruth B' },
    { name: 'Montero (Call Me By Your Name)', url: 'songs/montero.mp3', img: 'assets/montero.jpg', singers: 'Lil Nas X' },
    { name: 'Shower', url: 'songs/shower.mp3', img: 'assets/shower.jpg', singers: 'Becky G' },
    { name: 'Watermelon/Sugar', url: 'songs/watermelon.mp3', img: 'assets/watermelon.jpg', singers: 'Harry Styles' },
]
let songIndex = 0
let audio = playList[songIndex].url;
let audioElement = new Audio(audio)
let songCard = document.querySelector('[song-card]')
let songSearchData = document.querySelector('[song-search]')
let songLists = document.querySelector('.song-lists')
let music_banner = document.querySelector('.music-banner img')
let name = document.getElementById('songName')
let singer_name = document.getElementById('singerName')
let progessBar = document.getElementById('progressBar')
let start = document.getElementById('startTime')
let end = document.getElementById('endTime')
let playAudio = document.getElementById('audioPlay')
let previousSong = document.getElementById('previous')
let nextSong = document.getElementById('next')
start.innerHTML = '0:00'

//add song cards
playList.forEach((ele) => {
    let songElement = songCard.content.cloneNode(true)
    let posterElement = songElement.querySelector('[song-poster]')
    let imgElement = posterElement.querySelector('img')
    let detailElement = songElement.querySelector('[song-details]')
    imgElement.src = ele.img
    detailElement.querySelector('.name').textContent = ele.name
    detailElement.querySelector('.singer').textContent = ele.singers
    songLists.appendChild(songElement)
})

audioElement.addEventListener('loadedmetadata', () => {
    end.innerHTML = Number(audioElement.duration / 60).toFixed(2);
});

//calling function after all images are loaded
Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
    console.log('images finished loading');
    loadSong(songIndex, cardArray[songIndex])
});


// change icons during pause and resume the song
function pauseResumeSong(index){
    console.log('%c [ index ]-59', 'font-size:13px; background:pink; color:#bf2c9f;', index)
    if (audioElement.paused) {
        console.log('paused')
        audioElement.play();  
        playAudio.classList.remove('fa-play-circle')    
        playAudio.classList.add('fa-pause')
        cardArray.forEach((ele,i)=>{
            // if(i===index){
                ele.querySelector("#songPlay").classList.remove('fa-play-circle')
                ele.querySelector("#songPlay").classList.add('fa-pause')
            // }
            // else{
            //     ele.querySelector("#songPlay").classList.remove('fa-pause')
            //     ele.querySelector("#songPlay").classList.add('fa-play-circle')
            // }
        })
    }
    else {
        audioElement.pause();
        playAudio.classList.add('fa-play-circle')
        playAudio.classList.remove('fa-pause')
        cardArray.forEach((ele,i)=>{
            // if(i===songIndex){
                ele.querySelector("#songPlay").classList.remove('fa-pause')
                ele.querySelector("#songPlay").classList.add('fa-play-circle')
            // }
            // else{
            //     ele.querySelector("#songPlay").classList.remove('fa-play-circle')
            //     ele.querySelector("#songPlay").classList.add('fa-pause')
            // }
        })
    }
}

playAudio.addEventListener('click',()=>{
    pauseResumeSong(songIndex)
})  

audioElement.addEventListener('timeupdate', () => {
    progessBar.value = (audioElement.currentTime / audioElement.duration) * 100
    start.innerHTML = Number(audioElement.currentTime / 60).toFixed(2);
})

progessBar.addEventListener('input', () => {
    audioElement.currentTime = progessBar.value * audioElement.duration / 100
})

//song loading function with index
function loadSong(index, element) {
    console.log('%c [ element ]-97', 'font-size:13px; background:pink; color:#bf2c9f;', element)
    audioElement.src = playList[index].url;
    name.innerHTML = playList[index].name;
    singer_name.innerHTML = playList[index].singers;
    music_banner.src = playList[index].img
    audioElement.play(); // Start playing the new song
    // playAudio.classList.remove('fa-play-circle')
    // playAudio.classList.add('fa-pause')
    let nameToStyle = element.querySelector('.name')
    pauseResumeSong(index)
    cardArray.forEach((ele, i) => {
        if (ele.querySelector('.name').textContent === nameToStyle.textContent) {
            ele.querySelector('.name').style.color = '#18d860'
        }
        else {
            ele.querySelector('.name').style.color = 'white'
        }
    })
}

nextSong.addEventListener('click', () => {
    songIndex = (songIndex + 1) % playList.length; // Circular index
    loadSong(songIndex, cardArray[songIndex]);
    start.innerHTML = '0:00'
})
previousSong.addEventListener('click', () => {
    songIndex = (songIndex - 1 + playList.length) % playList.length; // Circular index
    loadSong(songIndex, cardArray[songIndex]);
    start.innerHTML = '0:00'
})
function loadNextSong() {
    songIndex = (songIndex + 1) % playList.length; // Circular index
    loadSong(songIndex, cardArray[songIndex]);
    start.innerHTML = '0:00';
}

// automatically playing next song 
audioElement.addEventListener('ended', loadNextSong);

//playing songs from the list by clicking on icon
let cardArray = document.querySelectorAll('.card');
let iconClick = document.querySelectorAll('.card i')
iconClick.forEach((ele, i) => {
    ele.addEventListener('click', () => {
        songindex = i
        console.log('%c [ songindex ]-150', 'font-size:13px; background:pink; color:#bf2c9f;', songindex)
        loadSong(songindex, cardArray[songindex]);
    })
})

// search functionality
songSearchData.addEventListener('input', (e) => {
    let searchData = e.target.value.toLowerCase()
    cardArray.forEach((ele) => {
        let songName = ele.querySelector('.name').textContent.toLowerCase()
        let singerName = ele.querySelector('.singer').textContent.toLowerCase()
        let isVisible = songName.includes(searchData) || singerName.includes(searchData)
        if (!isVisible) {
            ele.classList.remove('show')
            ele.classList.add('hide')
        } else {
            ele.classList.remove('hide')
            ele.classList.add('show')
        }
    })
})
