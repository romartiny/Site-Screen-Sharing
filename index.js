localStorage.setItem('winCount', (Number(localStorage.getItem('winCount')) + 1).toString());

window.addEventListener('unload', () => {
  localStorage.setItem(
      'winCount', Math.max(Number(localStorage.getItem('winCount')) - 1, 0).toString()
  );
});

const winNumber = sessionStorage.getItem('winNumber') ? Number(sessionStorage.getItem('winNumber')) : Number(localStorage.getItem('winCount'));

sessionStorage.setItem('winNumber', winNumber.toString());

const setWinPosition = () => {
  const winPositions = JSON.parse(localStorage.getItem('winPositions') ?? '{}');

  winPositions[winNumber] = {top: window.screenTop, left: window.screenLeft, width: window.innerWidth, height: window.innerHeight,};

  localStorage.setItem('winPositions', JSON.stringify(winPositions));
};

window.addEventListener('unload', () => {
  const winPositions = JSON.parse(localStorage.getItem('winPositions') ?? '{}');

  delete winPositions[winNumber];

  localStorage.setItem('winPositions', JSON.stringify(winPositions));
});

setInterval(setWinPosition, 5);
setWinPosition();

const createMain = (top, left) => {
  const main = document.createElement('main');

  main.style.width = '80px';
  main.style.height = '80px';
  main.style.backgroundImage = 'url(./assets/logo.png)';
  main.style.backgroundSize = 'contain';
  main.style.backgroundRepeat = 'no-repeat';
  main.style.backgroundPosition = 'center';
  main.style.position = 'fixed';
  main.style.top = `${top}px`;
  main.style.left = `${left}px`;
  main.style.transform = 'translate(-50%, -50%)';
  document.body.style.backgroundColor = "black";

  document.getElementById('screen').appendChild(main);
};

const insertMain = () => {
  const screen = document.getElementById('screen');

  if (screen) {
    screen.innerHTML = '';
  }

  const winPositions = JSON.parse(localStorage.getItem('winPositions') ?? '{}');
  const data = winPositions[winNumber];

  createMain(data.height / 2, data.width / 2);

  const globalMainX = data.left + data.width / 2;
  const globalMainY = data.top + data.height / 2;

  const otherNumbers = Object.keys(winPositions).filter((number) => number !== winNumber.toString());

  otherNumbers.forEach((i) => {
    const logoData = winPositions[i];
    const mainX = logoData.left + logoData.width / 2;
    const mainY = logoData.top + logoData.height / 2;
    const centerX = data.width / 2 + (mainX - globalMainX);
    const centerY = data.height / 2 + (mainY - globalMainY);

    createMain(centerY, centerX);
  });
};

setInterval(insertMain, 5);
