window.addEventListener('DOMContentLoaded', function() {

  POST.onsubmit = async function(event) {
    event.preventDefault();

    const files = event.target.children[0].files;
    console.log(files);
    const fileToUpload = files[0];

    let data = new FormData();
    data.append("file", fileToUpload);

    const response = fetch("/upload", {
          method: "POST",
          body: data,
        })
        .then(response => response.text())
        .catch(function(err) {
          alert("Error: " + err.message);
        });
    const result = await response;
    alert(result);
  };

  GET.onsubmit = async function(event) {
    event.preventDefault();

    const value = event.target.children[0].value.replace(/.*[\\\/]/, '');;
    const fileUrl = '/' + value;
    console.log(fileUrl);

    const response = fetch(`${fileUrl}`, {
          method: "GET",
        })
        .then(response => response.text())
        .catch(function(err) {
          alert("Error: " + err.message);
        });
    const result = await response;
    alert(result);
  };


});
