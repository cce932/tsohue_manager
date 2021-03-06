import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { isNumeric } from "validator"
import Form from "react-validation/build/form"
import Input from "react-validation/build/input"
import CheckButton from "react-validation/build/button"
import useDialogContext from "hooks/useDialogContext"

import "shared/style/addIngredient.scss"
import { SecondaryBtn } from "shared/components/styled"
import { addIngredient } from "actions/addData"

const required = (value) => {
  if (!value.length) {
    return <div className="note">需輸入值</div>
  }
}

const validCategory = (value) => {
  if (!(value in categoryOptions)) {
    return <div className="note">非有效值</div>
  }
}

const validPrice = (value) => {
  if (!isNumeric(value)) {
    return <div className="note">需為數字</div>
  }
}

const validKcal = (value) => {
  if (!isNumeric(value)) {
    return <div className="note">需為數字</div>
  }
}

const validStock = (value) => {
  if (!isNumeric(value)) {
    return <div className="note">需為數字</div>
  }
}

const validSafetyStock = (value) => {
  if (!isNumeric(value)) {
    return <div className="note">需為數字</div>
  }
}

const categoryOptions = {
  VEGETABLE: "VEGETABLE",
  MEET: "MEET",
  SPICE: "SPICE",
  OTHER: "OTHER",
}

const AddIngredient = () => {
  const form = useRef()
  const checkBtn = useRef()
  const dispatch = useDispatch()
  const addDialog = useDialogContext()
  const { message } = useSelector((state) => state.messages)

  const [category, setCategory] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [stock, setStock] = useState("")
  const [safetyStock, setSafetyStock] = useState("")
  const [unit, setUnit] = useState("")
  const [kcal, setKcal] = useState("")

  const onChangeCategory = (e) => {
    setCategory(e.target.value)
  }
  const onChangeCity = (e) => {
    setCity(e.target.value)
  }
  const onChangeCountry = (e) => {
    setCountry(e.target.value)
  }
  const onChangeKcal = (e) => {
    setKcal(e.target.value)
  }
  const onChangeName = (e) => {
    setName(e.target.value)
  }
  const onChangePrice = (e) => {
    setPrice(e.target.value)
  }
  const onChangeStock = (e) => {
    setStock(e.target.value)
  }
  const onChangeSafetyStock = (e) => {
    setSafetyStock(e.target.value)
  }
  const onChangeUnit = (e) => {
    setUnit(e.target.value)
  }

  const clearInputs = () => {
    document.getElementById("category").value = ""
    document.getElementById("name").value = ""
    document.getElementById("price").value = ""
    document.getElementById("country").value = ""
    document.getElementById("city").value = ""
    document.getElementById("stock").value = ""
    document.getElementById("safetyStock").value = ""
    document.getElementById("unit").value = ""
    document.getElementById("kcal").value = ""
  }

  const handleAddIngredient = (e) => {
    e.preventDefault()
    form.current.validateAll()

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(addIngredient(category, name, price, country, city, stock, safetyStock, unit, kcal)).then(
        (res) => {
          console.log("res", res)
          clearInputs()
          addDialog(`新增「${res.name}」成功`)
        },
        (error) => null
      )
    }
  }

  return (
    <div className={`collapse add-ingredient`} id="collapseExample">
      <Form id="addIIForm" onSubmit={handleAddIngredient} ref={form}>
        <div className={`form`}>
          <div className={`row input`}>
            <div className={`col`}>
              <label>種類</label>
              <Input
                id="category"
                type="text"
                name="category"
                onChange={onChangeCategory}
                value={category}
                list="categoryList"
                validations={[required, validCategory]}
              />
              <datalist id="categoryList">
                <option value="VEGETABLE" />
                <option value="MEET" />
                <option value="SPICE" />
                <option value="OTHER" />
              </datalist>

              <label>名稱</label>
              <Input
                id="name"
                type="text"
                name="name"
                onChange={onChangeName}
                value={name}
                validations={[required]}
              />

              <label>價格</label>
              <Input
                id="price"
                type="text"
                name="price"
                onChange={onChangePrice}
                value={price}
                validations={[required, validPrice]}
              />
            </div>
            <div className={`col`}>
              <label>產地國</label>
              <Input
                id="country"
                type="text"
                name="country"
                onChange={onChangeCountry}
                value={country}
                validations={[required]}
              />

              <label>產地區</label>
              <Input
                id="city"
                type="text"
                name="city"
                onChange={onChangeCity}
                value={city}
                validations={[required]}
              />

              <label>熱量</label>
              <Input
                id="kcal"
                type="text"
                name="kcal"
                onChange={onChangeKcal}
                value={kcal}
                validations={[required, validKcal]}
              />
            </div>
            <div className={`col`}>
              <label>安全存量</label>
              <Input
                id="safetyStock"
                type="text"
                name="safetyStock"
                onChange={onChangeSafetyStock}
                value={safetyStock}
                validations={[required, validSafetyStock]}
              />

              <label>單位</label>
              <Input
                id="unit"
                type="text"
                name="unit"
                onChange={onChangeUnit}
                value={unit}
                validations={[required]}
              />

              <label>庫存</label>
              <Input
                id="stock"
                type="text"
                name="stock"
                onChange={onChangeStock}
                value={stock}
                validations={[required, validStock]}
              />
            </div>
            <div className={`col-2`}>
              <div className={`right`}>
                {/* <div className="message">{message}</div> */}
                {/* <label className="message">錯誤囉錯誤囉錯誤囉</label> */}

                <SecondaryBtn>確定</SecondaryBtn>
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  )
}

export default AddIngredient