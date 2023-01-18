import "./ShortCatalog.css";
import { Item } from "./Item"; 
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShortCatalog, selectShortCatalogLoading, selectShortCatalogValue } from "./shortCatalogSlice";

export function ShortCatalog({limit, ...props}) {
  const value = useSelector(selectShortCatalogValue);
  const loading = useSelector(selectShortCatalogLoading);
  const dispatch = useDispatch();
  const ref = useRef();
  const ObsRef = useRef();

  useEffect(() => {
    dispatch(getShortCatalog());
  }, [dispatch]);

  useEffect(() => {
    if (!ObsRef.current) {
      ObsRef.current =  new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        });
      });
    }
    console.log(1234);
  }, [ObsRef]);

  function onLoadWrapper() {
    let loadedImgs = 0;
    function onLoad(e) {
      console.log(e, loadedImgs, value.length, !!ref.current, !!ObsRef.current);
      loadedImgs += 1;
      if (loadedImgs == value.length && ref.current && ObsRef.current) {
        console.log("observe")
        ObsRef.current.observe(ref.current, {});
      }
    }
    return onLoad;
  }

  return (
    <div className="short-catalog" ref={ref} onLoad={onLoadWrapper()} {...props}>
      {value ? value.map((el, n) => 
        <Item key={el.id} item={el} style={{animationDelay: `${n*0.5}s`}} />
      ) : null}
    </div>
  )
}