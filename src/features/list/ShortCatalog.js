import "./ShortCatalog.css";
import { Item } from "./Item"; 
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShortCatalog, selectShortCatalogValue } from "./shortCatalogSlice";

export function ShortCatalog({limit, ...props}) {
  const value = useSelector(selectShortCatalogValue);
  const dispatch = useDispatch();
  const ref = useRef();
  const ObsRef = useRef();

  useEffect(() => {
    if (!value) {
      dispatch(getShortCatalog());
    }
  }, [dispatch, value]);

  useEffect(() => {
    const cleanUpRef = ref.current;
    if (!ObsRef.current) {
      ObsRef.current =  new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          entry.target.classList.toggle("visible", entry.isIntersecting);
        });
      });
    }
    console.log(1234);
    return(() => {
      console.log(4321)
      ObsRef.current.unobserve(cleanUpRef);
    })
  }, [ObsRef, ref]);

  function onLoadWrapper() {
    let loadedImgs = 0;
    function onLoad(e) {
      loadedImgs += 1;
      if (loadedImgs === value.length && ref.current && ObsRef.current) {
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