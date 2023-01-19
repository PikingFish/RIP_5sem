import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Control, CustomForm, Group } from "../../tools/form_generator/form_generator";
import { ListTemplate } from "../../tools/page_generator/page_generator";
import "./User.css";
import { selectMe } from "./authSlice";
import { doGetUser, doUpdateUser, selectUser, selectUserError, selectUserLoading, setUser } from "./userSlice";

export function User()  {
  const dispatch = useDispatch();
  const value = useSelector(selectUser);
  const loading = useSelector(selectUserLoading);
  const me = useSelector(selectMe);
  const error = useSelector(selectUserError);

  const { id } = useParams();

  useEffect(() => {
    if (me.id === Number(id) && me.id !== value.id) {
      dispatch(setUser(me));
    }
    else if (!loading && !error && Number(id) !== value.id) {
      dispatch(doGetUser(id));
    }
  }, [dispatch, id, value, me, loading, error]);

  return (
    !error || value ? 
      <CustomForm className="userform" onSubmitData={data => !loading ? dispatch(doUpdateUser({id: value.id, ...data})) : null}>
        <ListTemplate>
          <Group label="Username" name="username">
            <Control disabled={!value.canUpdate} value={value.username ? value.username : "Loading..."} />
          </Group>
          {value.canUpdate ? 
            <Group label="Password" name="password">
              <Form.Control type="password" placeholder="Type here password for change it"/>
            </Group>
          : null}
          {value.canUpdate ? <>
            <Button type="submit" disabled={loading}>{loading ? "Loading..." : "Update"}</Button>
            <Button variant="secondary">Delete</Button>
          </> : null}
        </ListTemplate>
      </CustomForm>
    : null
  );
}