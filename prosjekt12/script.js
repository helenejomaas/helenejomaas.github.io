// Definerer variabler:

let openModalButton = document.querySelector("#startQuiz") //knappen for å åpne modalen
let closeModalButton = document.querySelector(".closeButton") //knappen for å lukke modalen
let overlay = document.querySelector("#overlay") //diven med id overlay som gir svart bakgrunn når modalen er åpen. 
let modal = document.querySelector(".modal") // selve modalen.
let quizDiv = document.querySelector("#quizDiv") // quizen

// Legger til lyttere:
openModalButton.addEventListener("click", openModal) 
closeModalButton.addEventListener("click", closeModal)

// Funskjon som viser modalen 
function openModal(){
  overlay.classList.add("active");
  modal.classList.add("active");
}

// Funskjon som lukker modalen
function closeModal(){
  overlay.classList.remove("active");
  modal.classList.remove("active");
  quizDiv.classList.add("active");
  openModalButton.classList.add("active");
}




//QUIZ

const firebaseConfig = {
  apiKey: "AIzaSyBMYFgkGFzehUYcZBhoZIHvanY39CDT22s",
  authDomain: "databaseprosjekt-d8890.firebaseapp.com",
  projectId: "databaseprosjekt-d8890",
  storageBucket: "databaseprosjekt-d8890.appspot.com",
  messagingSenderId: "182447013531",
  appId: "1:182447013531:web:dafb874e0725b5180bd03e"
};

// Installerer Firebase
firebase.initializeApp(firebaseConfig);

// Lager en referanse til databasen
let db = firebase.firestore();

// Lagrer navnet på kolleksjonen (lettere å endre kode i etterkant)
let collectionName = "tallsystemer"

// Henter elementer fra DOM
let fornavnEl = document.querySelector("#fornavn")
let etternavnEl = document.querySelector("#etternavn")
let loggInnBtn = document.querySelector("#loggInnBtn")

// Legger til en lytter til logg inn knappen
loggInnBtn.addEventListener('click', addUser)

//Oppretter en variabel for dokumentets id (settes senere til brukerens navn) --> gjør at vi senere kan bruke denne til å endre på dataene i dokumentet
let dokumentID;

//Funskjonen som legger bruker til i databasen
function addUser() {

  dokumentID = fornavnEl.value

  db.collection(collectionName).doc(dokumentID).set({
    fornavn: fornavnEl.value,
    etternavn: etternavnEl.value,
    highscore: 0,
  })

  //Tømmer input feltene
  fornavnEl.value = ""
  etternavnEl.value = ""

  //Lukker modalen 
  closeModal()
}

// Dersom highscore ikke er lagret i localStorage; setter highscore til 0 
if(!localStorage.highScore){
    localStorage.highScore = 0;
} 


//Lager objekter med spørsmål 
let question1 = {
    sporsmaal: "Hvilken verdi i titallsystemet tilsvarer tallet 1111 i totallsystemet?",
    alternativer: ["15", "4", "30"],
    fasit: "15"
}

let question2 = {
    sporsmaal: "Gjør om tallet 3F0B fra sekstentallsystemet til titallsystemet",
    alternativer: ["16339", "16139", "16913"],
    fasit: "16139"
}

let question3 = {
    sporsmaal: "Gjør om tallet 255 fra titallsystemet til totallssystemet.",
    alternativer: ["111111", "01010101", "11111111"],
    fasit: "11111111"
}

let question4 = {
    sporsmaal: "Gjør om tallet 23087 fra titallssystemet til sekstentallssystemet.",
    alternativer: ["7B2F", "6A2F", "5A2F"],
    fasit: "5A2F"
}

let question5 = {
    sporsmaal: "Hvordan skriver man en million med sekstentallssystemet?",
    alternativer: ["F4240", "B4240", "B4402"],
    fasit: "F4240"
}

let question6 = {
    sporsmaal: "Gjør om tallet 10101010 fra totallssystemet til titallssystemet og sekstentallssystemet.",
    alternativer: ["180 og BB", "170 og AA", "180 og AA"],
    fasit: "170 og AA"
}

// Lager en array med spørsmålene
let quiz = [question1, question2, question3, question4, question5, question6]

let quizEl = document.querySelector('#quiz')


// Skriver spørsmålene til nettsiden 
for(let i=0; i < quiz.length; i++){
    let sporsmaalEl = document.createElement("div")
    sporsmaalEl.className = "question"

    let h3El = document.createElement("h3")
    h3El.innerHTML = quiz[i].sporsmaal

    sporsmaalEl.appendChild(h3El)

    // Lager alle svaralternativene til hvert spørsmål som input-elementer (av typen radioknapp, som vil si at kun et           alternativ kan velges for hvert spørsmål)
    for(let j=0; j < quiz[i].alternativer.length; j++){
        let labelEl = document.createElement("label");
        let radioEl = document.createElement("input")
        radioEl.type = "radio"
    
        radioEl.name = `q${i+1}`

        //Gir svaralternativene en verdi som enten "rett" eller "galt", slik at dette kan brukes senere til å telle poeng
        if(quiz[i].fasit === quiz[i].alternativer[j]){
        radioEl.value = "riktig"
        } else{
            radioEl.value = "galt"
        }

        labelEl.appendChild(radioEl)

        labelEl.innerHTML += quiz[i].alternativer[j]

        sporsmaalEl.appendChild(labelEl)
    }

    quizEl.appendChild(sporsmaalEl)
}

// Henter elementer fra DOM
let containerEl = document.querySelector(".container")
let sjekkSvarBtn = document.querySelector('#sjekkSvarBtn');
let resultatEl = document.querySelector('#resultat');
let highScoreEl = document.querySelector('#highscore');

// Gir "sjekk svar"-knappen en lytter
sjekkSvarBtn.addEventListener('click', finnPoeng);

// Deklarerer "antallPoeng" som en universell variabel i koden
let antallPoeng = 0;

//Definerer funskjonen "finnPoeng" som fyres av når du trykker på "sjekk svar"-knappen
//Funskjonen teller opp antall poeng du har fått ut ifra hvilke svaralternativer du har valgt
function finnPoeng(){
    let alleRadioEl = document.querySelectorAll("input[type='radio']")

    //Sjekker value (som vi satte når vi skrev spørsmålene til nettsiden) til svaralternativene bruker har valgt
    for(let i=0; i<alleRadioEl.length; i++){
        if(alleRadioEl[i].checked){
            if(alleRadioEl[i].value == "riktig"){ //Dersom svaralternativet bruker har valgt har value "riktig", skal antallPoeng øke med 1
                antallPoeng += 1;
            }
        } 

      sjekkSvarBtn.remove() //Fjerner "sjekk svar"-knappen når bruker har gjennomført quizen
    }

  // Skriver antallPoeng til nettsiden
  resultatEl.innerHTML = `<p id=antallPoeng>Du fikk ${antallPoeng}/${quiz.length} poeng!</p>`

    //Lagrer antall poeng som highscore i localStorage (dersom den er høyere en daværende highscore) 
   if(antallPoeng > localStorage.highScore){
    localStorage.highScore = antallPoeng;
  }

  //Skriver highscore til nettsiden 
  highScoreEl.innerText = `Highscore: ${localStorage.highScore}`;

  //Dersom bruker har "logget inn", og blitt en bruker i datatbasen, skal highscore-dataen til bruker oppdateres til antall poeng brukeren fikk
  db.collection(collectionName).doc(dokumentID).update({
      highscore: antallPoeng
    });
  
}


// Knapp som viser resultat-tabell 
let visTabellBtn = document.querySelector('#visTabellBtn');
visTabellBtn.addEventListener('click', visTabell)

//Oppretter en teller som brukes i funksjonen "visTabell" for å kun gjøre det mulig å få frem tabellen én gang
let counter = 0; 

// FUnskjonen som lager en resultat-tabell, og skriver den til nettsiden
function visTabell(){
  if (counter == 0 ) {  //Bruker vil bare kunne få frem tabellen én gang (kun når teller er 0)
  counter += 1;
  
  let table = document.createElement('table')
  let thead = document.createElement('thead')
  let tbody = document.createElement('tbody')

  table.appendChild(thead)
  table.appendChild(tbody)

  containerEl.appendChild(table)

  let overskriftsRad = document.createElement('tr')
  let overskrift_1 = document.createElement('th')
  overskrift_1.innerHTML = `Fornavn`
  let overskrift_2 = document.createElement('th')
  overskrift_2.innerHTML = `Etternavn`
  let overskrift_3 = document.createElement('th')
  overskrift_3.innerHTML = `Highscore`

  overskriftsRad.appendChild(overskrift_1)
  overskriftsRad.appendChild(overskrift_2)
  overskriftsRad.appendChild(overskrift_3)
  thead.appendChild(overskriftsRad)

  db.collection(collectionName).orderBy("highscore", "desc").get().then((snapshot) => { 
    let dokumenter = snapshot.docs

    for (let i = 0; i < dokumenter.length; i++) {
      visBrukereTabell(dokumenter[i])
    }
  })


    // Funskjon som legger brukerene (dokumentene) fra databasen inn i tabellen 
  function visBrukereTabell(dokument) {
          let radForBruker = document.createElement('tr')
          
          let navnBruker = document.createElement ("td")
          navnBruker.innerHTML = `${dokument.data().fornavn}`
        
          let etternavnBruker = document.createElement ("td")
          etternavnBruker.innerHTML = `${dokument.data().etternavn}`
        
          let highscoreBruker = document.createElement ("td")
          highscoreBruker.innerHTML = `${dokument.data().highscore}`

          radForBruker.appendChild(navnBruker)
          radForBruker.appendChild(etternavnBruker)
          radForBruker.appendChild(highscoreBruker)
          tbody.appendChild(radForBruker)
  }

}
}
