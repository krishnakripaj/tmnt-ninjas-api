console.log("1. Before connecting to Db ....");

// function getMovieDataFromDb() {
//   setTimeout(() => {
//     console.log("2. Reading movie details from Db .....");
//     return { id: 34, name: "Teenage Mutant Ninja Turtles 2" };
//   }, 5000);
// }

// Using Callback
// function getMovieDataFromDb(callback) {
//   setTimeout(() => {
//     console.log("2. Reading movie details from Db .....");
//     callback({ id: 34, name: "Teenage Mutant Ninja Turtles 2" });
//   }, 3000);
// }

// Using Promise
function getMovieDataFromDb() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("2. Reading movie details from Db .....");
      resolve({ id: 34, name: "Teenage Mutant Ninja Turtles 2" });
    //   reject("Something went wrong");
    }, 3000);
  });
}

console.log("3. After Calling the DB reading function ...");
// Using Async Await
async function doAsyncWork() {
  try {
    let movieDetailsFromDb = await getMovieDataFromDb();
    console.log(`4. Movie Details: ${movieDetailsFromDb.name}`);
  } catch (err) {
    console.log(err);
  }
}
doAsyncWork();

//Using Promise
// getMovieDataFromDb()
//   .then((movieDetails) => {
//     let movieDetailsFromDb = movieDetails;
//     console.log(`4. Movie Details: ${movieDetailsFromDb.name}`);
//   })
//   .catch((err) => console.log(err));

// Using Callback
// getMovieDataFromDb((movieDetails)=>{
//     let movieDetailsFromDb = movieDetails
//     console.log(`4. Movie Details: ${movieDetailsFromDb.name}`);
// });
