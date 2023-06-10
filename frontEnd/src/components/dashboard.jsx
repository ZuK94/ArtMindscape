import { useEffect, useState } from "react";
import { showUsers } from "../services/userServices";
import PageHeader from "./common/pageHeader";
import TableRowForm from "./tableRowForm";
import { toast } from "react-toastify";

const Dashboard = () => {
  // State variables
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch users data
    const getUsers = async () => {
      try {
        const response = await showUsers();

        // Numbering every user for list table purposes
        let i = 1;
        response.data.forEach((u) => {
          u["num"] = i;
          i++;
        });

        setUsers(response.data);
      } catch (error) {
        // Display an error toast if an error occurs during fetching
        toast.error("An error has occurred", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };

    getUsers();
  }, []);

  // Handle search input
  const handleChange = (e) => {
    let searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
  };

  // Parameters for the PageHeader component
  const headerParams = {
    header: "Dashboard",
    pTextDirection: "text-center",
    paragraph: <>Dashboard page</>,
  };

  // Define role selector options
  const roleOptions = [
    { label: "viewer", value: "viewer" },
    { label: "editor", value: "editor" },
    { label: "web admin", value: "web-admin" },
  ];

  return (
    <>
      <section className="py-5 text-center container">
        <PageHeader params={headerParams} />

        {users && users.length >= 1 ? (
          <>
            {/* Search form */}
            <form>
              <div className="input-group mb-3">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search by name or email"
                  aria-label="table search"
                  aria-describedby="search-bar"
                  onChange={handleChange}
                />
              </div>
            </form>

            {/* Users table */}
            <div className="table-responsive">
              <table className="table table-striped table-sm">
                <thead>
                  <tr>
                    <th style={{ width: "5%" }} scope="col">
                      #
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th style={{ width: "25%" }} scope="col">
                      Role select
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter((u) => {
                      return search === ""
                        ? u
                        : u.name.toLowerCase().includes(search) ||
                            u.email.toLowerCase().includes(search);
                    })
                    .map((u, index) => {
                      return (
                        <TableRowForm
                          key={index}
                          user={u}
                          selectOptions={roleOptions}
                        />
                      );
                    })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          // Display a message if no users are found
          <p>No users found in the database</p>
        )}
      </section>
    </>
  );
};

export default Dashboard;
