document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

  
  const button = document.getElementById('toggle-button');
  button.addEventListener('click', function(e) {
    // console.log('button was clicked');
    const editForm = document.getElementById('edit-form');
    editForm.style.display="block"
  
  });

}, false);
