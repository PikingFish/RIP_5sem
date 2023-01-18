import "./ShortCatalog.css";
import { Item, ItemExample } from "./Item"; 
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShortCatalog, selectShortCatalogLoading, selectShortCatalogValue } from "./shortCatalogSlice";

export function ShortCatalog({limit, ...props}) {
  const value = useSelector(selectShortCatalogValue);
  const loading = useSelector(selectShortCatalogLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShortCatalog());
  }, [dispatch]);

  return (
    <div className="short-catalog" {...props}>
      {value ? value.map(el => 
        <Item item={el} />
      ) : null}
    </div>
  )
}