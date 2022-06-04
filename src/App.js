import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import _ from 'lodash';
import moment from 'moment';

function App() {

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  // process CSV data
  const processData = dataString => {

    const dataStringLines = dataString.split(/\r\n|\n/);
    const rows = [];

    for (let i = 0; i < dataStringLines.length; i++) {
      const row = dataStringLines[i]
      const rowData = row.split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

      if (rowData.length !== 4) {
        throw new Error("Expected csv with 4 colums per row. Invalid data.")
      }

      rows.push(rowData);
    }

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = rows[i];
      for (let j = 0; j < row.length; j++) {

        let d = row[j];
        row[j] = /"?(.+)"?/.exec(d)[1];
      }


      const [employeeId, projectId, dateFrom, dateTo] = row;

      const obj = {
        employeeId,
        projectId,
        dateFrom,
        dateTo
      };

      list.push(obj);
    }

    const sortedList = list.sort(function (a, b) {
      return a.projectId - b.projectId;
    });

    let commonProjects = [];

    const projectIds = _.uniq(sortedList.map(value => value.projectId));

    for (let projectID of projectIds) {
      const records = sortedList.filter(value => value.projectId === projectID);
      if (records.length !== 2) continue;

      const employeeIds = records.map(value => value.employeeId);
      const dateFrom = _.min(records.map(value => moment(value.dateFrom)));
      const dateTo = _.max(records.map(value => moment(value.dateTo === 'NULL' ? moment(Date.now()) : moment(value.dateTo))));
      const daysSpent = dateTo.diff(dateFrom, 'days');

      commonProjects.push({
        employeeID1: employeeIds[0],
        employeeID2: employeeIds[1],
        daysSpent,
        projectID
      })
    }

    const headers = Object.keys(commonProjects[0]);

    const columns = headers.map(c => ({
      name: c,
      selector: c,
    }));

    setData(commonProjects);
    setColumns(columns);
  }

  // handle file upload
  const handleFileUpload = e => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      processData(bstr);
    };
    reader.readAsBinaryString(file);
  }

  return (
    <div>
      <h3>Read CSV file</h3>
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileUpload}
      />
      <DataTable
        pagination
        highlightOnHover
        columns={columns}
        data={data}
      />
    </div>
  );
}

export default App;
