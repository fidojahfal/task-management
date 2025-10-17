const { Modal, Button } = require("react-bootstrap");

export default function ModalGeneric({
  showModal,
  setShowModal,
  action,
  title,
  id,
}) {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <div className="modal-header">
        <h5 className="modal-title">{title}</h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => setShowModal(false)}
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-footer">
        <Button
          variant="danger"
          onClick={() => {
            setShowModal(false);
            action(id);
          }}
        >
          Delete
        </Button>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
