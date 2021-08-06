import { Table } from "react-bootstrap";
const UserTable = ({ userDetails }) => {
  const { name, email, phone } = userDetails;
  return (
    <div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{name}</td>
            <td>{phone}</td>
            <td>{email}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
