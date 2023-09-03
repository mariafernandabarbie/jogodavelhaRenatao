window.onload = () => {
    "use strict";
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js");
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const jogo = document.getElementById('jogo');
    const linhas = document.querySelectorAll('[data-linha]');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('resetButton');
    let jogador = 'X';
    let contar = ['', '', '', '', '', '', '', '', ''];
    let ganhar = false;
  
    function pontuacao() {
      const ponto = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  
        [0, 4, 8], [2, 4, 6]             
      ];
  
      for (const pattern of ponto) {
        const [a, b, c] = pattern;
        if (contar[a] && contar[a] === contar[b] && contar[a] === contar[c]) {
          ganhar = true;
          return contar[a];
        }
      }
  
      if (contar.every(linha => linha !== '')) {
        ganhar = true;
        return 'Empate';
      }
  
      return null;
    }
  
    function handleClick(index) {
      if (ganhar || contar[index] !== '') return;
  
      contar[index] = jogador;
      linhas[index].textContent = jogador;
  
      const winner = pontuacao();
      if (winner) {
        if (winner === 'Empate') {
          message.textContent = 'Empate! O jogo acabou.';
        } else {
          message.textContent = `Jogador ${winner} ganhou!`;
        }
        ganhar = true;
      } else {
        jogador = jogador === 'X' ? 'O' : 'X';
        message.textContent = `É a vez do jogador ${jogador}`;
      }
    }
  
    function resetGame() {
      contar = ['', '', '', '', '', '', '', '', ''];
      ganhar = false;
      jogador = 'X';
      message.textContent = `É a vez do jogador ${jogador}`;
      linhas.forEach(linha => linha.textContent = '');
    }
  
    linhas.forEach((linha, index) => {
      linha.addEventListener('click', () => {
        if (!ganhar) {
          handleClick(index);
        }
      });
    });
  
    resetButton.addEventListener('click', resetGame);
  
    resetGame();
  });
  

