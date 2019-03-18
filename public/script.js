window.addEventListener('DOMContentLoaded', function() {
  document.onsubmit = function(event) {
    event.preventDefault();

    const form = event.target;
    if (!form.file.value) return;

    //  /my/path/file.ext -> /file.ext
    const fileUrl = '/' + form.file.value.replace(/.*[\\\/]/, '');

    const xhr = new XMLHttpRequest();

    xhr.onload = function() {
      console.log(`${xhr.status}: ${xhr.responseText}`);
      alert(`${xhr.status}: ${xhr.responseText}`);
    };
    console.log(event.target.id);
    switch(event.target.id) {
    case 'POST':
      xhr.open('POST', fileUrl);
      xhr.send(form.file.files[0]);
      break;

    case 'DELETE':
      xhr.open('DELETE', fileUrl);
      xhr.send();
      break;

    case 'GET':
      xhr.open('GET', fileUrl);
      xhr.send();
      break;
    }

  };
});
