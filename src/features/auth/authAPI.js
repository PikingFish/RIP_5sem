import API from "../../app/api";

// export function login(data) {
//   const xhr = new XMLHttpRequest();
//   xhr.open("POST", "/api/login")
//   xhr.send(JSON.stringify(data));
//   return new Promise((resolve, reject) => {
//     xhr.onload = function () {
//       if (xhr.status !== 200) {
//         return reject("Login or password incorrect");
//       }
//       return resolve({data: xhr.response});
//     }
//   });
// }

export async function login(data) {
  const payload = {username: data.username, password: data.password}
  if (data.register) {
    await API.post("/registration", payload)
  }
  return (await API.post("/login", payload)).data;
}

// const me = {
//   id: 1,
//   username: "admin",
//   admin: true
// };

// export function login(data) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (data.login === "admin" && data.password === "admin") {
//         return resolve(me);
//       }
//       return reject("Login or password incorrect");
//     }, 500);
//   });
// }

// export function logout() {
//   const xhr = new XMLHttpRequest();
//   xhr.open("POST", "/api/login")
//   xhr.send();
//   return new Promise((resolve, reject) => {
//     xhr.onload = function () {
//       if (xhr.status !== 200) {
//         return reject({status: xhr.status});
//       }
//       return resolve();
//     }
//   });
// }

// export function logout() {
//   return new Promise((resolve) => setTimeout(() => resolve(), 500));
// }

export async function logout() {
  await API.get("/logout");
}

// export function whoami() {
//   return new Promise((_, reject) => {
//     setTimeout(() => reject(), 500);
//   });
// }

export async function whoami() {
  return (await API.get('/client')).data;
}

// export function whoami() {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", "/api/user")
//   xhr.send();
//   return new Promise((resolve, reject) => {
//     xhr.onload = function () {
//       if (xhr.status !== 200) {
//         return reject();
//       }
//       return resolve(xhr.response);
//     }
//   });
// }
