import React, { Component } from "react";
import "./EmployeeDetails.css";
import axios from "axios";

export default class EmployeeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalInfo: null,
      coreSkills: [],
      additionalSkills: [],
      certifications: [],
    };
    this.id = localStorage.getItem("id");
    console.log(this.id);
  }

  componentDidMount() {
  console.log("Fetching personalInfo...");
  axios
    .get(`/api/korisnik/${this.id}`)
    .then((res) => {
      console.log("API Response (personalInfo):", res.data);
      this.setState({ personalInfo: res.data });
    })
    .catch((err) => {
      console.error("Error fetching personalInfo:", err);
    });

  console.log("Fetching coreSkills...");
  axios
    .get(`/api/korisnik-vjestina/${this.id}/temeljne`)
    .then((res) => {
      console.log("API Response (coreSkills):", res.data);
      this.setState({ coreSkills: res.data });
    })
    .catch((err) => {
      console.error("Error fetching coreSkills:", err);
    });

    axios
    .get(`/api/korisnik-vjestina/${this.id}/dodatne`)
    .then((res) => {
      console.log("API Response (additionalSkills):", res.data);
      this.setState({ additionalSkills: res.data });
    })
    .catch((err) => {
      console.error("Error fetching additionalSkills:", err);
    });

    axios
    .get(`/api/korisnik-tecaj/${this.id}`)
    .then((res) => {
      console.log("API Response (certifications):", res.data);
      this.setState({ certifications: res.data });
    })
    .catch((err) => {
      console.error("Error fetching certifications:", err);
    });
}
  
  render() {
    const { personalInfo, coreSkills, additionalSkills, certifications } = this.state;

    if (!personalInfo) {
      return <div>Loading...</div>;
    }

    return (
      <div className="details">
        <div className="nameText">{personalInfo.ime} {personalInfo.prezime}</div>
        <hr className="hr1" />
        <div className="details-box-container">
          <div className="details-box">
            <h3>Osobni podaci</h3>
            <p>Datum rođenja: {personalInfo.datumRodenja.substring(8,10)}-{personalInfo.datumRodenja.substring(5,8)}{personalInfo.datumRodenja.substring(0,4)}</p>
            <p>Email: {personalInfo.email}</p>
            <p>Telefon: {personalInfo.brojTelefona}</p>
          </div>
          <div className="details-box">
            <h3>Temeljne vještine</h3>
            <ul>
              {coreSkills
                .filter((skill) => skill.ocjena > 0) // Filtriraj samo vještine s ocjenom > 0
                .map((skill) => (
                  <li key={skill.id}>
                    {skill.nazivVjestine}
                    {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"}
                    {skill.ocjena}
                  </li>
                ))}
            </ul>
          </div>
          <div className="details-box">
            <h3>Dodatne vještine</h3>
            <ul>
              {additionalSkills.map((skill, index) => (
                <li key={index}>{skill.nazivVjestine}</li>
              ))}
            </ul>
          </div>
          <div className="details-box">
            <h3>Vještine i certifikati</h3>
            <ul>
              {certifications.map((certification, index) => (
                <li key={index}>{certification.tecaj.naziv}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
