import React, { useState } from "react"
import Modal from "react-modal"
import "./modal.css"
import BtnClose from "../buttons/BtnClose"
import BtnPrimary from "../buttons/BtnPrimary"
const FalloContraseña = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const openModal = () => {
    setModalIsOpen(true)
  }
  const closeModal = () => {
    setModalIsOpen(false)
  }
  const handleEmailChange = event => {
    setEmail(event.target.value)
  }
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost/bd-appqr/v1/user/email.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      )
      const data = await response.json()
      setMessage(data.message)
    } catch (error) {
      console.error("Error al enviar correo", error)
      setMessage("Error al enviar correo")
    }
  }
  return (
    <div>
      <a href="#" onClick={openModal}>
        Olvidaste la contraseña
      </a>
      <Modal
        className="content"
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Introduce el email para enviarte la contraseña"
      >
        <div className="modalHeader">
          <h2>Recuperación de contraseñas</h2>
          <BtnClose onClick={closeModal} className="btnClose" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="textos">
            <label htmlFor="input1">Email al que enviar la contraseña:</label>
            <input
              id="input1"
              type="email"
              className="inputpass"
              required
              placeholder="Introduce tu correo"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="btnpassenv">
            <BtnPrimary type="submit">Enviar</BtnPrimary>
          </div>
        </form>
        {message && <p>{message}</p>}
      </Modal>
    </div>
  )
}
export default FalloContraseña
