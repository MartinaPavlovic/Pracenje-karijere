import React, { Component } from "react";
import "./CommentsList.css";
import axios from "axios";

export default class CommentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsData: [], // Država za spremanje komentara
    };
    this.korisnikId = 3; // ID korisnika za API poziv
  }

  componentDidMount() {
    console.log("Fetching comments data...");
    axios
      .get(`/api/komentar/korisnik/${this.korisnikId}`) // API poziv za komentare
      .then((res) => {
        console.log("API Response (commentsData):", res.data);
        this.setState({ commentsData: res.data }); // Spremanje podataka u state
      })
      .catch((err) => {
        console.error("Error fetching commentsData:", err);
      });
  }

  render() {
    const { commentsData } = this.state;

    return (
      <div className="commentsContainer">
        {commentsData.length > 0 ? (
          commentsData.map((comment, index) => (
            <div key={index} className="commentBox">
              <div className="commentDate">{comment.datum.substring(8,10)}-{comment.datum.substring(5,8)}{comment.datum.substring(0,4)}</div>
              <div className="commentText">{comment.sadrzaj}</div>
            </div>
          ))
        ) : (
          <p>Nema dostupnih komentara.</p> // Poruka za slučaj da nema komentara
        )}
      </div>
    );
  }
}
