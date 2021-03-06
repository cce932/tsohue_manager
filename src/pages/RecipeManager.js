import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { textFilter } from "react-bootstrap-table2-filter"
import { Redirect } from "react-router-dom"

import "shared/style/recipeManager.scss"
import TableWithFilterByCol from "shared/components/TableWithFilterByCol"
import { getMeunName } from "shared/utility/common"
import { allPaths } from "shared/constants/pathname"
import { ExpandDiv, PrimaryStrokeBtn } from "shared/components/styled"
import { getAllRecipes } from "actions/loadData"
import { deleteRecipe } from "actions/deleteData"
import { countSelectedId } from "shared/utility/common"

const RecipeManager = () => {
  const dispatch = useDispatch()
  const { allRecipes } = useSelector((state) => state.recipes)
  const { isLoggedIn } = useSelector((state) => state.auth)
  const [selectedId, setSelectedId] = useState([])

  useEffect(() => {
    dispatch(getAllRecipes())
  }, [])

  const keyField = "id"

  let id_filter = () => null
  let name_filter = () => null
  let likeCount_filter = () => null

  const clearFilterHandler = () => {
    id_filter("")
    name_filter("")
    likeCount_filter("")
  }

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    clickToEdit: true,
    bgColor: "rgb(248, 249, 252)",
    onSelect: (row, isSelect, rowIndex, e) => {
      setSelectedId(countSelectedId([row], isSelect, selectedId))
    },
    onSelectAll: (isSelect, rows, e) => {
      setSelectedId(countSelectedId(rows, isSelect, selectedId))
    },
  }

  const columns = [
    {
      dataField: "id",
      text: "ID",
      filter: textFilter({
        getFilter: (filter) => {
          id_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
    },
    {
      dataField: "name",
      text: "名稱",
      filter: textFilter({
        getFilter: (filter) => {
          name_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
    },
    {
      dataField: "likesCount",
      text: "收藏數",
      filter: textFilter({
        getFilter: (filter) => {
          likeCount_filter = filter
        },
        placeholder: " ",
      }),
      sort: true,
    },
  ]

  const handleDeleteMember = () => {
    if (selectedId.length > 0) {
      if (window.confirm(`確定刪除會員ID: ${selectedId.toString()}？`)) {
        dispatch(deleteRecipe(selectedId))
        setSelectedId([])
      }
    }
  }

  return isLoggedIn ? (
    allRecipes ? (
      <ExpandDiv>
        <div className="tools">
          <PrimaryStrokeBtn onClick={handleDeleteMember}>
            刪除食譜
          </PrimaryStrokeBtn>
          <PrimaryStrokeBtn onClick={clearFilterHandler}>
            清除搜尋
          </PrimaryStrokeBtn>
        </div>

        <TableWithFilterByCol
          keyField={keyField}
          data={allRecipes}
          columns={columns}
          selectRow={selectRow}
        />
      </ExpandDiv>
    ) : (
      <h1>Loading</h1>
    )
  ) : (
    <>
      {window.alert(
        `欲前往「${getMeunName(
          allPaths,
          window.location.pathname
        )}」 請先登入喔`
      )}
      <Redirect to="/login" />
    </>
  )
}

export default RecipeManager