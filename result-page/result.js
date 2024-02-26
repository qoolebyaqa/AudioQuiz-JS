
function SG () {
  if (localStorage.result) {
    const results = JSON.parse(localStorage.getItem('result'));
    
    for (let i = 0; i < results.length; i++) {
      const newResult = document.createElement('div');
      newResult.classList.add('results__row');
      const resultName = document.createElement('div');
      resultName.classList.add('results__name');
      const resultScore = document.createElement('div');
      resultScore.classList.add('results__score');
      const resultMode = document.createElement('div');
      resultMode.classList.add('results__mode');

      resultMode.innerHTML = results[i][0];
      resultName.innerHTML = results[i][1];
      resultScore.innerHTML =  results[i][2];
      newResult.append(resultName, resultMode, resultScore);
      document.querySelector('.results__wrapper').append(newResult);
     /*  for (let row of document.querySelectorAll('.results__row')){
        if (row.children[2].innerHTML <= Number(results[i][2])) {
          row.before(newResult);
        }
        else if (row.children[2].innerHTML > Number(results[i][2])) {
          row.after(newResult);
        }
        else if (!(row.children[2].innerHTML > 3)) {
          row.after(newResult);
        }
      } */

    }
    
  }
}

SG();






/* function storageGetter () {
  let arrResult = [];
  if (!localStorage.arrResult) {
    if (localStorage.name) {
      const newResult = document.createElement('div');
      newResult.classList.add('results__row');
      const resultName = document.createElement('div');
      resultName.classList.add('results__name');
      const resultScore = document.createElement('div');
      resultScore.classList.add('results__score');
      const resultMode = document.createElement('div');
      resultMode.classList.add('results__mode');
      resultName.innerHTML = JSON.parse(localStorage.getItem('name'));
      resultMode.innerHTML =  JSON.parse(localStorage.getItem('mode'));
      resultScore.innerHTML = JSON.parse(localStorage.getItem('score'));
      newResult.append(resultName, resultMode, resultScore);
      document.querySelector('.results__wrapper').append(newResult);
      const arrCur = [];
      arrCur.push(JSON.parse(localStorage.getItem('name')));
      arrCur.push(JSON.parse(localStorage.getItem('mode')));
      arrCur.push(JSON.parse(localStorage.getItem('score')));
      localStorage.removeItem('name')
      localStorage.removeItem('mode')
      localStorage.removeItem('score');
      arrResult.push(arrCur);
      localStorage.setItem('result', JSON.stringify(arrResult));
    }
  }
  else { 
    arrResult = JSON.parse(localStorage.getItem('result'));
    const arrCur = [];
    if (localStorage.name) {     
      arrCur.push(JSON.parse(localStorage.getItem('name')));
      arrCur.push(JSON.parse(localStorage.getItem('mode')));
      arrCur.push(JSON.parse(localStorage.getItem('score')));
    }
    arrResult.push(arrCur);  
    localStorage.removeItem('name')
    localStorage.removeItem('mode')
    localStorage.removeItem('score');
    localStorage.setItem('result', JSON.stringify(arrResult));
     
  }
  return arrResult; 
  
} 

function toHoldResult (arr) { 
  for (let i = 0; i < arr.length; i++) {
    const newResult = document.createElement('div');
    newResult.classList.add('results__row');
    const resultName = document.createElement('div');
    resultName.classList.add('results__name');
    const resultScore = document.createElement('div');
    resultScore.classList.add('results__score');
    const resultMode = document.createElement('div');
    resultMode.classList.add('results__mode');
    resultName.innerHTML = arr[i][0];
    resultMode.innerHTML =  arr[i][1];
    resultScore.innerHTML = arr[i][2];
    newResult.append(resultName, resultMode, resultScore);
    for (let row of document.querySelectorAll('.results__row')){
      if (row.children[2].innerHTML <= Number(arr[i][2])) {
        row.before(newResult);
      }
      else if (row.children[2].innerHTML > Number(arr[i][2])) {
        row.after(newResult);
      }
      else if (!(row.children[2].innerHTML > 3)) {
        row.after(newResult);
      }
    }
  }
}

toHoldResult(storageGetter()); */

