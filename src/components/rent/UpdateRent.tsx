import React, { useState, ChangeEvent } from "react";
import RentDataService from "../../services/RentService";
import IRentData from "../../types/Rent";

const UpdateRent: React.FC = () => {
  const initialRentState = {
    id: null,
    book_code: "",
    member_code: "",
    max_date: "",
    return_date: "",
    rent_date: "",
  };
  const [rent, setRent] = useState<IRentData>(initialRentState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRent({ ...rent, [name]: value });
  };

  const saveRent = () => {
    var data = {
        book_code: rent.book_code,
        member_code: rent.member_code,
        max_date: "",
        return_date: "",
        rent_date: "",
    };

    RentDataService.create(data)
      .then((response: any) => {
        setRent({
        book_code: rent.book_code,
        member_code: rent.member_code,
        max_date: rent.max_date,
        return_date:rent.return_date,
        rent_date: rent.rent_date,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newRent = () => {
    setRent(initialRentState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newRent}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="member_code">Member Code</label>
            <input
              type="text"
              className="form-control"
              id="member_code"
              required
              value={rent.member_code}
              onChange={handleInputChange}
              name="member_code"
            />
          </div>

          <div className="form-group">
            <label htmlFor="book_code">Book Code</label>
            <input
              type="text"
              className="form-control"
              id="book_code"
              required
              value={rent.book_code}
              onChange={handleInputChange}
              name="book_code"
            />
          </div>

          <button onClick={saveRent} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateRent;