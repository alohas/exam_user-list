const dbLink = "https://rpsexam-61a3.restdb.io/rest/registeredusers";
const key = "5ddfb3cc4658275ac9dc201e";

window.addEventListener("DOMContentLoaded", event => {
  get();
});

function get() {
  fetch(dbLink, {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(data => display(data));
}

function display(users) {
  users.forEach(user => {
    //console.log(user);
    let clone = document.querySelector(".listing").content.cloneNode(true);
    clone.querySelector(".username").textContent = user.username;
    clone.querySelector(".password").textContent = user.password;
    clone.querySelector(".email").textContent = user.email;
    document.querySelector(".user-list").appendChild(clone);
  });
}
