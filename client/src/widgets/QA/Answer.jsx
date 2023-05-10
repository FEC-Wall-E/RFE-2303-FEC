import React, {useState, useEffect} from "react";
import axios from 'axios';

function Answer ({answer}) {

  let answerDate = new Date(answer.date);
  const months = ["January","February","March","April","May","June","July",
  "August","September","October","November","December"];

  return(
    <div>
      <div>
        A: {answer.body}
      </div>
      <div>
        by {answer.answerer_name}, {months[answerDate.getMonth()]} {answerDate.getDate()}, {answerDate.getFullYear()} |
        Helpful? Yes{`(${answer.helpfulness})`} |
        Report
      </div>
      <div>
        {answer.photos.map((picture, index) => {
          return (<img src={picture} height="50px" key={index}></img>)
        })}
      </div>
    </div>
  );
}

export default Answer;