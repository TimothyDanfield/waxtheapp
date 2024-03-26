import React, { useState } from "react";
import ExcelRenderer from "react-excel-renderer";

function ExcelUploader() {
  const [rows, setRows] = useState([]);
  const [cols, setCols] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    ExcelRenderer(file, (err, resp) => {
      if (err) {
        console.error(err);
      } else {
        setCols(resp.cols);
        setRows(resp.rows);
      }
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <table>
        <thead>
          <tr>
            {cols.map((col, index) => (
              <th key={index}>{col.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExcelUploader;
