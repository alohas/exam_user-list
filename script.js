const dbLink = "https://rpsexam-61a3.restdb.io/rest/registeredusers";
const key = "5ddfb3cc4658275ac9dc201e";
let tabledata = [];

var table = new Tabulator("#user-list", {
  cellEdited: function(cell) {
    console.log(cell);
    put(cell._cell.row.data, cell._cell.row.data._id);
  },
  dataEdited: function(data) {},
  layout: "fitColumns",
  columns: [
    //Define Table Columns
    {
      title: "Username",
      field: "username",
      validator: ["unique", "required"],
      editor: "input"
      //width: 150
    },
    {
      title: "Password",
      field: "password",
      validator: "required",
      editor: "input",
      align: "left"
    },
    {
      title: "Email",
      field: "email",
      validator: ["unique", "required", "regex:\\.com$", "string"],
      editor: "input",
      editorParams: {
        elementAttributes: {
          maxlength: "10"
        }
      }
    },
    {
      title: "Coins",
      field: "coins",
      validator: ["required", "integer"],
      editor: "number",
      editorParams: {
        verticalNavigation: "editor",
        min: 0,
        max: 100000000000000000,
        step: 100
      }
    },
    {
      title: "Streak",
      field: "streak",
      validator: "integer",
      editor: "number",
      editorParams: {
        verticalNavigation: "editor",
        min: 0,
        max: 100,
        step: 1
      }
    },
    {
      title: "Country",
      field: "country",
      editor: "input"
    },
    {
      title: "Suspended",
      field: "suspended",
      formatter: "tickCross",
      sorter: "boolean",
      editor: true,
      formatterParams: {
        allowEmpty: true,
        allowTruthy: true,
        tickElement: "<i class='fa fa-check'></i>",
        crossElement: "<i class='fa fa-times'></i>"
      }
    }
  ]
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
    .then(data => {
      display(data);
      console.log(data);
    });
}

function display(users) {
  users.forEach(user => {
    //console.log(user);
    tabledata.push(user);
  });
  //console.log(tabledata);
  table.setData(tabledata);
}

function put(data, id) {
  console.log(data);

  const json = JSON.stringify(data);
  console.log(json);
  fetch(`${dbLink}/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": key,
      "cache-control": "no-cache"
    },
    body: json
  })
    .then(d => d.json())
    .then(t => console.log(t));
}

window.addEventListener("DOMContentLoaded", event => {
  get();
});
