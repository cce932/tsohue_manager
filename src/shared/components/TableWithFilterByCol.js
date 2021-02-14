import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory from "react-bootstrap-table2-paginator"
import filterFactory from "react-bootstrap-table2-filter"
import "shared/style/components/tableWithFilterByCol.scss"

// 有頁數 可選擇每頁顯示幾個
const TableWithFilterByCol = ({
  keyField,
  data,
  columns,
  clearFilterHandler = () => null,
}) => {
  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    hideSelectColumn: true,
    bgColor: "rgb(229, 234, 240)",
  }

  const pagination = paginationFactory({
    sizePerPageList: [
      { text: "少", value: 14 },
      { text: "多", value: 18 },
      { text: "全部", value: data.length },
    ],
    hidePageListOnlyOnePage: true,
    sizePerPageRenderer,
  })

  const sortOption = {
    sortCaret: (order, column) => {
      if (!order)
        return (
          <span>
            &nbsp;&nbsp;<i class="fas fa-sort"></i>
          </span>
        )
      else if (order === "asc")
        return (
          <span>
            &nbsp;&nbsp;<i class="fas fa-sort-up"></i>
          </span>
        )
      else if (order === "desc")
        return (
          <span>
            &nbsp;&nbsp;<i class="fas fa-sort-down"></i>
          </span>
        )
    },
  }

  return (
    <>
      <button className="clear-filter" onClick={clearFilterHandler}>
        清除篩選
      </button>
      <BootstrapTable
        keyField={keyField}
        data={data}
        columns={columns}
        selectRow={selectRow}
        bordered={false}
        noDataIndication="空空如也 ~"
        pagination={pagination}
        filter={filterFactory()}
        sort={sortOption}
      />
      <label className="dataLength">共 {data.length} 筆</label>
    </>
  )
}

const sizePerPageRenderer = ({
  options,
  currSizePerPage,
  onSizePerPageChange,
}) => (
  <div className="btn-group" role="group">
    {options.map((option) => {
      const isSelect = currSizePerPage === `${option.page}`
      return (
        <button
          key={option.text}
          type="button"
          onClick={() => onSizePerPageChange(option.page)}
          className={`btn ${isSelect ? "selected" : ""}`}
        >
          {option.text}
        </button>
      )
    })}
  </div>
)

export default TableWithFilterByCol