
// Объявление констант для дальнейшей работы с ними.
const wrapper = document.querySelector('.wrapper'), 
musicImg = wrapper.querySelector('.img-area img'),
musicName = wrapper.querySelector('.song-details .name'),
musicArtist = wrapper.querySelector('.song-details .artist'),
mainAudio = wrapper.querySelector('#main-audio');
playPauseBtn = wrapper.querySelector('.play-pause'),
prevBtn = wrapper.querySelector('#prev'),
nextBtn = wrapper.querySelector('#next'),
progressArea = wrapper.querySelector('.progress-area'),
musicList = wrapper.querySelector('.music-list'),
inputSearch = wrapper.querySelector('.search-input'),
showMoreBtn = wrapper.querySelector('#more-music'),
hideMusicBtn = wrapper.querySelector('#close'),
progressBar = wrapper.querySelector('.progress-bar');


let musicIndex = 0;

// let musicIndex = Math.floor((Math.random() * allMusic.length) +1);

window.addEventListener('load', function(){
    
    loadMusic(musicIndex);
    playingNow();
    
});

// console.log(itemMusicList);





// Функция Загрузки композиции с массива.
function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb].name;
    musicArtist.innerText = allMusic[indexNumb].artist;
    musicImg.src = `./images/${allMusic[indexNumb].img}.jpg`;
    mainAudio.src = `./songs/${allMusic[indexNumb].src}.mp3`;

    itemMusicList = document.querySelectorAll('.music-list li');

    console.log(itemMusicList);

    itemMusicList.forEach((element) => {
        
        element.addEventListener('click', () => {

            musicList.classList.remove('show');

            itemMusicList.forEach((elem) => {
    
             
            });
            
                
        });
    });

   

}

inputSearch.addEventListener('input', () => {

    // console.log(inputSearch.value);

    let valInput = inputSearch.value.trim();

    console.log(valInput);

    if(valInput != "") {

        itemMusicList.forEach((elem) => {

            if(elem.innerText.search(valInput) == -1) {
                elem.classList.add('hide');
                elem.innerHTML = elem.innerText;
            } else{
                elem.classList.remove('hide');
                let str = elem.innerText;
                elem.innerHTML = insertMark(str, elem.innerText.search(valInput), valInput.length);

            }
        });
    } else {

        itemMusicList.forEach((elem) => {

            elem.classList.remove('hide');
            elem.innerHTML = elem.innerText;
        });
    }


});

function insertMark(string,pos,len) {

    return string.slice(0, pos)+string.slice(pos, pos + len)+string.slice(pos + len);

} 

// function insertMark(string,pos,len) {

//     return string.slice(0, pos)+'<mark>'+string.slice(pos, pos + len)+'</mark>'+string.slice(pos + len);

// } 




// Функция Play
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector('i').innerText = "pause";
    mainAudio.play();
}

// Функция Plause
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector('i').innerText = "play_arrow";
    mainAudio.pause();
}

// Функция Переключения назад
function prevMusic() {
    musicIndex --;
    musicIndex < 0 ? musicIndex = allMusic.length -1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}


console.log(allMusic.length);

// Функция Переключения вперед
function nextMusic() {
    musicIndex ++;
    musicIndex > allMusic.length -1 ? musicIndex = 0 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
    
}



// Запускаем или останвливаем проигрывание плеера
playPauseBtn.addEventListener('click', function(){
    
    let isMusicPaused = wrapper.classList.contains('paused');
    isMusicPaused ? pauseMusic() : playMusic();
    playingNow();
    
});

// Переключаем трек назад
prevBtn.addEventListener('click', function() {

    prevMusic();
    playingNow();
});

// Переключаем трек вперед
nextBtn.addEventListener('click', function() {
    playingNow();
    nextMusic();
});

// Оживляем (делаем обновление) Прогресс-бар, делаем его динамичным.
mainAudio.addEventListener('timeupdate', (e)=>{
   let currentTime = e.target.currentTime;
   let duration = e.target.duration;
   let progressWidth = (currentTime / duration) * 100;
   progressBar.style.width = `${progressWidth}%`;


    let musicCurrentTime = wrapper.querySelector('.current'),
    musicDuration = wrapper.querySelector('.duration');

    mainAudio.addEventListener('loadeddata', function(){
       

        // Создаем счетчик полного времени проигрывания трека (Duration).
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);

        if(totalSec < 10) {
            totalSec = `0${totalSec}`; // Добавляем "0" перед секундой если она меньше чем 10 сек.
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });


    // Создаем счетчик активного проигрывания трека  (CurrentTime).
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);

    if(currentSec < 10) {
        currentSec = `0${currentSec}`;// Добавляем "0" перед секундой если она меньше чем 10 сек.
    };

    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;

});

progressArea.addEventListener('click', function(e){
    let progressWidthVal = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;
    playMusic();
});

const repeatBtn = wrapper.querySelector('#repeat-plist');

repeatBtn.addEventListener('click', function(){
    let getText = repeatBtn.innerText; // Получаем Текс иконки.

    switch(getText){
        case "repeat": // если иконка "repeat" то тогда включается "repeat_one"
            repeatBtn.setAttribute("title","Song Looped");
            repeatBtn.innerText = "repeat_one";
            break;
        case "repeat_one": // если иконка "repeat_one" то тогда включается "shuffle"
            repeatBtn.setAttribute("title","Playback Shuffle");
            repeatBtn.innerText = "shuffle";
            break;
            case "shuffle": // если иконка "repeat" то тогда включается "repeat_one"
            repeatBtn.setAttribute("title","Playlist Looped");
            repeatBtn.innerText = "repeat";
            break;
    };
});

mainAudio.addEventListener("ended", function() {

    let getText = repeatBtn.innerText;

    switch(getText){
        case "repeat": // если иконка "repeat" то тогда включается "repeat_one"
            nextMusic();
            break;

        case "repeat_one": // если иконка "repeat_one" то тогда включается "shuffle"
            mainAudio.currentTime = 0;
            loadMusic(musicIndex);
            playMusic();
            break;

        case "shuffle": // если иконка "repeat" то тогда включается "repeat_one"
        let randIndex = Math.floor((Math.random() * allMusic.length) +1);
        do{
            randIndex = Math.floor((Math.random() * allMusic.length) +1);
        } while(musicIndex == randIndex);
        musicIndex = randIndex;
        loadMusic(musicIndex);
        playMusic();
        playingNow();
        break;
    };

});

showMoreBtn.addEventListener('click', function() {
    musicList.classList.toggle('show');
});

hideMusicBtn.addEventListener('click', function() {
    showMoreBtn.click();
});

const ulTag = wrapper.querySelector("ul");

for( let i = 0; i < allMusic.length; i++) {

    let liTag = `<li li-index="${i}">
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                    </div>
                    <audio class="${allMusic[i].id}" src="songs/${allMusic[i].src}.mp3"></audio>
                    <span id="${allMusic[i].id}" class="audio-duration">3:40</span>
                </li>`;


                // let liTag = `<li li-index="${i}">
                //                 <div class="row row-1">

                //                     <p>${allMusic[i].name}</p>
                //                     <p>${allMusic[i].artist}</p>

                //                 </div>


                //                 <div class="row row-2">

                //                     <audio class="${allMusic[i].id}" src="songs/${allMusic[i].src}.mp3"></audio>
                //                     <p id="${allMusic[i].id}" class="audio-duration">3:40</p>
                                
                //                 </div>

                           
                //              </li>`;

    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ulTag.querySelector(`#${allMusic[i].id}`);
    
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].id}`);


    liAudioTag.addEventListener('loadeddata', function(){
        let audioDuration = liAudioTag.duration;
        
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);

        if(totalSec < 10) {
            totalSec = `0${totalSec}`; // Добавляем "0" перед секундой если она меньше чем 10 сек.
        }
        liAudioDuration.innerText = `${totalMin}:${totalSec}`;
        liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
    });
};

const allLiTags = ulTag.querySelectorAll("li");

function playingNow(){
    for( let j = 0; j < allLiTags.length; j++){
        let audioTag = allLiTags[j].querySelector('.audio-duration');
        

        if(allLiTags[j].classList.contains("playing")){
            allLiTags[j].classList.remove("playing");
            let adDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = adDuration;
        }

        if(allLiTags[j].getAttribute("li-index") == musicIndex){
            allLiTags[j].classList.add("playing");
            audioTag.innerText = "Playing";
            
        }
    
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}



function clicked(element){
    let getLiIndex = element.getAttribute("li-index");

    
    musicIndex = getLiIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
};

  