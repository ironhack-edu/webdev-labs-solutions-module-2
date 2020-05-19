// This will print in the wrong order
// we added it for you to test to make sure data is loaded
// 🚨🚨🚨 comment out the next 3 lines when you start working on the code
// for (let i = 0; i < steak.length; i++) {
//   addFood(steak[i], '#steak');
// }

// // Iteration 1 using callbacks - Try to streamline with recursion
// addFood(steak[0], '#steak', () => {
//   // ... your code here
// });

// // Iteration 2 using then - Try to streamline with recursion
// addFood(mashPotatoes[0], '#mashPotatoes').then(res => {
//   // ... your code here
// });

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
