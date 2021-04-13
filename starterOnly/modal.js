function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const inputFormData = document.querySelectorAll(".text-control");
const checkboxFormData = document.querySelectorAll(".checkbox-input");
const spanClose = document.querySelector(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// launch close modal event
spanClose.addEventListener("click",closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

/**
 * Cette fonction controle les champs de saisie
 * @returns true
 */
function check_saisie(type = 'input'){
  statutSaisie = false;
  switch (type) {
    case 'checkbox':
      let cityIsChecked = false;
      let conditionUtilisationIsChecked = false;
      for (i = 0; i < checkboxFormData.length; i++) {
        let idCheckbox = checkboxFormData[i].id;
        let checkboxChecked = checkboxFormData[i].checked;
        console.log(idCheckbox,checkboxChecked)
        if(idCheckbox.indexOf('location') !==-1 ){
          if(checkboxChecked){
            cityIsChecked = true;
          }
        }else if(idCheckbox == "checkbox1" && checkboxChecked){
          conditionUtilisationIsChecked = true;
        }
      }

      //AFFICHAGE DU MESSAGE D'ERREUR SI AUCUN VILLE CHOISIE
      if(!cityIsChecked){
        formData[5].setAttribute("data-error-visible","true");
      }else{
        formData[5].setAttribute("data-error-visible","false");
      }

      //AFFICHAGE DU MESSAGE D'ERREUR SI CONDITION UTILISATION PAS CHOISIE
      if(!conditionUtilisationIsChecked){
        formData[6].setAttribute("data-error-visible","true");
      }else{
        formData[6].setAttribute("data-error-visible","false");
      }

      
      if(cityIsChecked && conditionUtilisationIsChecked){
        statutSaisie = true;
      }else{
        statutSaisie = false;
      }

      break;
    default:
      for (i = 0; i < inputFormData.length; i++) {
        let idInput = inputFormData[i].id;
        let valueInput = inputFormData[i].value.trim();
        if((valueInput == '')){
          formData[i].setAttribute("data-error-visible","true");
          statutSaisie = false;
        }else{
          formData[i].setAttribute("data-error-visible","false");
          statutSaisie = true;
        }
      }
      break;
  }

  return statutSaisie;
}

function validate(){
  console.log(checkboxFormData)
  
  /* Controle du choix des villes */
  resultForm = check_saisie("checkbox");
  if(!resultForm){return false;}

  //RESET DU FORMULAIRE SI VALIDATION OK
  document.getElementById("reserve").reset();
  console.log(resultForm)
  return false;
}


