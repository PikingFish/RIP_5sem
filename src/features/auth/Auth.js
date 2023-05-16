import { useEffect } from 'react';
import { Button, Dropdown, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { selectMe, selectAuthLoading, doLogout, setFrom, doLogin, selectFrom } from "./authSlice";
import { CustomForm, Group } from '../../tools/form_generator/form_generator';
import userIcon from "./user.svg"
import "./auth.css"

let addToAuthHeaderList = [];

export function addToAuthHeader(element) {
  addToAuthHeaderList.push(element);
}

export function RequireAuth({ children }) {
  const me = useSelector(selectMe);
  const loading = useSelector(selectAuthLoading);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !me) {
      dispatch(setFrom(location.pathname));
      navigate("/auth");
    }
  }, [location, dispatch, loading, me, navigate]);

  if (loading) {
    return "Loading...";
  }

  if (!me) {
    return null;
  }

  return children; 
}

export function AuthHeader() {
  const me = useSelector(selectMe);
  const loading = useSelector(selectAuthLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  function clickAuth() {
    dispatch(setFrom(location.pathname));
    navigate("/auth");
  }

  return (
    <Dropdown>
      {me ? 
        <Dropdown.Toggle variant='secondary'>
          <img
            alt=""
            src={userIcon}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          {me.username}
        </Dropdown.Toggle> 
      : 
        <Button variant="secondary" onClick={clickAuth}>
          {loading ? "Загрузка..." : "Войти"}
        </Button>}
      {me ? <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => {
            navigate(`/user/${me.id}`);
          }}
        >
          Мой аккаунт
        </Dropdown.Item>
        {me.admin ? <Dropdown.Item href="/admin">
          Перейти в админку
        </Dropdown.Item> : null}
        {addToAuthHeaderList}
        <Dropdown.Divider />
        <Dropdown.Item
          onClick={() => {
            dispatch(doLogout()).then(() => {
              navigate("/auth");
            });
          }}
        >
          Выйти
        </Dropdown.Item>
      </Dropdown.Menu> : null}
    </Dropdown>
  );
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Run(e) {
  e.target.style.top = Math.min(Math.max(e.target.offsetTop + getRandomInt(100, 200)*(getRandomInt(0,1)*2 - 1), 0), window.innerHeight-100) + "px"
  e.target.style.left = Math.min(Math.max(e.target.offsetLeft + getRandomInt(100, 200)*(getRandomInt(0,1)*2 - 1), 0), window.innerWidth-100) + "px"
}

export function Auth() { 
  const loading = useSelector(selectAuthLoading);
  const me = useSelector(selectMe);
  const from = useSelector(selectFrom);
  const dispatch = useDispatch();

  return (
    <>
      {me ? <Navigate to={from} /> : null}
      <CustomForm onSubmitData={(data, e) => !loading ? dispatch(doLogin({...data, register: e.nativeEvent.submitter.id == "button_register"})) : null}>
        <Group label="Логин" name="username">
          <Form.Control />
        </Group>
        <Group label="Пароль" name="password">
          <Form.Control />
        </Group>
        <div className="loginbuttonGroup">
          <Button type="submit" id="button_login">{loading ? "Загрузка..." : "Войти"}</Button>
          <Button type="submit" id="button_register" variant="danger" onMouseOver={Run}>{loading ? "Загрузка..." : "Регистрация"}</Button>
        </div>
      </CustomForm>
    </>
  );
}