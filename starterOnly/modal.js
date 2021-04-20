function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
    fa.style.color = "#ffffff";
  } else {
    x.className = "topnav";
    fa.style.color = "#fe142f";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const blockForm = document.getElementsByTagName("form")[0];
const formData = document.querySelectorAll(".formData");
const inputFormData = document.querySelectorAll(".text-control");
const checkboxFormData = document.querySelectorAll(".checkbox-input");
const spanClose = document.querySelector(".close");
const blockValidator = document.querySelector(".result");
const fa = document.querySelector(".fa");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  blockForm.style.display ="block";
  blockValidator.style.display ="none";
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
 * @returns le statut du formulaire
 */
function check_saisie(type = 'input'){

  statutSaisie = false;

  switch (type) {
    //CONTROLE DES CHECKBOX
    case 'checkbox':
      let cityIsChecked = false;
      let conditionUtilisationIsChecked = false;

      for (i = 0; i < checkboxFormData.length; i++) {
        let idCheckbox = checkboxFormData[i].id;
        let checkboxIsChecked = checkboxFormData[i].checked;
        if(idCheckbox.indexOf('location') !==-1 ){
          if(checkboxIsChecked){
            cityIsChecked = true;
          }
        }else if(idCheckbox == "checkbox1" && checkboxIsChecked){
          conditionUtilisationIsChecked = true;
        }

      }//for (i = 0; i < checkboxFormData.length; i++)

      //AFFICHAGE DU MESSAGE D'ERREUR SI AUCUN VILLE CHOISIE
      if(!cityIsChecked){
        formData[5].setAttribute("data-error-visible","true");
      }else{
        formData[5].setAttribute("data-error-visible","false");
      }

      //AFFICHAGE DU MESSAGE D'ERREUR SI CONDITION D'UTILISATION NON COCHEE
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
    //CONTROLE DES INPUTS  
    default:
      for (i = 0; i < inputFormData.length; i++) {
        let idInput = inputFormData[i].id;
        let valueInput = inputFormData[i].value.trim();

        switch (idInput) {
          case "first":
          case "last":
              if((valueInput.length < 2)){
                formData[i].setAttribute("data-error-visible","true");
                statutSaisie = false;
              }else{
                formData[i].setAttribute("data-error-visible","false");
                statutSaisie = true;
              }  
            break;
        
          default:
              if((valueInput == '')){
                formData[i].setAttribute("data-error-visible","true");
                statutSaisie = false;
              }else{
                formData[i].setAttribute("data-error-visible","false");
                statutSaisie = true;
              }
            break;
        }

      }//for (i = 0; i < inputFormData.length; i++)
      break;

  }//switch (type)

  return statutSaisie;
}

function validate(){
  console.log(checkboxFormData)
  
  /* Controle du choix des villes */
  resultForm = check_saisie("checkbox");
  if(!resultForm){return false;}

  //RESET DU FORMULAIRE SI VALIDATION OK
  blockForm.reset();
  blockForm.style.display ="none";
  blockValidator.style.display ="block";
  //FERMETURE DE LA MODAL
  //closeModal();

  //AJOUT DU MESSAGE DE VALIDATION DU FORMULAIRE
  //document.getElementById("reserve").reset();
  return false;
}


