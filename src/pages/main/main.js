import { Carousel } from "react-bootstrap";
import { useHolderjs } from "use-holderjs";
import "./main.css"


export function MainHeader() {
  return null;
}

export function MainBody() {
  useHolderjs();
  return (
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
          <h3>Самые сильные специалисты поддержки ответят на ваш вопрос</h3>
          <p>Ответ поддержки не гарантирован</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}