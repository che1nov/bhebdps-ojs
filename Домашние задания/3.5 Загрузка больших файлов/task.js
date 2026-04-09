const formElement = document.getElementById('form');
const progressElement = document.getElementById('progress');

formElement.addEventListener('submit', (event) => {
  event.preventDefault();

  progressElement.value = 0;

  const request = new XMLHttpRequest();
  request.open('POST', formElement.action);

  request.upload.addEventListener('progress', (progressEvent) => {
    if (!progressEvent.lengthComputable) {
      return;
    }

    progressElement.value = progressEvent.loaded / progressEvent.total;
  });

  request.addEventListener('loadend', () => {
    progressElement.value = 1;
  });

  const formData = new FormData(formElement);
  request.send(formData);
});
