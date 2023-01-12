import {Form, Button} from "react-bootstrap";
import { CustomForm, Group, Checkbox } from "../../tools/form_generator/form_generator";
import { useSelector, useDispatch } from 'react-redux';
import "./Filter.css";
import { selectLoading, getData } from "./listSlice";
import { selectMe } from "../auth/authSlice";


export default function Filter() {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const me = useSelector(selectMe);


  return (
    <CustomForm className="filter" onSubmitData={(formData) => !loading ? dispatch(getData(formData)) : null}>
      <Group name="title" label="Поиск по названию">
        <Form.Control placeholder="Введите часть названия" />
      </Group>
      <Group name="min_price" label="От (руб)">
        <Form.Control placeholder="minprice" />
      </Group>
      <Group name="max_price" label="До (руб)">
        <Form.Control placeholder="maxprice" />
      </Group>
      <Group name="count" label="Количество результатов">
        <Form.Control placeholder="count" />
      </Group>
      <Button
        variant="primary"
        disabled={loading}
        type="submit"
      >
      {!loading ? "Найти" : "Загрузка..."}
      </Button>
    </CustomForm>
  );
}
