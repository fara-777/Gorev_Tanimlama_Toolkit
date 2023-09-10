import { useEffect, useState } from "react";
import { FormLabel } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { addTask } from "../../app/crudSlice";

function FormModal({ show, handleClose, editTask }) {
  // Form verilerini tutacak olan state'i
  const [formState, setFormState] = useState({
    name: "",
    assign_a_task: "",
    assignment_status: "",
    date: "",
  });

  const dispatch = useDispatch();
  // Formun boş olup olmadığını kontrol state'i
  const [formControl, setFormControl] = useState(false);
  /* Formun state'ni belrleme
  ? Duzenlenicek task:
  var ise formState bu taskin bilgileri aktarilacak (duzenleme modu)
  yok ise o zaman formState tutugu degeri bos string olucak (ekleme modu)
  */
  useEffect(() => {
    const stateValue = editTask
      ? editTask
      : {
          name: "",
          assign_a_task: "",
          assignment_status: "",
          date: "",
        };
    setFormState(stateValue);
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form verilerini kontrolu
    if (
      !formState.name ||
      !formState.assign_a_task ||
      !formState.assignment_status ||
      !formState.date
    ) {
      setFormControl(true);
    } else {
      // Form verileri uygunsa dispatch ile gönderin
      dispatch(addTask(formState));
      // Modalı kapatın
      handleClose();
    }
  };

  const handleModalClose = () => {
    if (formControl) {
      // Eğer form boşsa modalı kapatma
      return;
    }
    handleClose();
  };

  return (
    <>
      <Modal show={show} onHide={handleModalClose} className="text-dark">
        <Modal.Header closeButton>
          <Modal.Title>
            {!editTask ? "Yeni Gorev Ekle" : "Gorevi Duzenle"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Isim Soyisim</Form.Label>
              <Form.Control
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                type="text"
                placeholder="Isim Soyisim Giriniz"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Gorev</Form.Label>
              <Form.Control
                value={formState.assign_a_task}
                onChange={(e) =>
                  setFormState({ ...formState, assign_a_task: e.target.value })
                }
                type="text"
                placeholder="Gorev Giriniz"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <FormLabel>Gorev Durumu</FormLabel>
              <Form.Control
                value={formState.assignment_status}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    assignment_status: e.target.value,
                  })
                }
                type="text"
                placeholder="Gorev Durumunuz"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tarih</Form.Label>
              <Form.Control
                value={formState.date}
                onChange={(e) =>
                  setFormState({ ...formState, date: e.target.value })
                }
                type="date"
                placeholder="Tarih Girin"
                autoFocus
              />
            </Form.Group>
            <Modal.Footer>
              {formControl && (
                <p style={{ color: "red" }}>Lutfen tum alanlari doldurun</p>
              )}
              <Button variant="secondary" onClick={handleClose}>
                Vazgec
              </Button>
              <Button type="submit" variant="primary">
                Kaydet
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FormModal;
