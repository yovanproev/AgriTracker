import React, { useState, useEffect } from "react"
import Modal from "../../Components/Modal/Modal";
import { updateByRowId } from "../../Firebase/UpdateRowsInRealtimeDB";
import { getPaginatedTableData } from "../../Firebase/FetchDataFromRealtimeDB"
import emailjs from 'emailjs-com';

const RequestApprovals = (props) => {
  const [ purchaseNumber, updatePurchaseNumber ] = useState("")
  const [ responseStatus, updateResponseStatus ] = useState(0)
  const [ disableButton, setDisableButton ] = useState(true)

  const [ error, setError ] = useState(false)

  const [ purchaseRequest, updatePurchaseRequest ] = useState([])

  const activity = parseInt(4);

  useEffect(() => {
    if (purchaseNumber >= 1) setDisableButton(false) 
    else setDisableButton(true)
  
    const errorOnDB = () => {
      if (purchaseNumber !== "") setError(true)
    }

    getPaginatedTableData(purchaseNumber, 1, props, errorOnDB, activity).then(purRequest => {
      if (purRequest) updatePurchaseRequest(Object.values(purRequest)[0]) 
    })
  }, [activity, props, purchaseNumber])

  const errorOnDB = () => {
    setError(true)
  }

    const closeError = () => {
      setError(false)
    }

  const purchaseNumberHandler = (value) => {
    updatePurchaseNumber(value)
  }

  const updateDataByRowHandler = (value) => {
    updateResponseStatus(value)
  }

  const submitHandler = (e) => {
    e.preventDefault();
    
    const serviceIdProd = "service_vf4sxdn";
    const templateIdProd = "template_47ode22"
    const userIdProd = "user_lrqjAHvBjKfTMe8w7qCdJ"

    const serviceIdDev = "service_73nupzv";
    const templateIdDev = "template_y9rfmaw"
    const userIdDev = "user_lRQqXCJsRmCA8Wc2Ujn4d"

    const serviceId = process.env.NODE_ENV === 'production'
    ? serviceIdProd : serviceIdDev
    const templateId = process.env.NODE_ENV === 'production'
    ? templateIdProd : templateIdDev
    const userId = process.env.NODE_ENV === 'production'
    ? userIdProd : userIdDev

    const update = {statusOfRequest: responseStatus}
    updateByRowId(purchaseNumber, props, null, null, update, activity, errorOnDB)
    
    emailjs.sendForm(serviceId, templateId, e.target, userId)
  .then((result) => {
    setDisableButton(true)
  }, (error) => {
    setDisableButton(true)
  });
  }

  const errorModal = <Modal show={error} 
  hide={closeError}>There is no Purchase request with that number.</Modal>

  return (
    
    <div style={{marginTop: "20px", textAlign: "center"}}>
      {errorModal}
      {/* <ContactUs /> */}
      <h3>Request approval</h3>
        <p>Purchase request #</p>
        <form className="contact-form" onSubmit={submitHandler}>
        
          <label>
          <input type="number" value={purchaseNumber || ""} onChange={(e) => 
            purchaseNumberHandler(parseInt(e.target.value))} name="purchaseNumber"/>
          </label>
          
          <input type="hidden" value={responseStatus} onChange={() => null} 
          name="decision" />
          
          <input type="hidden" value={purchaseRequest.email || ""} onChange={() => null}
          name="email" />

          <input type="hidden" value={purchaseRequest.categoryOfMaterials || ""} onChange={() => null}
          name="categoryOfMaterials" />
          <input type="hidden" value={purchaseRequest.date || ""} onChange={() => null}
          name="date" />
          <input type="hidden" value={purchaseRequest.operator || ""} onChange={() => null}
          name="operator" />
          <input type="hidden" value={purchaseRequest.price || ""} onChange={() => null}
          name="price" />
          <input type="hidden" value={purchaseRequest.purposeOfPurchase || ""} onChange={() => null} 
          name="purposeOfPurchase" />
          <input type="hidden" value={purchaseRequest.subCategoryOfMaterials || ""} onChange={() => null}
          name="subCategoryOfMaterials" />
          <input type="hidden" value={purchaseRequest.supplier || ""} onChange={() => null}
          name="supplier" />
          <input type="hidden" value={purchaseRequest.quantity || ""} onChange={() => null}
          name="quantity" />
          <br></br>

          <button type="submit" className="btn btn-success" disabled={disableButton} id={"Approved"}
          onClick={(e) => updateDataByRowHandler(e.target.id)} style={{padding: "5px 20px", marginRight: "5px"}}>
            Approve</button>
          
          <button type="submit" className="btn btn-warning" disabled={disableButton} id={"Declined"}
          onClick={(e) => updateDataByRowHandler(e.target.id)} style={{padding: "5px 20px", marginLeft: "5px"}}>
            Decline</button>

        </form>
  </div>
  )
}

export default RequestApprovals;