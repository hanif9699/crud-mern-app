import './App.css';
import Table from './components/Table';
import { useDispatch } from 'react-redux';
import React, { useState, useRef } from 'react';
import { getAllDetail, addDetails } from './reducers/dataSlice'
import ModalForm from './components/ModalForm';
function App() {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [values, setValues] = useState({
    name: '',
    email: '',
    image: null,
    error: false
  })
  const imageRef = useRef()
  const handleChange = (event) => {
    if (event.target.name === 'image') {
      setValues({ ...values, [event.target.name]: event.target.files[0] })
    } else {
      setValues({ ...values, [event.target.name]: event.target.value })
    }
  }
  React.useEffect(() => {
    dispatch(getAllDetail())
  }, [dispatch])
  const handleClose = () => {
    setShow(false);
    setValues({
      name: '',
      email: '',
      image: null
    })
  }
  const submitForm = () => {
    if (values.name && values.email && values.image) {
      let formData = new FormData();
      Object.keys(values).map((k) => {
        if (k !== 'error') {
          formData.append(k, values[k])
        }
        return k
      })
      dispatch(addDetails({ formData }))
      handleClose()
    } else {
      setValues({ ...values, error: true })
    }
  }
  const handleShow = () => setShow(true);
  return (
    <div className="App">
      <div>
        <h1>User Detail Table Page</h1>
        <div className="add-new-button">
          <button type="button" className="btn-custom add-btn" onClick={handleShow}>Add Detail</button>
        </div>
        <ModalForm show={show} handleClose={handleClose} title="Add Details" values={values} handleChange={handleChange} imageRef={imageRef} submitForm={submitForm} />
      </div>
      <Table />
    </div>
  );
}

export default App;
