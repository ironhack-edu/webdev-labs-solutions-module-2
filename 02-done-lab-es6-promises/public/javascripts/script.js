// This will print in the wrong order
// we added it for you to test to make sure data is loaded
// 🚨🚨🚨 comment out the next 3 lines when you start working on the code
// for (let i = 0; i < steak.length; i++) {
//   addFood(steak[i], '#steak');
// }

// ****************** Iteration 1 using callbacks ******************

// addFood(steak[0], '#steak', function () {
//   addFood(steak[1], '#steak', function () {
//     addFood(steak[2], '#steak', function () {
//       addFood(steak[3], '#steak', function () {
//         addFood(steak[4], '#steak', function () {
//           addFood(steak[5], '#steak', function () {
//             addFood(steak[6], '#steak', function () {
//               addFood(steak[7], '#steak');
//               document.querySelector('#table').innerHTML += `<img src="public/images/steak.jpg"/>`;
//             });
//           });
//         });
//       });
//     });
//   });
// });

// ****************** Iteration 2 using `.then()` ******************

// addFood(mashPotatoes[0], '#mashPotatoes').then(res => {
//   addFood(mashPotatoes[1], '#mashPotatoes').then(res => {
//     addFood(mashPotatoes[2], '#mashPotatoes').then(res => {
//       addFood(mashPotatoes[3], '#mashPotatoes').then(res => {
//         addFood(mashPotatoes[4], '#mashPotatoes');
//         document.querySelector('#table').innerHTML += `<img src="public/images/mashPotatoes.jpg"/>`;
//       });
//     });
//   });
// });

// ****************** Iteration 3 using async and await ******************

// brusselSprouts.forEach(eachStep => {
//   async function mealprep(step) {
//     await addFood(step, '#brusselSprouts');
//     if (brusselSprouts.indexOf(step) === brusselSprouts.length - 1) {
//       document.querySelector('#table').innerHTML += `<img src="public/images/brusselSprouts.jpg"/>`;
//     }
//   }
//   mealprep(eachStep);
// });

// ******************************************************************************************************

// 🚨🚨🚨 comment out previous iterations for solutions below:

// SOLUTION 1:
async function makeFood(steps, id) {
  for (const step of steps) {
    await addFood(step, id);
  }
  document.querySelector('#table').innerHTML += `<img src="public/images/${id.replace('#', '')}.jpg" />`;
}

Promise.all([
  makeFood(steak, '#steak'),
  makeFood(brusselSprouts, '#brusselSprouts'),
  makeFood(mashPotatoes, '#mashPotatoes')
]).then(res => {
  document.body.innerHTML += `<button onclick="new Audio('public/media/dinnerIsServed.mp3').play()">Dinner is served.</button>`;
});

// SOLUTION 2:
// async function makeFood(steps, id) {
//   let promises = [];
//   for (const step of steps) {
//     console.log(step);
//     promises.push(await addFood(step, id));
//   }
//   document.querySelector('#table').innerHTML += `<img src="public/images/${id.replace('#', '')}.jpg" />`;
//   return promises;
// }

// Promise.all([
//   makeFood(steak, '#steak'),
//   makeFood(mashPotatoes, '#mashPotatoes'),
//   makeFood(brusselSprouts, '#brusselSprouts')
// ]).then(res => {
//   document.body.innerHTML += `<button onclick="new Audio('public/media/dinnerIsServed.mp3').play()">Dinner is served.</button>`;
// });
