// export function getUser(id) {
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", `/api/user/${id}`)
//   xhr.send();
//   return new Promise((resolve, reject) => {
//     xhr.onload = function () {
//       if (xhr.status !== 200) {
//         return reject("Access Denied");
//       }
//       return resolve({data: xhr.response});
//     }
//   });
// }

import API from "../../app/api";

// const groups = {
//     1: {
//         id: 1,
//         name: "admin"
//     },
//     2: {
//         id: 2,
//         name: "test"
//     }
// };

// const users = {
//     1: {
//         id: 1,
//         username: "admin",
//         groups: [1, 2]
//     }, 
//     2: {
//         id: 2,
//         username: "scv",
//         groups: [2]
//     }
// };

// export function getUser(id) {
//     return new Promise((resolve, reject) => setTimeout(() => users[id] ? resolve({
//         user: users[id],
//         groups: users[id].groups.map((el) => groups[el])
//     }) : reject("Not found"), 500));
// }

export async function getUser(id) {
    return (await API.get(`/client/${id}`)).data;
}

export function updateUser(user) {
    let toSend = {...user};
    delete toSend.id;
    API.put(`/client/${user.id}`, toSend);
}