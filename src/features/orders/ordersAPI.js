import API from "../../app/api";

export async function doGetOrders() {
  return (await API.get("/myorders")).data;
}

export async function doGetInfoOrder(id) {
  return (await API.get(`/order/${id}`)).data;
}