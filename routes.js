document.addEventListener('DOMContentLoaded', () => {

  const iniciarButton = document.getElementById('iniciar');
  const returnHomeButton = document.getElementById('returnHome');
  const passearButtonRoute = document.getElementById('passearButton');

  if (iniciarButton) {    
    iniciarButton.addEventListener('click', () => {
      window.location.href = 'jogo.html';
    });
  }

  if (returnHomeButton) {
    returnHomeButton.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }
});
