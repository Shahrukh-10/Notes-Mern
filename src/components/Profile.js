import React from "react";

export const profile = (props) => {
  return (
    <div>
      <table class="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">User Details</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">#</th>
            <td>{localStorage.getItem("name")}</td>
            <td>{localStorage.getItem("email")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default profile;
