import { Carousel } from "react-bootstrap";
import "./main.css";
import Arrow from "./arrow.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShortCatalog } from "../../features/list/ShortCatalog";


export function MainHeader() {
  return null;
}

function About() {
  const [diff, setDiff] = useState(null);
  

  useEffect(() => {
    const coef = [1000*60*60*24, 1000*60*60, 1000*60, 1000];
    const from = new Date("Tue Jan 10 10:08:09 2023 +0300"); //first commit

    const intervalId = setInterval(() => {
      const diffValue = new Date() - from;
      const newValue = coef.map(el => Math.floor(diffValue / el));
      setDiff(`${newValue[0]} дня, ${newValue[1] % 24} часов, ${newValue[2] % 60} минут, ${newValue[3] % 60} секунд`);
    }, 1000);
    return(() => {
      clearInterval(intervalId);
    })
  }, []);

  return (
    <div id="about">
      <h3>О нас: </h3>
      <p>Мы на рынке уже {diff}. За это время мы успели выполнить множество заказов. За каждый из них мы можем ручаться. Наши клиенты ценят наше качество, скорость и удобство работы.</p>
    </div>
  )
}

export function MainBody() {
  const navigate = useNavigate();

  useEffect(() => {
    const headerStyle = document.getElementById("header").style
    headerStyle.position = "fixed";
    return () => headerStyle.position = "";
  }, []);

  return (
    <>
      <div className="carousel-container">
        <Carousel>
          <Carousel.Item>
            <img 
              className="d-block w-100"
              // data-src="holder.js/holder.js/800x400?text=Школьники строители&bg=373940" 
              src="img/schoolmates.jpg"
              alt="Школьники строители"
            />
            <Carousel.Caption>
              <h3>Наши строители наивысшего* класса</h3>
              <p>*Пятого</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img 
              className="d-block w-100"
              // data-src="holder.js/holder.js/800x400?text=Школьники строители&bg=373940" 
              src="img/materials.jpg"
              alt="Самые лучшие материалы"
            />
            <Carousel.Caption>
              <h3>У нас самые качественные материалы</h3>
              <p>Импортные</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img 
              className="d-block w-100"
              // data-src="holder.js/holder.js/800x400?text=Школьники строители&bg=373940" 
              src="img/specialist.gif"
              alt="Специалисты"
            />
            <Carousel.Caption>
              <h3>Самые сильные специалисты поддержки могут ответить на ваш вопрос</h3>
              <p>Ответ поддержки не гарантирован</p>
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img 
              className="d-block w-100"
              // data-src="holder.js/holder.js/800x400?text=Школьники строители&bg=373940" 
              src="img/tazi.jpg"
              alt="Специалисты"
            />
            <Carousel.Caption>
              <h3>При любой покупке катание на тазах в подарок!</h3>
              <p>при покупке от 1 000 000 000 рублей</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <img src={Arrow} alt="" />
      </div>
      <div id="short-catalog-section">
        <h3>Мы предлагаем:</h3>
        <div id="short-catalog-container">
          <ShortCatalog />
          <div id="short-catalog-continue" onClick={() => navigate("/catalog")}>
            <div id="short-catalog-arrow">
              <img src={Arrow} alt="" />
              <p>Больше товаров в каталоге</p>
            </div>
          </div>
        </div>
      </div>
      <About />
    </>
  );
}