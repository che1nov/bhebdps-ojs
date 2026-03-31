const rotators = Array.from(document.querySelectorAll('.rotator'));

const getCaseSpeed = (rotatorCase) => Number(rotatorCase.dataset.speed) || 1000;

const applyCaseColor = (rotatorCase) => {
  rotatorCase.style.color = rotatorCase.dataset.color || '';
};

const startRotator = (rotator) => {
  const cases = Array.from(rotator.querySelectorAll('.rotator__case'));

  if (cases.length === 0) {
    return;
  }

  let activeIndex = cases.findIndex((rotatorCase) => rotatorCase.classList.contains('rotator__case_active'));

  if (activeIndex === -1) {
    activeIndex = 0;
    cases[0].classList.add('rotator__case_active');
  }

  applyCaseColor(cases[activeIndex]);

  const rotate = () => {
    cases[activeIndex].classList.remove('rotator__case_active');

    activeIndex = (activeIndex + 1) % cases.length;

    const nextCase = cases[activeIndex];
    nextCase.classList.add('rotator__case_active');
    applyCaseColor(nextCase);

    setTimeout(rotate, getCaseSpeed(nextCase));
  };

  setTimeout(rotate, getCaseSpeed(cases[activeIndex]));
};

rotators.forEach((rotator) => {
  startRotator(rotator);
});
