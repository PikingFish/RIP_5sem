import API from "../../app/api";

export async function doGetOrders() {
  return (await API.get("/myorders")).data;
}