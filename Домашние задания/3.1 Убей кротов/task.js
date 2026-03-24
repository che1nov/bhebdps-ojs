const deadCounter = document.getElementById('dead');
const lostCounter = document.getElementById('lost');

const getHole = (index) => document.getElementById(`hole${index}`);

const resetCounters = () => {
  deadCounter.textContent = 0;
  lostCounter.textContent = 0;
};

for (let i = 1; i <= 9; i += 1) {
  const hole = getHole(i);

  hole.onclick = () => {
    if (hole.classList.contains('hole_has-mole')) {
      deadCounter.textContent = Number(deadCounter.textContent) + 1;
    } else {
      lostCounter.textContent = Number(lostCounter.textContent) + 1;
    }

    if (Number(deadCounter.textContent) === 10) {
      alert('Вы победили!');
      resetCounters();
    }

    if (Number(lostCounter.textContent) === 5) {
      alert('Вы проиграли!');
      resetCounters();
    }
  };
}
