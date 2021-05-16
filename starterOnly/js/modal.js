/**
 * FONCTION QUI MODIFIE LA NAV POUR LE FORMAT MOBILE / TABLETTE
 */
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

/**
 * ELEMENTS DU DOM
 */
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const blockForm = document.getElementsByTagName("form")[0];
const formData = document.querySelectorAll(".formData");
const inputFormData = document.querySelectorAll(".text-control");
const checkboxFormData = document.querySelectorAll(".checkbox-input");
const spanClose = document.querySelector(".close");
const blockValidator = document.querySelector(".result");
const fa = document.querySelector(".fa");

/**
 * LANCE LA FONCTION D'OUVERTURE DE LA MODAL AU DECLENCHEMENT DE L'EVENT
 */
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

/**
 * OUVRE LA MODAL FORMULAIRE
 */
function launchModal() {
  blockForm.style.display ="block";
  blockValidator.style.display ="none";
  modalbg.style.display = "block";
}

/**
 * LANCE LA FONCTION DE FERMETURE DE MODAL AU DECLENCHEMENT DE L'EVENT 
 */
spanClose.addEventListener("click",closeModal);

/**
 * FERME LA MODAL FORMULAIRE
 */
function closeModal() {
  modalbg.style.display = "none";
}


/**
 * APPEL LA FONCTION DE VERIFICATION APRES CHANGEMENT SUR LE INPUT
 * */
inputFormData.forEach((input) => input.addEventListener("change", check_saisie));

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

      //AFFICHAGE DU MESSAGE D'ERREUR SI AUCUNE VILLE CHOISIE
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
          
          case "email":
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(valueInput))
            {
              formData[i].setAttribute("data-error-visible","false");
              statutSaisie = true;
            }else{
              formData[i].setAttribute("data-error-visible","true");
              statutSaisie = false;
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

/**
 * Suprime les espaces
 * objet en entre
 * return une chaine nettoyée
 */
function clearString(ao){
  value = ao.value;
  idInput = ao.id;
  document.getElementById(idInput).value =  value.split(" ").join(""); 
}

/**
 * VALIDATION DU FORMULAIRE
 * @returns 
 */
function validate(){
  
  /* Controle du choix des villes */
  statutResultForm = check_saisie("checkbox");
  if(!statutResultForm){return false;}

  //RESET DU FORMULAIRE SI VALIDATION OK
  blockForm.reset();
  blockForm.style.display ="none";
  blockValidator.style.display ="block";

  return true;
}


