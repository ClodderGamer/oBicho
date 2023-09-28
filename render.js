document.addEventListener('DOMContentLoaded', () => {
  const numeroNivel = document.getElementById('numeroNivel');
  const valorDinheiro = document.getElementById('dinheiro');
  const nivelProgress = document.getElementById('nivel');
  const vidaProgress = document.getElementById('vida');
  const energiaProgress = document.getElementById('energia');
  const felicidadeProgress = document.getElementById('felicidade');
  const fomeProgress = document.getElementById('fome');
  const alimentarButton = document.getElementById('alimentar');
  const listaOpcoes = document.getElementById('listaOpcoes');
  const bifeButton = document.getElementById('bife');
  const bolachaButton = document.getElementById('bolacha');
  const dormirButton = document.getElementById('dormir');
  const brincarButton = document.getElementById('brincar');
  const passearButton = document.getElementById('passear');
  const caixaNotificacao = document.getElementById('notificacao');

  let nivel = 0;
  let vida = 100;
  let energia = 100;
  let felicidade = 100;
  let fome = 0;

  function updateUI() {
    nivel = Math.min(Math.max(nivel, 0), 100);
    vida = Math.min(Math.max(vida, 0), 100);
    energia = Math.min(Math.max(energia, 0), 100);
    felicidade = Math.min(Math.max(felicidade, 0), 100);
    fome = Math.min(Math.max(fome, 0), 100);

    nivelProgress.value = nivel;
    vidaProgress.value = vida;
    energiaProgress.value = energia;
    felicidadeProgress.value = felicidade;
    fomeProgress.value = fome;

    let vidaMaxima = true;
    let morte = false;

    if (vida != 100) { vidaMaxima = false };
    if (vida <= 0) { morte = true };

    if (nivel === 100) {
      numeroNivel.textContent = parseInt(numeroNivel.textContent) + 1;
      nivel = 0;
    }
  };

  let botaoHabilitado = true;

  function habilitaBotao() {
    let botaoHabilitado = true;
    passearButton.disabled = false;
  };

  function eventoAleatorio() {
    const numeroAleatorio = Math.random();

    const chanceDoenca = 0.1; // 10%
    const chanceRecompensa = 0.2; // 20%

    min = 0.5;
    max = 10.1;
    const valorRecompensa = (min, max) => {
      return Math.random() * (max - min) + min;
    };
    

    switch (true) {
      case numeroAleatorio < chanceDoenca:
          return("Contraiu uma doença");
          break;
      case numeroAleatorio < chanceDoenca + chanceRecompensa:
          return(`Enquanto passeava, encontrou R$ ${valorRecompensa}`),
          atualizarSaldo(valorRecompensa);
          break;
      default:
          return("Nenhum evento");
          break;
  };
  };

  let saldo = parseFloat(valorDinheiro.textContent);

  function atualizarSaldo(valor) {
    saldo = parseFloat(saldo) + valor;

    valorDinheiro.textContent = `R$ ${saldo.toFixed(2)}`
    updateUI()
  }; //Bug

  setInterval(() => {
    energia -= 5;
    felicidade -= 5;
    fome += 5;

    if (fome === 100 || fome >= 100) {
      felicidade -= 30;
      energia -= 10;
      vida -= 10;
    };

    if (energia === 0 || energia <= 0) vida -= 5;

    updateUI();
  }, 60000);

  alimentarButton.addEventListener('click', () => {
    if (listaOpcoes.style.display === "none" || listaOpcoes.style.display === "") {
      listaOpcoes.style.display = "block";
    } else { listaOpcoes.style.display = "none"; };
  });

  bifeButton.addEventListener('click', () => {
    if (fome > 0) {
      vida += 15;
      fome -= 20;
      nivel += 2;
    } else { console.log('Cheio demais...') };

    updateUI();
  });

  bolachaButton.addEventListener('click', () => {
    if (fome > 0) {
      vida += 5;
      fome -= 10;
      nivel += 1;
    } else { console.log('Cheio demais...') };
    updateUI();
  });

  dormirButton.addEventListener('click', () => {
    if (energia < 90) {
      energia += 30;
      fome += 5;
      nivel += 2;
    } else { console.log('Sem sono...') };

    atualizarSaldo(4.10); //teste
    updateUI();
  });

  brincarButton.addEventListener('click', () => {
    if (fome < 90 && energia >= 10) {
      energia -= 10;
      felicidade += 10;
      fome += 10;
      nivel += 3;
    } else if (fome >= 90) {
      console.log('Muita fome...');
    } else if (energia < 10) {
      console.log('Sem energia...');
    }

    updateUI();
  });



  passearButton.addEventListener('click', () => {
    if (botaoHabilitado === true) {
      felicidade += 50;
      fome += 20;
      nivel += 20;
      energia -= 20;

      passearButton.disabled = true;
      botaoHabilitado = false;

      setTimeout(() => {
        habilitaBotao();
      }, 120); //
    } else if (energia < 20) { console.log('Sem energia...') }

    const resultadoEvento = eventoAleatorio();
    console.log(resultadoEvento);

    updateUI();
  });

  updateUI();
});