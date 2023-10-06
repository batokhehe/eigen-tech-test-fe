import React, { useState, useEffect, ChangeEvent } from "react";
import RentDataService from "../../services/RentService";
import IRentData from "../../types/Rent";
import { Link } from "react-router-dom";

const RentsList: React.FC = () => {
  const [rents, setRents] = useState<Array<IRentData>>([]);
  const [currentRent, setCurrentRent] = useState<IRentData | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchBookCode, setSearchBookCode] = useState<string>("");

  useEffect(() => {
    retrieveRents();
  }, []);

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const searchBookCode = e.target.value;
    setSearchBookCode(searchBookCode);
  };

  const retrieveRents = () => {
    RentDataService.getAll()
      .then((response: any) => {
        setRents(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRents();
    setCurrentRent(null);
    setCurrentIndex(-1);
  };

  const setActiveRent = (rent: IRentData, index: number) => {
    setCurrentRent(rent);
    setCurrentIndex(index);
  };

  const removeAllRents = () => {
    RentDataService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    RentDataService.findByBookCode(searchBookCode)
      .then((response: any) => {
        setRents(response.data);
        setCurrentRent(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (<div className="list row">
  <div className="col-md-8">
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search by title"
        value={searchBookCode}
        onChange={onChangeSearchTitle}
      />
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={findByTitle}
        >
          Search
        </button>
      </div>
    </div>
  </div>
  <div className="col-md-6">
    <h4>Rents List</h4>

    <ul className="list-group">
      {rents &&
        rents.map((rent, index) => (
          <li
            className={
              "list-group-item " + (index === currentIndex ? "active" : "")
            }
            onClick={() => setActiveRent(rent, index)}
            key={index}
          >
            {rent.book_code}
          </li>
        ))}
    </ul>

    <button
      className="m-3 btn btn-sm btn-danger"
      onClick={removeAllRents}
    >
      Remove All
    </button>
  </div>
  <div className="col-md-6">
    {currentRent ? (
      <div>
        <h4>Rent</h4>
        <div>
          <label>
            <strong>Book Code:</strong>
          </label>{" "}
          {currentRent.book_code}
        </div>
        <div>
          <label>
            <strong>Member Code:</strong>
          </label>{" "}
          {currentRent.member_code}
        </div>
        <div>
          <label>
            <strong>Rent Date:</strong>
          </label>{" "}
          {currentRent.rent_date}
        </div>
        <div>
          <label>
            <strong>Return Date:</strong>
          </label>{" "}
          {currentRent.return_date}
        </div>

        <Link
          to={"/rent/" + currentRent.id}
          className="badge badge-warning"
        >
          Edit
        </Link>
      </div>
    ) : (
      <div>
        <br />
        <p>Please click on a Rent...</p>
      </div>
    )}
  </div>
</div>
)
};

export default RentsList;