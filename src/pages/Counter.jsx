import { Button, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { decrease, increase, setCount } from "../app/counterSlice";

export default function Counter() {
  const state = useSelector((store) => store.counterReducer);

  const dispatch = useDispatch();

  const counter = state.count >= 0 ? "green-text" : "red-text";

  return (
    <>
      <div
        style={{ height: "100vh" }}
        className="d-flex justify-content-center align-items-center flex-column gap-3"
      >
        <h1>Sayac</h1>
        <h1 className={counter}>{state.count}</h1>
        <Stack
          direction="horizontal"
          className=" d-flex justify-content-center "
          gap={3}
        >
          <Button variant="outline-danger" onClick={() => dispatch(decrease())}>
            Azalt
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => dispatch(setCount(0))}
          >
            Sifirla
          </Button>
          <Button
            variant="outline-success"
            onClick={() => dispatch(increase())}
          >
            Artir
          </Button>
        </Stack>
      </div>
    </>
  );
}
