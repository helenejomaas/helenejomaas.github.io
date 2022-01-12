// selectorer
const hlinput = document.querySelector(".hjelpeliste_input");
const hlbutton = document.querySelector(".hjelpeliste_button");
const hllist = document.querySelector(".hjelpeliste");

//event listeners
hllist.addEventListener("click", deleteCheck);


//functions

function addhl() {
    console.log("Klikk")
  
    //lage en liste-div:
  const hldiv = document.createElement("div"); 
  hldiv.classList.add("hl");

  //lage liste:
  const newhl = document.createElement("li");
  newhl.innerText = hlinput.value;
  newhl.classList.add("hl_item");
  hldiv.appendChild(newhl);
  
  //lage gjort-knapp:
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete_btn");
  hldiv.appendChild(completedButton);
  
  //lage søppel-knapp:
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash_btn");
  hldiv.appendChild(trashButton);
  
  // vi har nå laget en stor div (hldiv) med listepunkt og to knapper
  //feste div til listen:
  hllist.appendChild(hldiv);

  //fjerne det som står i input etter man har lagt det til listen
  hlinput.value = "";
}

function deleteCheck(e){
  const item = e.target;
  //slette listepunkt
  if(item.classList[0] === "trash_btn") {
    const hl = item.parentElement;
    hl.remove();
  }
  //fullført knapp
  if(item.classList[0] === "complete_btn") {
    const hl = item.parentElement;
    hl.classList.toggle("completed");
  }
}