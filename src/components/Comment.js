import React, { Component } from "react";
import axios from "axios";
import "./Comment.css";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sadrzaj: "", // Sadržaj komentara
      datum: "", // Datum kada je komentar spremljen
    };
    this.voditeljId = 1; // Fiksni voditelj ID
    this.korisnikId = localStorage.getItem("id"); // Dohvaćanje korisnik ID iz localStorage-a
  }

  // Funkcija za promjenu state-a kod unosa komentara
  handleCommentChange = (e) => {
    this.setState({ sadrzaj: e.target.value });
  };

  // Funkcija za slanje komentara na backend
  handleSaveComment = () => {
    const trenutniDatum = new Date().toISOString().split('T')[0]; // Dohvat trenutnog datuma u formatu "YYYY-MM-DD"
    this.setState({ datum: trenutniDatum }, () => {
      const noviKomentar = {
        korisnikId: this.korisnikId,
        voditeljId: this.voditeljId,
        sadrzaj: this.state.sadrzaj,
        datum: this.state.datum,
      };

      // Prikaz podataka u konzoli prije slanja
      console.log("Podaci koji se šalju na backend:", noviKomentar);

      axios
        .post(`/api/komentar`, noviKomentar) // API poziv
        .then((res) => {
          console.log("Komentar uspješno spremljen:", res.data);
          // Resetiraj polje nakon uspješnog slanja
          this.setState({ sadrzaj: "" });
        })
        .catch((err) => {
          console.error("Greška prilikom spremanja komentara:", err);
        });
    });
  };

  render() {
    return (
      <div className="comments">
        <div className="comments-section">
          <h3>Komentari</h3>
          <textarea
            placeholder="Unesite komentar"
            value={this.state.sadrzaj} // Povezivanje textarea s state-om
            onChange={this.handleCommentChange} // Praćenje promjena unosa
            rows="5"
          />
          <br />
          <button
            className="save-button"
            onClick={this.handleSaveComment} // Povezivanje gumba sa slanjem komentara
          >
            Spremi komentar
          </button>
        </div>
      </div>
    );
  }
}

export default Comment;
