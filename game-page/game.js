import {CharInfo} from '../game-page/CharInfo.js';
import {audioArr} from '../game-page/CharInfo.js';

const gameModeCol = document.querySelectorAll('.theme__button');
document.querySelector('.theme__button').classList.add('yes');

const togleObj = {
  "Brawl Stars": true,
  "Naruto": false,
  "Warcraft 3": false,
}
if (window.location.search.includes('player1')) {
  togleObj['Brawl Stars'] = true;
  for (let btn of gameModeCol) {
    btn.classList.remove('yes');
  }
  gameModeCol[0].classList.add('yes');
  togleObj.Naruto = false;
  togleObj['Warcraft 3'] = false;
}
else if (window.location.search.includes('player2')) {
  togleObj['Brawl Stars'] = false;
  for (let btn of gameModeCol) {
    btn.classList.remove('yes');
  }
  gameModeCol[1].classList.add('yes');
  togleObj.Naruto = false;
  togleObj['Warcraft 3'] = true;
}
else if (window.location.search.includes('player3')) {
  togleObj['Brawl Stars'] = false;
  for (let btn of gameModeCol) {
    btn.classList.remove('yes');
  }
  gameModeCol[2].classList.add('yes');
  togleObj.Naruto = true;
  togleObj['Warcraft 3'] = false;
}

function checkerBtn (e) {
  if (e.target.innerHTML === "Brawl Stars") {
    togleObj['Brawl Stars'] = true;
    for (let btn of gameModeCol) {
      btn.classList.remove('yes');
    }
    e.target.classList.add('yes');
    togleObj.Naruto = false;
    togleObj['Warcraft 3'] = false;
  }
  if (e.target.innerHTML === "Naruto") {
    togleObj['Brawl Stars'] = false;
    togleObj.Naruto = true;
    for (let btn of gameModeCol) {
      btn.classList.remove('yes');
    }
    e.target.classList.add('yes');
    togleObj['Warcraft 3'] = false;
  }
  if (e.target.innerHTML === "Warcraft 3") {
    togleObj['Brawl Stars'] = false;
    togleObj.Naruto = false;
    togleObj['Warcraft 3'] = true;
    for (let btn of gameModeCol) {
      btn.classList.remove('yes');
    }
    e.target.classList.add('yes');
  }
  globalMode();
  document.querySelector('.gameplay_score').innerHTML = 0;
  btn.classList.remove('pause__btn');
  btn.classList.add('play__btn');
  play_voice = false;
}

function tooglerMode() {
  for (let btn of gameModeCol) {
    btn.addEventListener('click',checkerBtn);
  }
}
tooglerMode();
globalMode();
function globalMode() {
  if (togleObj['Brawl Stars']) {
    
    let scoreCounter = 5;
    let roundEndArr = [];
    const ok = document.createElement('audio');
    ok.src = '../game-page/assets/audio/yes.mp3';
    const notok = document.createElement('audio');
    notok.src = '../game-page/assets/audio/no.mp3';
  
    function randomAudio (arr) {
      const audioFile = document.querySelector('.gameplay__audio');
      if (roundEndArr.length < 7){
        let randomN = Math.floor(Math.random()*arr.length);
        while (roundEndArr.includes(randomN)){
          randomN = Math.floor(Math.random()*arr.length)
        }     
        audioFile.src = arr[randomN];
        roundEndArr.push(randomN);
        let name = (arr[randomN].slice(arr[randomN].lastIndexOf('/')+1, arr[randomN].lastIndexOf('.')).toLowerCase());
        if (!isNaN(name[name.length-1]*1)) {
          return name.slice(0, name.length-1);
        }
        else {
          return name;
        }
      }
      else {
        win(roundEndArr);
      }
      
      
    }
  
    function buttonsCreater(char, arr) {
      const gameTest = document.querySelectorAll('.gameplay__label');
      const hidden_char = document.querySelector('.gameplay__hid-pic');
      const nextButton = document.querySelector('.next_button');
      const infoPic = document.querySelector('.gameplay__infopic');
      const charName = document.querySelector('.gameplay__infotittle');
      const charDescription = document.querySelector('.gameplay__character');
      const gameAnswer = document.querySelector('.gameplay__answer');
      const audioFileCopy = document.createElement('audio');
      if (document.querySelector('.created')) {        
        document.querySelector('.created').remove();
      }      
      audioFileCopy.classList.add('created');
      infoPic.src = './assets/img/feat22-1024x576.png';
      hidden_char.src = './assets/img/feat22-1024x576.png';
      charName.innerHTML = 'The rules are easy!';
      charDescription.innerHTML = 'You should launch the audio player, recognize the character and choose him, the NEXT button will be active after correct answer';
      gameAnswer.innerHTML = 'XXXXXX';
      gameAnswer.classList.remove('yes');
      nextButton.disabled = true;
      nextButton.classList.remove('yes');  
      const randomPositions = [];
      const randomNames = [];
      const arrIndexes = [];
      if (char) {
        while (randomPositions.length < 6) {
          const randomBtn = Math.floor(Math.random()*6);
          if (!randomPositions.includes(randomBtn)) {
            randomPositions.push(randomBtn);
          }
        }
        while (randomNames.length < 6) {
          const randomName = Math.ceil(Math.random()*(arr.length-1));
          if (!arrIndexes.includes(randomName) && !char.toUpperCase().includes(arr[randomName].name.toUpperCase())) {
            arrIndexes.push(randomName);
            randomNames.push(arr[randomName].name);
          }
        }
        randomPositions.forEach((value, i) => {
          gameTest[value].classList.remove('no');
          gameTest[value].classList.remove('yes');
          gameTest[value].innerHTML = '';
          gameTest[value].innerHTML = randomNames[i].toUpperCase();
        })
        gameTest[Math.floor(Math.random()*6)].innerHTML = char.toUpperCase();
        toAddListeners();
        return char;
      }
      
    }
  
    function afterChoice(e) {
      const click = e.target;
      const hidden_char = document.querySelector('.gameplay__hid-pic');
      const gameScore = document.querySelector('.gameplay_score');
      const gameAnswer = document.querySelector('.gameplay__answer');
      const infoPic = document.querySelector('.gameplay__infopic');
      const charName = document.querySelector('.gameplay__infotittle');
      const charDescription = document.querySelector('.gameplay__character');
      const nextButton = document.querySelector('.next_button');
      const audioFile = document.querySelector('.gameplay__audio');
      const audioFileCopy = document.createElement('audio');
      if (document.querySelector('.created')) {        
        document.querySelector('.created').remove();
      }      
      audioFileCopy.classList.add('created');
      for (let i = 0; i < CharInfo[0].length; i++) {
        if (CharInfo[0][i].name.toUpperCase() === click.innerHTML) {
          infoPic.src = CharInfo[0][i].image;
          infoPic.after(audioFileCopy);          
          let songPath = ''
          audioArr[0].forEach((value) => {
            if (value.slice(value.lastIndexOf('/')).toUpperCase().includes(CharInfo[0][i].name.toUpperCase())) {
              songPath = value;
            }
          })
          audioFileCopy.src = songPath;          
          audioFileCopy.controls = true;
          charName.innerHTML = CharInfo[0][i].name;
          charDescription.innerHTML = CharInfo[0][i].description;
          if (audioFile.src.slice(audioFile.src.lastIndexOf('/')).toUpperCase().includes(click.innerHTML)) {
            audioFile.pause();
            btn.classList.remove('pause__btn');
            btn.classList.add('play__btn');
            play_voice = false;
            ok.play();
            click.classList.add('yes');
            hidden_char.src = CharInfo[0][i].image;
            gameAnswer.innerHTML = click.innerHTML;
            gameAnswer.classList.add('yes');
            nextButton.disabled = false;
            nextButton.classList.add('yes');
            gameScore.innerHTML = Number(gameScore.innerHTML) + scoreCounter;
            scoreCounter = 5;
            const gameTest = document.querySelectorAll('.gameplay__label');
            for (let btn of gameTest) {    
              btn.removeEventListener('click', afterChoice);
              btn.addEventListener('click', (e) => {
                for (let j = 0; j < CharInfo[0].length; j++) {
                  if (CharInfo[0][j].name.toUpperCase() === e.target.innerHTML) {
                    if (document.querySelector('.created')) {        
                      document.querySelector('.created').remove();
                    }      
                    audioFileCopy.classList.add('created');
                    infoPic.src = CharInfo[0][j].image;
                    infoPic.after(audioFileCopy);
                    charName.innerHTML = CharInfo[0][j].name;
                    charDescription.innerHTML = CharInfo[0][j].description;
                    let Sisong = ''
                    audioArr[0].forEach((value) => {
                      if (value.slice(value.lastIndexOf('/')).toUpperCase().includes(CharInfo[0][j].name.toUpperCase())) {
                        Sisong = value;
                      }
                    })
                    audioFileCopy.src = Sisong;          
                    audioFileCopy.controls = true;
                    break;
                  }
                }
              })
            }
            function nextListen () {
              buttonsCreater(randomAudio(audioArr[0]), CharInfo[0]);
              nextButton.removeEventListener('click', nextListen);
            }
            nextButton.addEventListener('click', nextListen);       
              
            break;
          }
          else {
            if (!click.matches('.no')) {            
              scoreCounter--;
              notok.play();
              click.classList.add('no');
            }
            break;
          }
        }
      }
    }
    function storageSetter () {
      const nameL = document.querySelector('.popup__input').value;
      const scoreL = document.querySelector('.gameplay_score').innerHTML;
      const btncollection = document.querySelectorAll('.theme__button');
      const arrResult = [];
      if (!localStorage.result) {        
        localStorage.setItem('result', JSON.stringify([]));
      }
      for (let status of btncollection) {
        if (status.matches('.yes')) {
          arrResult.push(status.innerHTML);
          break;
        }
      }
      arrResult.push(nameL);  
      arrResult.push(scoreL);
      const arrStorage = JSON.parse(localStorage.getItem('result'));
      arrStorage.push(arrResult);
      arrStorage.sort((a,b) => {
        return b[2] - a[2];
      })
      if (arrStorage.length > 15) {
        arrStorage.pop();
      }
      localStorage.setItem('result', JSON.stringify(arrStorage));
    }
  
    function win(roundArr) {
      const popup = document.querySelector('.popup__body');
      const submit = document.querySelector('.popup__btn');
      popup.classList.add('active');
      roundArr = [];
      submit.addEventListener('click', storageSetter);
    }
    buttonsCreater(randomAudio(audioArr[0]), CharInfo[0]);
    toAddListeners();
  
    function toAddListeners () {
      const gameTest = document.querySelectorAll('.gameplay__label');
      for (let btn of gameTest) {    
        btn.addEventListener('click', afterChoice);
      } 
    }
  
  }
  if (togleObj.Naruto) {
    let scoreCounter = 5;
    let roundEndArr = [];
    const ok = document.createElement('audio');
    ok.src = '../game-page/assets/audio/yes.mp3';
    const notok = document.createElement('audio');
    notok.src = '../game-page/assets/audio/no.mp3';
  
    function randomAudio (arr) {
      const audioFile = document.querySelector('.gameplay__audio');
      if (roundEndArr.length < 7){
        let randomN = Math.floor(Math.random()*arr.length);
        while (roundEndArr.includes(randomN)){
          randomN = Math.floor(Math.random()*arr.length)
        }     
        audioFile.src = arr[randomN];
        roundEndArr.push(randomN);
        let name = (arr[randomN].slice(arr[randomN].lastIndexOf('/')+1, arr[randomN].lastIndexOf('.')).toLowerCase());
        if (!isNaN(name[name.length-1]*1)) {
          return name.slice(0, name.length-1);
        }
        else {
          return name;
        }
      }
      else {
        win(roundEndArr);
      }
      
      
    }
  
    function buttonsCreater(char, arr) {
      const gameTest = document.querySelectorAll('.gameplay__label');
      const hidden_char = document.querySelector('.gameplay__hid-pic');
      const nextButton = document.querySelector('.next_button');
      const infoPic = document.querySelector('.gameplay__infopic');
      const charName = document.querySelector('.gameplay__infotittle');
      const charDescription = document.querySelector('.gameplay__character');
      const gameAnswer = document.querySelector('.gameplay__answer');
      const audioFileCopy = document.createElement('audio');
      if (document.querySelector('.created')) {        
        document.querySelector('.created').remove();
      }     
      audioFileCopy.classList.add('created');
      infoPic.src = './assets/img/feat22-1024x576.png';
      hidden_char.src = './assets/img/feat22-1024x576.png';
      charName.innerHTML = 'The rules are easy!';
      charDescription.innerHTML = 'You should launch the audio player, recognize the character and choose him, the NEXT button will be active after correct answer';
      gameAnswer.innerHTML = 'XXXXXX';
      gameAnswer.classList.remove('yes');
      nextButton.disabled = true;
      nextButton.classList.remove('yes');  
      const randomPositions = [];
      const randomNames = [];
      const arrIndexes = [];
      if (char) {
        while (randomPositions.length < 6) {
          const randomBtn = Math.floor(Math.random()*6);
          if (!randomPositions.includes(randomBtn)) {
            randomPositions.push(randomBtn);
          }
        }
        while (randomNames.length < 6) {
          const randomName = Math.ceil(Math.random()*(arr.length-1));
          if (!arrIndexes.includes(randomName) && !char.toUpperCase().includes(arr[randomName].name.toUpperCase())) {
            arrIndexes.push(randomName);
            randomNames.push(arr[randomName].name);
          }
        }
        randomPositions.forEach((value, i) => {
          gameTest[value].classList.remove('no');
          gameTest[value].classList.remove('yes');
          gameTest[value].innerHTML = '';
          gameTest[value].innerHTML = randomNames[i].toUpperCase();
        })
        gameTest[Math.floor(Math.random()*6)].innerHTML = char.toUpperCase();
        toAddListeners();
        return char;
      }
      
    }
  
    function afterChoice(e) {
      const click = e.target;
      const hidden_char = document.querySelector('.gameplay__hid-pic');
      const gameScore = document.querySelector('.gameplay_score');
      const gameAnswer = document.querySelector('.gameplay__answer');
      const infoPic = document.querySelector('.gameplay__infopic');
      const charName = document.querySelector('.gameplay__infotittle');
      const charDescription = document.querySelector('.gameplay__character');
      const nextButton = document.querySelector('.next_button');
      const audioFile = document.querySelector('.gameplay__audio');
      const audioFileCopy = document.createElement('audio');
      if (document.querySelector('.created')) {        
        document.querySelector('.created').remove();
      }      
      audioFileCopy.classList.add('created');
      for (let i = 0; i < CharInfo[1].length; i++) {
        if (CharInfo[1][i].name.toUpperCase() === click.innerHTML) {
          infoPic.src = CharInfo[1][i].image;
          infoPic.after(audioFileCopy);
          let songPath = ''
          audioArr[1].forEach((value) => {
            if (value.slice(value.lastIndexOf('/')).toUpperCase().includes(CharInfo[1][i].name.toUpperCase())) {
              songPath = value;
            }
          })
          audioFileCopy.src = songPath;          
          audioFileCopy.controls = true;
          charName.innerHTML = CharInfo[1][i].name;
          charDescription.innerHTML = CharInfo[1][i].description;
          if (audioFile.src.slice(audioFile.src.lastIndexOf('/')).toUpperCase().includes(click.innerHTML)) {
            audioFile.pause();
            btn.classList.remove('pause__btn');
            btn.classList.add('play__btn');
            play_voice = false;
            ok.play();
            click.classList.add('yes');
            hidden_char.src = CharInfo[1][i].image;
            gameAnswer.innerHTML = click.innerHTML;
            gameAnswer.classList.add('yes');
            nextButton.disabled = false;
            nextButton.classList.add('yes');
            gameScore.innerHTML = Number(gameScore.innerHTML) + scoreCounter;
            scoreCounter = 5;
            const gameTest = document.querySelectorAll('.gameplay__label');
            for (let btn of gameTest) {    
              btn.removeEventListener('click', afterChoice);
              btn.addEventListener('click', (e) => {
                for (let j = 0; j < CharInfo[1].length; j++) {
                  if (CharInfo[1][j].name.toUpperCase() === e.target.innerHTML) {
                    if (document.querySelector('.created')) {        
                      document.querySelector('.created').remove();
                    }      
                    audioFileCopy.classList.add('created');
                    infoPic.src = CharInfo[1][j].image;
                    infoPic.after(audioFileCopy);
                    charName.innerHTML = CharInfo[1][j].name;
                    charDescription.innerHTML = CharInfo[1][j].description;
                    let Sisong = ''
                    audioArr[1].forEach((value) => {
                      if (value.slice(value.lastIndexOf('/')).toUpperCase().includes(CharInfo[1][j].name.toUpperCase())) {
                        Sisong = value;
                      }
                    })
                    audioFileCopy.src = Sisong;          
                    audioFileCopy.controls = true;
                    break;
                  }
                }
              })
            }
            function nextListen () {
              buttonsCreater(randomAudio(audioArr[1]), CharInfo[1]);
              nextButton.removeEventListener('click', nextListen);
            }
            nextButton.addEventListener('click', nextListen);       
              
            break;
          }
          else {
            if (!click.matches('.no')) {            
              scoreCounter--;
              notok.play();
              click.classList.add('no');
            }
            break;
          }
        }
      }
    }
    function storageSetter () {
      const nameL = document.querySelector('.popup__input').value;
      const scoreL = document.querySelector('.gameplay_score').innerHTML;
      const btncollection = document.querySelectorAll('.theme__button');
      const arrResult = [];
      if (!localStorage.result) {        
        localStorage.setItem('result', JSON.stringify([]));
      }
      for (let status of btncollection) {
        if (status.matches('.yes')) {
          arrResult.push(status.innerHTML);
          break;
        }
      }
      arrResult.push(nameL);  
      arrResult.push(scoreL);
      const arrStorage = JSON.parse(localStorage.getItem('result'));
      arrStorage.push(arrResult);
      arrStorage.sort((a,b) => {
        return b[2] - a[2];
      })
      if (arrStorage.length > 15) {
        arrStorage.pop();
      }
      localStorage.setItem('result', JSON.stringify(arrStorage));
    }
  
    function win(roundArr) {
      const popup = document.querySelector('.popup__body');
      const submit = document.querySelector('.popup__btn');
      popup.classList.add('active');
      roundArr = [];
      submit.addEventListener('click', storageSetter);
    }
    buttonsCreater(randomAudio(audioArr[1]), CharInfo[1]);
    toAddListeners();
  
    function toAddListeners () {
      const gameTest = document.querySelectorAll('.gameplay__label');
      for (let btn of gameTest) {    
        btn.addEventListener('click', afterChoice);
      } 
    }
  
  }
  if (togleObj['Warcraft 3']) { 
    let scoreCounter = 5;
    let roundEndArr = [];
    const ok = document.createElement('audio');
    ok.src = '../game-page/assets/audio/yes.mp3';
    const notok = document.createElement('audio');
    notok.src = '../game-page/assets/audio/no.mp3';
  
    function randomAudio (arr) {
      const audioFile = document.querySelector('.gameplay__audio');
      if (roundEndArr.length < 7){
        let randomN = Math.floor(Math.random()*arr.length);
        while (roundEndArr.includes(randomN)){
          randomN = Math.floor(Math.random()*arr.length)
        }     
        audioFile.src = arr[randomN];
        roundEndArr.push(randomN);
        let name = (arr[randomN].slice(arr[randomN].lastIndexOf('/')+1, arr[randomN].lastIndexOf('.')).toLowerCase());
        if (!isNaN(name[name.length-1]*1)) {
          return name.slice(0, name.length-1);
        }
        else {
          return name;
        }
      }
      else {
        win(roundEndArr);
      }
      
      
    }
  
    function buttonsCreater(char, arr) {
      const gameTest = document.querySelectorAll('.gameplay__label');
      const hidden_char = document.querySelector('.gameplay__hid-pic');
      const nextButton = document.querySelector('.next_button');
      const infoPic = document.querySelector('.gameplay__infopic');
      const charName = document.querySelector('.gameplay__infotittle');
      const charDescription = document.querySelector('.gameplay__character');
      const gameAnswer = document.querySelector('.gameplay__answer');
      const audioFileCopy = document.createElement('audio');
      if (document.querySelector('.created')) {        
        document.querySelector('.created').remove();
      }      
      audioFileCopy.classList.add('created');
      infoPic.src = './assets/img/feat22-1024x576.png';
      hidden_char.src = './assets/img/feat22-1024x576.png';
      charName.innerHTML = 'The rules are easy!';
      charDescription.innerHTML = 'You should launch the audio player, recognize the character and choose him, the NEXT button will be active after correct answer';
      gameAnswer.innerHTML = 'XXXXXX';
      gameAnswer.classList.remove('yes');
      nextButton.disabled = true;
      nextButton.classList.remove('yes');  
      const randomPositions = [];
      const randomNames = [];
      const arrIndexes = [];
      if (char) {
        while (randomPositions.length < 6) {
          const randomBtn = Math.floor(Math.random()*6);
          if (!randomPositions.includes(randomBtn)) {
            randomPositions.push(randomBtn);
          }
        }
        while (randomNames.length < 6) {
          const randomName = Math.ceil(Math.random()*(arr.length-1));
          if (!arrIndexes.includes(randomName) && !char.toUpperCase().includes(arr[randomName].name.toUpperCase())) {
            arrIndexes.push(randomName);
            randomNames.push(arr[randomName].name);
          }
        }
        randomPositions.forEach((value, i) => {
          gameTest[value].classList.remove('no');
          gameTest[value].classList.remove('yes');
          gameTest[value].innerHTML = '';
          gameTest[value].innerHTML = randomNames[i].toUpperCase();
        })
        gameTest[Math.floor(Math.random()*6)].innerHTML = char.toUpperCase();
        toAddListeners();
        return char;
      }
      
    }
  
    function afterChoice(e) {
      const click = e.target;
      const hidden_char = document.querySelector('.gameplay__hid-pic');
      const gameScore = document.querySelector('.gameplay_score');
      const gameAnswer = document.querySelector('.gameplay__answer');
      const infoPic = document.querySelector('.gameplay__infopic');
      const charName = document.querySelector('.gameplay__infotittle');
      const charDescription = document.querySelector('.gameplay__character');
      const nextButton = document.querySelector('.next_button');
      const audioFile = document.querySelector('.gameplay__audio');
      const audioFileCopy = document.createElement('audio');
      if (document.querySelector('.created')) {        
        document.querySelector('.created').remove();
      }      
      audioFileCopy.classList.add('created');
      for (let i = 0; i < CharInfo[2].length; i++) {
        if (CharInfo[2][i].name.toUpperCase() === click.innerHTML) {
          infoPic.src = CharInfo[2][i].image;          
          infoPic.after(audioFileCopy);
          let songPath = ''
          audioArr[2].forEach((value) => {
            if (value.slice(value.lastIndexOf('/')).toUpperCase().includes(CharInfo[2][i].name.toUpperCase())) {
              songPath = value;
            }
          })
          audioFileCopy.src = songPath;          
          audioFileCopy.controls = true;
          charName.innerHTML = CharInfo[2][i].name;
          charDescription.innerHTML = CharInfo[2][i].description;
          if (audioFile.src.slice(audioFile.src.lastIndexOf('/')).toUpperCase().includes(click.innerHTML)) {
            audioFile.pause();
            btn.classList.remove('pause__btn');
            btn.classList.add('play__btn');
            play_voice = false;
            ok.play();
            audioFileCopy.controls = true;
            audioFileCopy.src = audioFile.src;
            click.classList.add('yes');
            hidden_char.src = CharInfo[2][i].image;
            gameAnswer.innerHTML = click.innerHTML;
            gameAnswer.classList.add('yes');
            nextButton.disabled = false;
            nextButton.classList.add('yes');
            gameScore.innerHTML = Number(gameScore.innerHTML) + scoreCounter;
            scoreCounter = 5;
            const gameTest = document.querySelectorAll('.gameplay__label');
            for (let btn of gameTest) {    
              btn.removeEventListener('click', afterChoice);
              btn.addEventListener('click', (e) => {
                for (let j = 0; j < CharInfo[2].length; j++) {
                  if (CharInfo[2][j].name.toUpperCase() === e.target.innerHTML) {
                    if (document.querySelector('.created')) {        
                      document.querySelector('.created').remove();
                    }      
                    audioFileCopy.classList.add('created');
                    infoPic.src = CharInfo[2][j].image;                    
                    infoPic.after(audioFileCopy);
                    charName.innerHTML = CharInfo[2][j].name;
                    charDescription.innerHTML = CharInfo[2][j].description;
                    let Sisong = ''
                    audioArr[2].forEach((value) => {
                      if (value.slice(value.lastIndexOf('/')).toUpperCase().includes(CharInfo[2][j].name.toUpperCase())) {
                        Sisong = value;
                      }
                    })
                    audioFileCopy.src = Sisong;          
                    audioFileCopy.controls = true;
                    break;
                  }
                }
              })
            }
            
            function nextListen () {
              buttonsCreater(randomAudio(audioArr[2]), CharInfo[2]);
              nextButton.removeEventListener('click', nextListen);
              if (document.querySelector('.created')) {        
                document.querySelector('.created').remove();
              }
            }
            nextButton.addEventListener('click', nextListen);       
              
            break;
          }
          else {
            if (!click.matches('.no')) {            
              scoreCounter--;
              notok.play();
              click.classList.add('no');
            }
            break;
          }
        }
      }
    }
    function storageSetter () {
      const nameL = document.querySelector('.popup__input').value;
      const scoreL = document.querySelector('.gameplay_score').innerHTML;
      const btncollection = document.querySelectorAll('.theme__button');
      const arrResult = [];
      if (!localStorage.result) {        
        localStorage.setItem('result', JSON.stringify([]));
      }
      for (let status of btncollection) {
        if (status.matches('.yes')) {
          arrResult.push(status.innerHTML);
          break;
        }
      }
      arrResult.push(nameL);  
      arrResult.push(scoreL);
      const arrStorage = JSON.parse(localStorage.getItem('result'));
      arrStorage.push(arrResult);
      arrStorage.sort((a,b) => {
        return b[2] - a[2];
      })
      if (arrStorage.length > 15) {
        arrStorage.pop();
      }
      localStorage.setItem('result', JSON.stringify(arrStorage));
    }
  
    function win(roundArr) {
      const popup = document.querySelector('.popup__body');
      const submit = document.querySelector('.popup__btn');
      popup.classList.add('active');
      roundArr = [];
      submit.addEventListener('click', storageSetter);
    }
    buttonsCreater(randomAudio(audioArr[2]), CharInfo[2]);
    toAddListeners();
  
    function toAddListeners () {
      const gameTest = document.querySelectorAll('.gameplay__label');
      for (let btn of gameTest) {    
        btn.addEventListener('click', afterChoice);
      } 
    }
  
  }
}

let play_voice = false;
let volon = true;

  const btn = document.querySelector('.btn');
  const audio = document.querySelector('.gameplay__audio');
  const beats = document.querySelector('.box__beats');
  const volumeInp = document.querySelector('.volume');
  const imgVol = document.querySelector('.vol_pic');
  const progressBar= document.querySelector('.progress_bart');
  const progress = document.querySelector('.progress');
  
  btn.addEventListener('click', process);
  volumeInp.addEventListener('input', volume);
  imgVol.addEventListener('click', () => {
    if (volon) {
      volon = false;
      imgVol.src = './assets/img/volumeoff.png'
      audio.volume = 0;
    }
    else {
      volon = true;
      imgVol.src = './assets/img/volume.png'
      audio.volume = 1;
    }
  })

  function process () {
    if (!play_voice) {
      playV();
    }
    else {
      pauseV();
    }
  }
  function playV () {
    audio.play();
    play_voice = true;
    btn.classList.remove('play__btn');
    btn.classList.add('pause__btn');
    audio.addEventListener('ended', pauseV);
  }
  function pauseV () {
    audio.pause();
    play_voice = false;
    btn.classList.remove('pause__btn');
    btn.classList.add('play__btn');
  }

  function volume () {
    audio.volume = volumeInp.value / 100;
    imgVol.src = './assets/img/volume.png';
    volon = true;
  }

  function updater (e) {
    const duration = audio.duration;
    const time = audio.currentTime;
    const currentPercent = Math.floor(time / duration * 100);
    progress.value = `${currentPercent}`;
    if (isNaN(duration)) {
      progress.value = '0';
    }
    
  }
  function positionByClick () {
    const duration = audio.duration;
    audio.currentTime = progress.value * duration / 100; 
  }



  audio.addEventListener('timeupdate', updater);
  progress.addEventListener('input', positionByClick);


