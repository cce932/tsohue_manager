export const getMeunName = (allPaths, nowAt) => {
  return Object.keys(allPaths).find((path) => allPaths[path] === nowAt)
}

export const extractErrMsg = (error) => {
  const message =
    (error.response && error.response.data) || // data 內有 status, message, debugMessage, timestamp
    error.message || // Request failed with status code 401
    error.toString() // Error: Request failed with status code 401

  console.error("extractErrMsg", message)
  return message
}

export const countSelectedId = (rows, isSelect, selectedList) => {
  rows.map((row) => {
    isSelect
      ? selectedList.push(row.id)
      : selectedList.splice(selectedList.indexOf(rows.id), 1)
  })

  return selectedList
}

const keylist = "abcdefghijklmnopqrstuvwxyz123456789"

export const generatePwd = (length = 8) => {
  let temp = ""
  for (let i = 0; i < length; i++)
    temp += keylist.charAt(Math.floor(Math.random() * keylist.length))
  return temp
}
