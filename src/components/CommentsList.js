import React, { Component } from "react";
import "./CommentsList.css";
import axios from "axios";

export default class CommentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentsData: [],
    };
  }

  componentDidMount() {

    // kada promjenimo api pozive, korisniId vise nece trebati, vec samo token
    const korisnikId  = localStorage.getItem("korisnikId");
    if(!korisnikId) {
      console.error("User ID not available.");
      return;
    };
    
    console.log("Fetching comments data...");
    axios
      .get(`/api/komentar/korisnik/${korisnikId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      )
      .then((res) => {
        console.log("API Response (commentsData):", res.data);
        this.setState({ commentsData: res.data });
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
          <p>Nema dostupnih komentara.</p>
        )}
      </div>
    );
  }
}
