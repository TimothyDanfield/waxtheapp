import React, { useState } from "react";
import { Table, Button, Popconfirm, Row, Col, Upload } from "antd";
import { TiUploadOutline } from "react-icons/ti";
import { ExcelRenderer, OutTable } from "react-excel-renderer";
import './Excel.css'

function ExcelUploader() {
  const [data, setData] = useState({
    cols: [],
    rows: []
  });

  let rows

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    ExcelRenderer(file, (err, resp) => {
      if (err) {
        console.error(err);
      } else {
        setData({
          ...data, cols: resp.cols, rows: resp.rows.filter((row, index) => {
            return row.length !== 0
          })
        });
        localStorage.setItem("Products", JSON.stringify(resp.rows.filter((row, index) => {
          return index !== 0 && row.length !== 0
        })))
      }
    });
  };

  const components = {
    body: {
      row: data.row,
    }
  }

  return (
    <div>
      <label for="file-upload" className="custom-file-upload">
        <TiUploadOutline onChange={handleFileUpload} /> Click to Upload Excel File
      </label>
      <input type="file" id="file-upload" onChange={handleFileUpload} />
      <OutTable data={data.rows} columns={data.cols} tableClassName="excel-products" tableHeaderRowClass="heading" />
    </div>
  );
}

export default ExcelUploader;
