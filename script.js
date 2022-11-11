let myLists = [];
const inputBtn = document.querySelector("#input-btn");
const inputEl = document.querySelector("#input-el");
const check = document.querySelector("#check-el");
const header = document.querySelector("#header-el");
const trash = document.querySelector("#trashcan");
const header2 = document.querySelector("#header-el2");
// getting the item from localStorage and passing in the parse method to parse it back to an object or array
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLists"));

// this evaluates to a true or false situation to determine whether the code runs or not. this will make the inputs not able to vanish on refresh of the page
if (leadsFromLocalStorage) {
  myLists = leadsFromLocalStorage;
  render(myLists);
}

// to get the current date
const today = new Date().toLocaleDateString();

header.innerHTML = `To-Do Lists For Today`;
header2.innerHTML = today;

trash.addEventListener("dblclick", function () {
  let temporaryArray = [];

  for (let i = 0; i < myLists.length; i++) {
    if (!document.querySelector(`#check${i}`).checked) {
      temporaryArray.push(myLists[i]);
    }
    console.log(temporaryArray);
  }
  myLists = temporaryArray;
  //live reload function
  location.reload();
  console.log(myLists);
  localStorage.setItem("myLists", JSON.stringify(myLists));
});

function render(lists) {
  let listItems = "";

  for (let i = 0; i < lists.length; i++) {
    listItems += `<input type="checkbox" id="check${i}" name="list${i}" class="checks"/>
                       <label for="check${i}">
                            ${lists[i]}
                        </label>
                        <br>`;
  }
  check.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
  //pushing the value in the input field to the array myLists and checking to see if the input value is an empty string
  if (inputEl.value != "") {
    myLists.push(inputEl.value);
    //setting inputEl.value to an empty string clears out the input field when the content has been added to the array
    inputEl.value = "";
    // saving the myLists array to localStorage (localStorages only accepts strings as input not objects or arrays, hence the need for the JSON.stringify)
    localStorage.setItem("myLists", JSON.stringify(myLists));
    console.log(myLists);
    render(myLists);
  }
});
