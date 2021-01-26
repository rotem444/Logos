import React, { useContext } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import { Context } from "../App";

export default function StudentsTracking() {
  const { students, homework } = useContext(Context);
  let len = _.sum(homework.map(_.size));

  return (
    <>
      <h2 className="m-4 text-info">Tracking</h2>
      <table className="table table-striped text-center text-info">
        <thead>
          <th scop="col">Name</th>
          <th scop="col">Email</th>
          <th scop="col">Completed</th>
          <th scop="col">%</th>
        </thead>
        <tbody>
          {students.map(([name, email, completed]) => {
            let percent = ((100 * (completed / len)) | 0) + "%";
            return (
              <tr key={email}>
                <th scop="row">{name}</th>
                <td>{email}</td>
                <td>
                  {completed}/{len}
                </td>
                <td>
                  <div
                    className="bg-danger text-dark"
                    style={{ borderRadius: "5em" }}
                  >
                    <div
                      className="bg-success"
                      style={{ width: percent, textIndent: "0.2em" }}
                    >
                      <b>{percent}</b>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
