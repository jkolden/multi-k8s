import React, { Fragment } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import Title from "./Title";

export default class SalariesBarChart extends React.Component {
  render() {
    function groupBy(collection, property) {
      let job,
        index,
        values = [];
      for (let i = 0; i < collection.length; i++) {
        job = collection[i][property];
        index = values.map(item => item.jobTitle).indexOf(job);
        if (index > -1) {
          //we found the job we are looking for
          //construct a new object:
          let newObj = {};
          newObj.jobTitle = job;
          newObj.salary = collection[i].sal + values[index].salary;
          values[index] = newObj; //add to results array
        } else {
          //not found
          let newObj = {}; //create new object for this job
          newObj.salary = collection[i].sal;
          newObj.jobTitle = job;
          values.push(newObj); //add to results array
        }
      }
      return values;
    }

    const newObj = groupBy(this.props.employees, "job").sort((a, b) =>
      a.sal > b.sal ? 1 : -1
    );

    return (
      <Fragment>
        <Title>Total Salaries by Job Title</Title>
        <BarChart
          width={800}
          height={200}
          data={newObj}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="jobTitle" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="salary" fill="#82ca9d" />
        </BarChart>
      </Fragment>
    );
  }
}
