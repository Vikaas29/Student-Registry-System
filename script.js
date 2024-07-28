// to load the saved data on every page reload
window.addEventListener("load", () => {
  const tablebody = document.querySelector("#tableBody");
  tablebody.innerHTML = localStorage.getItem("table");

  const deleteHolder=document.getElementsByClassName("delete");
  
  // this loop is used to reassign event listener to the delete and
  // reset icons after they are fetched from the memory
  // without this the retrieved data looses its event listening property
  for(let item of deleteHolder)
  {
    item.addEventListener("click",deleteFunction);
  }

  const resetHolder=document.getElementsByClassName("reset");
  for(let item of resetHolder)
    {
      item.addEventListener("click",resetFunction);
    }
});


// fucnction for working of the toggle button to hide and unhide the student log
function toggle() {
  const check = document.querySelector("#toggle").checked;

  if (check == false) {
    document.querySelector("#section2").style.opacity = "1";
    document.querySelector("#sectionNav").style.opacity = "1";
  } else {
    document.querySelector("#section2").style.opacity = "0";
    document.querySelector("#sectionNav").style.opacity = "0";
  }
}


//function to toggle background display
function toggleBackground() {
  const check = document.querySelector("#toggleBack").checked;

  if (check == true) {
    document.querySelector("body").style.backgroundImage="url() ";
  } else {
    document.querySelector("body").style.backgroundImage="url(gif.gif) ";
}
}
// function to check, filter and remove any character other than alphabets enters in the name field
function check() {
  const name = /[^a-z, ]/gi;
  const input = document.querySelector("#name");
  input.value = input.value.replace(name, "");
}

// event listener for the register button
document.querySelector("#submit").addEventListener("click", Add);

// function to add all fields including the reset and delete button
function Add() {
  const name = document.querySelector("#name");
  const id = document.querySelector("#id");
  const email = document.querySelector("#mail");
  const contact = document.querySelector("#contact");

  // to check if any of the fields are empty
  if (
    name.value == "" ||
    id.value == "" ||
    email.value == "" ||
    contact.value == ""
  ) {
  } else {
    const newName = document.createElement("td");
    const newId = document.createElement("td");
    const newEmail = document.createElement("td");
    const newContact = document.createElement("td");

    newName.innerHTML = name.value;
    newId.innerHTML = id.value;
    newEmail.innerHTML = email.value;
    newContact.innerHTML = contact.value;

    const parent = document.querySelector("#tableBody");
    const row = document.createElement("tr");

    const action = document.createElement("td");
    const reset = document.createElement("div");
    reset.classList.add("reset");
    reset.addEventListener("click", resetFunction);
    const del = document.createElement("div");
    const del1 = document.createElement("div");
    del1.classList.add("del1");

    const del2 = document.createElement("div");
    del2.classList.add("del2");

    del.appendChild(del1);
    del.appendChild(del2);
    del.classList.add("delete");
    del.addEventListener("click", deleteFunction);

    // appending all fields to the row
    row.appendChild(newName);
    row.appendChild(newId);
    row.appendChild(newEmail);
    row.appendChild(newContact);
    row.appendChild(action);
    action.classList.add("action");
    action.appendChild(reset);
    action.appendChild(del);

    // appending row to the table body
    parent.appendChild(row);
    const tablebody = document.querySelector("#tableBody");
    const holder = tablebody.innerHTML;
    localStorage.setItem("table", holder);

    // reseting the input fields
    name.value = "";
    id.value = "";
    email.value = "";
    contact.value = "";
  }
}

// funtion to perform remove field action
function deleteFunction(e) {
  const item = e.target;
  const parent = item.parentElement;
  const parent2 = parent.parentElement;
  const parent3 = parent2.parentElement;

  // this specific if else is written because the event is getting triggered
  // sometimes from the outer divs but sometimes from inner child divs used to style the icon
  // so this if else is used to check which element is triggering the event
  if (item.className == "delete") {
    parent2.remove();
  } else {
    parent3.remove();
  }
  const tablebody = document.querySelector("#tableBody");
  const holder = tablebody.innerHTML;
  localStorage.setItem("table", holder);
}

// function to perform reset action
function resetFunction(e) {
  const name = document.querySelector("#name");
  const id = document.querySelector("#id");
  const email = document.querySelector("#mail");
  const contact = document.querySelector("#contact");

  const item = e.target;
  const parent = item.parentElement;
  const parent2 = parent.parentElement;

  const holderArray = parent2.querySelectorAll("td");

  name.value = holderArray[0].innerHTML;
  id.value = holderArray[1].innerHTML;
  email.value = holderArray[2].innerHTML;
  contact.value = holderArray[3].innerHTML;

  parent2.remove();
  const tablebody = document.querySelector("#tableBody");
  const holder = tablebody.innerHTML;
  localStorage.setItem("table", holder);
}
