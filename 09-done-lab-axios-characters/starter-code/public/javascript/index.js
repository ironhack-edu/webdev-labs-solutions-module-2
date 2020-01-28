window.onload = function(){

  function buildCharacterBox(character){
    let newDiv = document.createElement('div');
    let nameDiv = document.createElement('p');
    let idDiv = document.createElement('p');
    let occupationDiv = document.createElement('p');
    let weaponDiv = document.createElement('p');

    newDiv.classList.add('character-info');

    nameDiv.append(`Name: ${character.name}`);
    idDiv.append(`ID: ${character.id}`);
    occupationDiv.append(`Occupation: ${character.occupation}`);
    weaponDiv.append(`Weapon: ${character.weapon}`);

    newDiv.append(nameDiv);
    newDiv.append(idDiv);
    newDiv.append(occupationDiv);
    newDiv.append(weaponDiv);

    document.querySelector('.characters-container').append(newDiv);
  }

  function fetchAllCharacters(){
    axios
      .get('https://ih-crud-api.herokuapp.com/characters')
      .then(thingWeGetBackFromApi => {
        console.log("What is this: ", thingWeGetBackFromApi);

        let arrayOfCharacters = thingWeGetBackFromApi.data;
        document.querySelector('.characters-container').innerHTML = "";

        arrayOfCharacters.forEach(eachCharacter => {
          console.log(eachCharacter); 
          buildCharacterBox(eachCharacter);
        });
      })
      .catch(err => console.log(err));
  }


  document.getElementById('fetch-all').onclick = function(){
    fetchAllCharacters();
  };
  

  document.getElementById('fetch-one').onclick = function(e){

    let theID = document.querySelector('.operation input').value;

    axios
      .get(`https://ih-crud-api.herokuapp.com/characters/${theID}`)
      .then(result => {
        let theCharacter = result.data;
        if(!theCharacter.name){
          e.currentTarget.style.backgroundColor = 'red';
        }
        // use this version to handle getting a blank object
        document.querySelector('.characters-container').innerHTML = "";
        document.getElementById('fetch-one').style.backgroundColor = 'green';
        buildCharacterBox(theCharacter);
      })
      .catch( err => {
        // use this version to handle error
        document.getElementById('fetch-one').style.backgroundColor = 'red';
        console.log(err);
      });
  };
  


  document.getElementById('delete-one').onclick = function(){

    let theID = document.querySelector('.operation.delete input').value;

    axios
      .delete(`https://ih-crud-api.herokuapp.com/characters/${theID}`)
      .then(()=> fetchAllCharacters())
      .catch(err => console.log(err));
  };
  
  document.getElementById('edit-character-form').onsubmit = function(e){
    e.preventDefault();

    let id = document.querySelector('#edit-character-form input[name="chr-id"]').value;
    let occupation = document.querySelector('#edit-character-form input[name="occupation"]').value;
    let name = document.querySelector('#edit-character-form input[name="name"]').value;
    let weapon = document.querySelector('#edit-character-form input[name="weapon"]').value;

    axios
      .put(`https://ih-crud-api.herokuapp.com/characters/${id}`, {
        name: name,
        occupation: occupation,
        weapon: weapon
      })
    .then(() => {
          
      document.querySelector('.characters-container').innerHTML = "";
      
      axios
        .get('https://ih-crud-api.herokuapp.com/characters/'+id)
        .then(response => {
          let char = response.data;

          buildCharacterBox(char);

          document.querySelector('#edit-character-form input[name="chr-id"]').value="";
          document.querySelector('#edit-character-form input[name="occupation"]').value="";
          document.querySelector('#edit-character-form input[name="name"]').value="";
          document.querySelector('#edit-character-form input[name="weapon"]').value="";
        });
    })
    .catch(err => console.log(err));              
  };


  
  document.getElementById('new-character-form').onsubmit = function(e){
    e.preventDefault();
    
    let occupation = document.querySelector('#new-character-form input[name="occupation"]').value;
    let name = document.querySelector('#new-character-form input[name="name"]').value;
    let weapon = document.querySelector('#new-character-form input[name="weapon"]').value;

    axios 
      .post('https://ih-crud-api.herokuapp.com/characters', {
        name: name,
        occupation: occupation,
        weapon: weapon
      })
      .then((result)=>{
        fetchAllCharacters();
        document.querySelector('#new-character-form input[name="occupation"]').value="";
        document.querySelector('#new-character-form input[name="name"]').value="";
        document.querySelector('#new-character-form input[name="weapon"]').value="";
      })
      .catch(err => console.log(err));              
  };
};









   
