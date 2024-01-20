import React from "react"
import { useTable } from "react-table"
import "./index.scss"

export default function Table({ data, columns, className, firstFive }) {
  let innerColumns =
    columns ||
    Object.keys(data[0][0]).map(d => ({
      Header: d,
      accessor: d,
    }))

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: innerColumns,
      data: data[0],
    })

  const classString = className || "table-wrapper"
  // Render the UI for your table
  return (
    <table {...getTableProps()} className={classString}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows
          .map((row, i) => {
            if ((firstFive && i <= 4) || !firstFive) {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    const cellContent = cell.render("Cell")
                    return <td {...cell.getCellProps()}>{cellContent}</td>
                  })}
                </tr>
              )
            }
            {
              return null
            }
          })
          .filter(d => d)}
      </tbody>
    </table>
  )
}
