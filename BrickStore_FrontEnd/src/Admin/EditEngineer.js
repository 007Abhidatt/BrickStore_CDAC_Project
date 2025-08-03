import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";

function EditEngineer() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the vet ID from the URL

  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
      navigate("/customer");
    } else if (sessionStorage.getItem("userRole") === "ADMIN") {
      navigate("/admin");
    }
                else if (sessionStorage.getItem("userRole") === "ENGINEER") {
      navigate("/engineer");
    }
  }, [navigate]);

  const [doctorName, setDoctorName] = useState("");
  const [experience, setExperience] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const editUrl = `http://localhost:5050/admin/getVetById/${id}`;
  const updateUrl = `http://localhost:5050/admin/updateVet/${id}`;

  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
  };

  useEffect(() => {
    axios
      .get(editUrl, config)
      .then((response) => {
        const { doctorName, experience, clinicAddress, contactNumber } = response.data;
        setDoctorName(doctorName);
        setExperience(experience);
        setClinicAddress(clinicAddress);
        setContactNumber(contactNumber);
      })
      .catch((error) => {
        console.error("Error occurred while fetching vet details:", error);
        toast.error("Failed to fetch vet details.");
      });
  }, [editUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const vetUpdateDTO = { doctorName, experience, clinicAddress, contactNumber };

    axios
      .put(updateUrl, vetUpdateDTO, config)
      .then(() => {
        toast.success("Vet details updated successfully!");
        setTimeout(() => {
          navigate("/admin/viewvets");
        }, 2000); // 2-second delay to show toast
      })
      .catch((error) => {
        console.error("Failed to update vet details:", error);
        toast.error("Failed to update vet details.");
      });
  };

  return (
    <Admin>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="shadow-lg p-4"
          style={{
            width: "35rem",
            border: "1px solid black",
            color: "black",
            display: "flex",
            flexDirection: "column",
            border: "2px solid #f3d70b",
            backgroundColor: "#f4f4f9",
          }}
        >
          <h2 className="text-center mb-4">Edit Vet</h2>
          <form onSubmit={handleSubmit}>
            {/* Doctor Name */}
            <div className="mb-3">
              <label>Doctor Name:</label>
              <input
                type="text"
                className="form-control"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                style={{ height: "30px" }}
                required
              />
            </div>

            {/* Experience */}
            <div className="mb-3">
              <label>Year of Experience:</label>
              <input
                type="number"
                className="form-control"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                style={{ height: "30px" }}
                required
              />
            </div>

            {/* Clinic Address */}
            <div className="mb-3">
              <label>Clinic Address:</label>
              <textarea
                className="form-control"
                value={clinicAddress}
                onChange={(e) => setClinicAddress(e.target.value)}
                style={{ height: "60px" }}
                required
              />
            </div>

            {/* Contact Number */}
            <div className="mb-3">
              <label>Contact Number:</label>
              <input
                type="tel"
                className="form-control"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                style={{ height: "30px" }}
                pattern="[0-9]{10}"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn btn-light w-100"
                style={{ backgroundColor: "#f3d70b" }}
              >
                Edit Vet
              </button>
            </div>
          </form>
        </div>
      </div>
    </Admin>
  );
}

export default EditEngineer;
