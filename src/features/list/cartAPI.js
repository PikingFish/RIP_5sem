import API from "../../app/api";

export async function doGetCart() {
  const data = (await API.get("/cart")).data;
  // return Object.values(data.reduce((a, el) => (a[el.id] ? a : {...a, [el.id]: {...el, count: data.filter(e => e.id === el.id).length}}), {}));
  return data.reduce((a, el) => a.filter(e => e.id === el.id)[0] ? a : [...a, {...el, count: data.filter(e => e.id === el.id).length}], []);
}

export async function doAddToCart({id}) {
  await API.post(`/staf/${id}`);
}