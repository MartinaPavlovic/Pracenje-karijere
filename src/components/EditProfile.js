import React, { Component } from "react";
import "./EditProfile.css";
import axios from "axios";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personalInfo: null, // Inicijalno stanje za osobne podatke
      selectedSkills: [], // Odabrane vještine
      skillOptions: [],
      skillOptions2: [],
      newSkills: [], // Nove vještine
      certifications: [], // Certifikati
      dropdownSkill: "", // Trenutno odabrana vještina iz padajućeg izbornika
      skillRating: "", // Ocjena za vještinu
      newSkillInput: "", // Novi unos vještine
      newCertificationInput: "", // Novi unos certifikata
    };
    this.id = localStorage.getItem("id"); // Dohvaćanje korisničkog ID-a
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

    axios
      .get(`/api/korisnik-vjestina/${this.id}/nedostajuce`)
      .then((res) => {
        console.log("API Response (skillOptions):", res.data);
        this.setState({ skillOptions: res.data });
      })
      .catch((err) => {
        console.error("Error fetching skillOptions:", err);
      });

    axios
      .get(`/api/korisnik-vjestina/${this.id}/moguce-dodatne`)
      .then((res) => {
        console.log("API Response (skillOptions2):", res.data);
        this.setState({ skillOptions2: res.data });
      })
      .catch((err) => {
        console.error("Error fetching skillOptions2:", err);
      });
  }

  handleSavePersonalInfo = () => {
    const { personalInfo } = this.state;

    axios
      .put(`/api/korisnik/${this.id}`, personalInfo)
      .then((res) => {
        console.log("Osobni podaci uspješno ažurirani:", res.data);
        alert("Osobni podaci su uspješno spremljeni!");
      })
      .catch((err) => {
        console.error("Greška prilikom ažuriranja osobnih podataka:", err);
        alert("Došlo je do pogreške pri spremanju podataka.");
      });
  };

  handleAddSkill = () => {
    const { dropdownSkill, skillRating, skillOptions } = this.state;

    if (!dropdownSkill || !skillRating) {
      alert("Molimo odaberite vještinu i unesite ocjenu.");
      return;
    }

    const selectedSkill = skillOptions.find(
      (skill) => skill.vjestina.naziv === dropdownSkill
    );

    if (selectedSkill) {
      axios
        .post(`/api/korisnik-vjestina/ocijeni/${this.id}`, {
          ocjena: skillRating,
          vjestinaId: selectedSkill.vjestina.id,
        })
        .then((res) => {
          console.log("Temeljna vještina uspješno spremljena:", res.data);
          alert("Temeljna vještina je uspješno spremljena!");
        })
        .catch((err) => {
          console.error("Greška prilikom spremanja temeljne vještine:", err);
          alert("Došlo je do pogreške pri spremanju vještine.");
        });
    }
  };

  handleAddNewSkill = () => {
    const { dropdownSkill, skillRating, skillOptions2 } = this.state;

    if (!dropdownSkill || !skillRating) {
      alert("Molimo odaberite vještinu i unesite ocjenu.");
      return;
    }

    const selectedSkill = skillOptions2.find(
      (skill) => skill.naziv === dropdownSkill
    );

    if (selectedSkill) {
      axios
        .post(`/api/korisnik-vjestina/ocijeni/${this.id}`, {
          ocjena: skillRating,
          vjestinaId: selectedSkill.id,
        })
        .then((res) => {
          console.log("Dodatna vještina uspješno spremljena:", res.data);
          alert("Dodatna vještina je uspješno spremljena!");
        })
        .catch((err) => {
          console.error("Greška prilikom spremanja dodatne vještine:", err);
          alert("Došlo je do pogreške pri spremanju vještine.");
        });
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      personalInfo: {
        ...prevState.personalInfo,
        [name]: value,
      },
    }));
  };

  render() {
    const {
      personalInfo,
      selectedSkills,
      skillOptions,
      skillOptions2,
      certifications,
      dropdownSkill,
      skillRating,
      newCertificationInput,
    } = this.state;

    if (!personalInfo) {
      return <div>Učitavanje podataka...</div>;
    }

    return (
      <div className="details">
        <div className="nameText">
          {personalInfo.ime} {personalInfo.prezime}
        </div>
        <hr className="hr1" />
        <div className="details-box-container">
          {/* Osobni podaci */}
          <div className="details-box">
            <h3>Osobni podaci</h3>
            <label>
              <br />
              Ime i Prezime:
              <input
               style={{ fontSize:"1.3rem" }}
                type="text"
                name="ime"
                value={`${personalInfo?.ime || ""} ${personalInfo?.prezime || ""}`}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              <br />
              Datum rođenja:
              <input
               style={{ fontSize:"1.3rem" }}
                type="date"
                name="datumRodenja"
                value={personalInfo.datumRodenja || ""}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              <br />
              Email:
              <input
               style={{ fontSize:"1.3rem" }}
                type="email"
                name="email"
                value={personalInfo.email || ""}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              <br />
              Telefon:
              <input
               style={{ fontSize:"1.3rem" }}
                type="text"
                name="brojTelefona"
                value={personalInfo.brojTelefona || ""}
                onChange={this.handleInputChange}
              />
            </label>
            <br />
            <button onClick={this.handleSavePersonalInfo}>
              Spremi osobne podatke
            </button>
          </div>

          {/* Unos vještina */}
          <div className="details-box">
            <h3>Unos vještina</h3>
            <br />
            <select
              style={{ fontSize:"1.3rem" }}
              value={dropdownSkill}
              onChange={(e) => this.setState({ dropdownSkill: e.target.value })}
            >
              <option value="">Odaberite vještinu</option>
              {skillOptions.map((skill, index) => (
                <option key={index} value={skill.vjestina.naziv}>
                  {skill.vjestina.naziv}
                </option>
              ))}
            </select>
            <input
              style={{ width:"5vw" }}
              type="number"
              placeholder="Ocjena (1-3)"
              min="1"
              max="3"
              value={skillRating}
              onChange={(e) => this.setState({ skillRating: e.target.value })}
            />
            <br />
            <button onClick={this.handleAddSkill}>Spremi temeljnu vještinu</button>
          </div>

          {/* Unos novih vještina */}
          <div className="details-box">
            <h3>Unos novih vještina</h3>
            <br />
            <select
              style={{ fontSize:"1.3rem" }}
              value={dropdownSkill}
              onChange={(e) => this.setState({ dropdownSkill: e.target.value })}
            >
              <option value="">Odaberite vještinu</option>
              {skillOptions2.map((skill, index) => (
                <option key={index} value={skill.naziv}>
                  {skill.naziv}
                </option>
              ))}
            </select>
            <input
              style={{ width:"5vw" }}
              type="number"
              placeholder="Ocjena (1-3)"
              min="1"
              max="3"
              value={skillRating}
              onChange={(e) => this.setState({ skillRating: e.target.value })}
            />
            <br />
            <button onClick={this.handleAddNewSkill}>Spremi dodatnu vještinu</button>
          </div>

          {/* Unos certifikata */}
          <div className="details-box">
            <h3>Unos tečajeva i certifikata</h3>
            <ul>
              {certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
            <input
              style={{ fontSize:"1.3rem" }}
              type="text"
              placeholder="Unesite novi tečaj/certifikat"
              value={newCertificationInput}
              onChange={(e) =>
                this.setState({ newCertificationInput: e.target.value })
              }
            />
            <br />
            <button onClick={this.handleAddCertification}>Spremi certifikat</button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
