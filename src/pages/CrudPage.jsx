import { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Table } from "react-bootstrap";
import FormModal from "../components/modal";
import { useDispatch, useSelector } from "react-redux";
import { removeTask } from "../app/crudSlice";

export default function CrudPage() {
  // abone olma islemi
  const state = useSelector((store) => store.crudReducer);
  // modal state'i
  const [showModal, setShowModal] = useState(false);
  // duzenlenecek elemanin state'i
  const [editTask, setEditTask] = useState(null);

  const dispatch = useDispatch();
  // modali kapatacak fonksion
  const handleClose = () => {
    // duzenlenicek elemani sifirla
    setEditTask(null);
    // modali kapatir
    setShowModal(false);
  };

  return (
    <div className="px-3">
      <FormModal
        show={showModal}
        handleClose={handleClose}
        editTask={editTask}
      />
      <div className="d-flex align-items-center mx-5">
        <Button
          variant="outline-success my-3"
          onClick={() => setShowModal(true)}
        >
          Yeni Gorev Ekle
        </Button>
      </div>
      <Table variant="dark text-center" bordered>
        <thead>
          <tr>
            <th>No</th>
            <th>Isim Soyisim</th>
            <th>Gorev</th>
            <th>Gorev Durumu</th>
            <th>Tarih</th>
            <th>Islemler</th>
          </tr>
        </thead>
        <tbody>
          {state.tasks.map((task, i) => (
            <tr key={i}>
              <td> {i + 1}</td>
              <td>{task.name}</td>
              <td>{task.assign_a_task}</td>
              <td>{task.assignment_status}</td>
              <td>{task.date}</td>
              <td>
                <ButtonGroup>
                  <Button
                    variant="danger"
                    onClick={() => dispatch(removeTask(task.id))}
                  >
                    Sil
                  </Button>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      setEditTask(task), setShowModal(true);
                    }}
                  >
                    Duzenle
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
