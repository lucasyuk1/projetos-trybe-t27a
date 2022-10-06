window.onload = function () {

  let colors = document.querySelectorAll('.color');
  let grid = document.querySelector('#pixel-board');

  // Gerando o grid de 5x5

  // for (let i = 0; i < 25; i += 1) {
  //   let div = document.createElement('div');
  //   div.className = 'pixel';
  //   div.id = i;
  //   grid.appendChild(div);
  //   grid.style.width = '225px';
  //   grid.style.height = '225px';
  // }

  //Gerando cores aleatórias
  let boxColor = document.querySelectorAll('.random');
  let buttoncolor = document.querySelector('#button-random-color');

  buttoncolor.addEventListener('click', changeColor);
  buttoncolor.addEventListener('click', saveColors);

  let save = document.querySelector('#color-palette');
 

  function randomColor() {
    let numbers = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i += 1) {
      const rngColor = Math.floor(Math.random() * numbers.length);
      color += numbers.substring(rngColor, rngColor + 1);
    }
    return color;
  }


  function changeColor() {
    boxColor.forEach((e) => {
      let newColor = randomColor();
      e.style.background = newColor;
    });
  }
  changeColor();



  // Capturando e removendo as cores


  for (let i = 0; i < colors.length; i += 1) {
    colors[i].addEventListener('click', removeSelect);
    colors[i].addEventListener('click', addSelect);
  }
  function removeSelect() {
    for (let i = 0; i < colors.length; i += 1) {
      colors[i].classList.remove('selected');
    }
  }
  function addSelect(event) {
    event.target.classList.add('selected');
  }


  //Pintando os pixels

  document.addEventListener('click', function pixelColor(event) {
    if (event.target.classList.contains('pixel')) {
      const getSelected = document.querySelector('.selected');
      const getBgcolor = window.getComputedStyle(getSelected).getPropertyValue('background-color');
      event.target.style.backgroundColor = getBgcolor;
    }
    saveColors();
    savePixel();
  });

  //Limpando o quadro

  function clearColors() {
    let clear = document.querySelectorAll('.pixel');
    clear.forEach((e) => {
      e.style.backgroundColor = 'white';
      savePixel();
    });
  }

  let clearButton = document.querySelector('#clear-board');
  clearButton.addEventListener('click', clearColors);


  // Armazenando dados da paleta

  let arrayColors = [];
  function saveColors() {
    for (let i = 0; i < 4; i++) {
      arrayColors[i] = colors[i].style.backgroundColor;
    }
    localStorage.setItem('colorPalette', JSON.stringify(arrayColors));
  }

  function loadColors() {
    let save = JSON.parse(localStorage.getItem('colorPalette'));
    for (let i = 0; i < 4; i++) {
      colors[i].style.backgroundColor = save[i];
    }
  }
  
  if (localStorage.getItem('colorPalette') === null) {
    changeColor();
  }
  else {
    loadColors();
  }
  
  //Criando dinâmicamente o grid
  
  function createGrid(gridSize) {
    grid.style.height = gridSize * 44 + 'px';
    grid.style.width = gridSize * 44 + 'px';
    let matrix = gridSize ** 2;

    for (let i = 0; i < matrix; i += 1) {
      let div = document.createElement('div');
      div.className = 'pixel';
      div.id = i;
      grid.appendChild(div);
    }
  }

  function userGrid() {
    
    let input = document.getElementById('board-size');
    let iValue = input.value;
    
    if (iValue < 5) {
      iValue = 5;
    } else if (iValue > 50) {
      iValue = 50;
    } else {
      iValue = input.value;
    }
   
    createGrid(iValue);

    saveGrid();
  }
  
  let input = document.getElementById('board-size');
  
  function createGridUser() {
    
    grid.innerText = '';
    if (input.value === '') {
      alert('Board inválido!');
    } else {
      userGrid();
    }
  }
  
  let button = document.getElementById('generate-board');
  button.addEventListener('click', createGridUser);
  
  let arrayPixels = [];
  let pixels = document.getElementsByClassName('pixel');
  
  function savePixel() {
    for (let i = 0; i < pixels.length; i++) {
      arrayPixels[i] = pixels[i].style.backgroundColor;
    }
    localStorage.setItem('pixelBoard', JSON.stringify(arrayPixels));
  }
  function loadPixel() {
    let pixelsSalvos = JSON.parse(localStorage.getItem('pixelBoard'));
    for (let i = 0; i < pixels.length; i++) {
      pixels[i].style.backgroundColor = pixelsSalvos[i];
    }
  }
  
  // Salvando grid
  
  function saveGrid() {
    let pegarPixels = document.querySelectorAll('.pixel');
    let mathSize = Math.sqrt(pegarPixels.length);
    localStorage.setItem('boardSize', JSON.stringify(mathSize));
  }
  
  
  function loadGrid() {
    let gridSize = JSON.parse(localStorage.getItem('boardSize'));
    if (!gridSize) gridSize = 5;
    createGrid(gridSize);
  }

  loadGrid();

  if (localStorage.getItem('pixelBoard') !== null) {
    loadPixel();
  }

  
}



