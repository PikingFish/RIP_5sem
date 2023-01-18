import API from "../../app/api";

export async function doGetShortCatalog(count = 5) {
  return (await API.get('/catalog', {
    params: {count}
  })).data;
}