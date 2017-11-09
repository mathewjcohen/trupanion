(function(){
  let animalType = "dog";
  let breedDefault = '<option selected hidden disabled value="0">Breed</option>';
  let dogBreeds = fetch('https://dog.ceo/api/breeds/list')
  .then(response => {
    return response.json();
  }).then(data =>{
    dogBreeds = data.message.map(breed => `<option value="${breed}">${breed}</option>`).join('');
    setBreedList(animalType);
  });
  
  // manual/short cat list due to API being borked
  let catBreeds = ["abyssinian", "american curl", "american shorthair", "applehead siamese"]
    .map(breed => `<option value="${breed}">${breed}</option>`).join('');
  
  let dogRadio = document.getElementById('dogSelect');
  let catRadio = document.getElementById('catSelect');
  
  let breedList = document.querySelector('select[id="petBreed"]');
  
  dogRadio.addEventListener('click', () => {
    animalType = dogRadio.value;
    setBreedList(animalType);
  });
  catRadio.addEventListener('click', () => {
    animalType = catRadio.value;
    setBreedList(animalType);
  });
  
  function validate(){
    let validatePetname = document.getElementById('petName');
    let validatePetage = document.getElementById('petAge');
    let validateZip = document.getElementById('zip');
    let validateEmail = document.getElementById('email');

    let zipregex = new RegExp("^\\d{5}(-\\d{4})?$");
    let emailregex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  
    // this valdation contains simple browser alerts for demo purposes only
  
    if(validatePetname.value.length === 0){
      alert("Pet name is required.");
      return false;  
    }
    if(validatePetage.value < 2){
      if(validatePetage.value < 1){
        alert("Please select your pet's age.");
        return false;  
      }else{
        alert("Sorry, but we do not enroll pets that young.");
        return false;
      }
    }
    if(!validateZip.value.match(zipregex)){
      alert("5 digit zip code required");
      return false;  
    }
    if(!validateEmail.value.match(emailregex)){
      alert("A valid email address is required.");
      return false;  
    }
    return true;
  }
  
  function showSuccess(){
    let formWrap = document.getElementById('form_wrap');
    formWrap.innerHTML = `
      <h2>Thank you for submitting</h2>
      <a href='/'><h4>Enroll another pet?</h4></a>
    `;
  }
  
  function setBreedList(type){
    if(type === 'dog'){
      breedList.innerHTML = breedDefault + dogBreeds;
    }else{
      breedList.innerHTML = breedDefault + catBreeds;
    }
  }

  setBreedList(animalType);
  
  let button = document.querySelector('button');
  button.addEventListener('click', () => {
    let valid = validate();
    if(valid){
      showSuccess();
      console.log("Form is \"submitted\"");
    }  
  });


})();