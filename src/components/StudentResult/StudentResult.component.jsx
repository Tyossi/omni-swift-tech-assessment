import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReactComponent as SchoolLogo } from "../../assets/school-logo.svg";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./studentResult.styles.css";

const StudentResult = React.forwardRef((props, ref) => {
  const [studentResult, setStudentResult] = useState();

  const param = useParams();

  const id = param.id;

  const fetchDataOnLoad = () => {
    axios
      .post(`https://testapiomniswift.herokuapp.com/api/viewResult/${id}`)
      .then((res) => setStudentResult(res.data.data));
  };

  useEffect(() => {
    fetchDataOnLoad();
  }, []);

  return (
    <div className="studentResult__container" ref={ref}>
      <div className="student__result--content">
        <span className="result__heading--details">
          <span className="logo__span">
            <SchoolLogo />
          </span>
          <span className="result__heading--texts">
            <h3 className="result__heading--school">
              FREMOUNT COLLEGE EDUCATION
            </h3>
            <p className="heading__school__address">
              No.5 Raymond Osuman Street, PMB 2191 Maitama, Abuja, Nigeria.
            </p>
            <h1 className="heading__degree">
              Post Graduate Diploma in Education
            </h1>
            <p className="heading__semester">
              Student First Semester Statement Of Result
            </p>
          </span>
          <span className="heading__student--image">
            <img
              src={require("../../assets/Passport.png")}
              alt="student__passport"
            />
          </span>
        </span>
        <span className="student__details--span">
          <span className="name__and__reg--span">
            <span className="name__span">
              <p className="name__label">Name:</p>
              <p className="name">
                {studentResult?.firstname} {studentResult?.surname}
              </p>
            </span>
            <span className="reg__number">
              {" "}
              <p className="reg__number--label">REG No:</p>{" "}
              <p className="number">{studentResult?.reg_no}</p>{" "}
            </span>
          </span>
          <span className="level__and__session--span">
            <span className="level__span">
              <p className="level__label">Level:</p>
              <p className="level">{studentResult?.level}</p>
            </span>
            <span className="session__span">
              {" "}
              <p className="session__label">Session</p>{" "}
              <p className="session">{studentResult?.session} Session</p>{" "}
            </span>
          </span>
        </span>
        <table className="result__table">
          <thead>
            <tr>
              <th>S/N</th>
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Unit</th>
              <th>Grade</th>
              <th>Total Point</th>
            </tr>
          </thead>
          <tbody>
            {studentResult &&
              studentResult.result.map((result, index) => (
                <tr key={uuidv4()}>
                  <td>{index + 1}</td>
                  <td>{result.coursecode}</td>
                  <td>{result.title}</td>
                  <td>{result.unit}</td>
                  <td>{result.grade}</td>
                  <td>{result.total_point}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <table className="units__table">
          <thead>
            <tr>
              <th>UNTS</th>
              <th>UNTD</th>
              <th>GPTS</th>
              <th>GPTD</th>
              <th>GPATS</th>
              <th>GPATD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{studentResult?.cummulative.unts}</td>
              <td>{studentResult?.cummulative.untd}</td>
              <td>{studentResult?.cummulative.gpts}</td>
              <td>{studentResult?.cummulative.gptd}</td>
              <td>{studentResult?.cummulative.gpats}</td>
              <td>{studentResult?.cummulative.gpatd}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <p className="remarks">
          Remarks:{" "}
          <span style={{ color: "#0D7590", fontWeight: "500" }}>
            {studentResult?.cummulative.remarks}
          </span>
        </p>
        <p className="signature">_________________</p>
        <p className="signatory">Registrar</p>
      </div>
    </div>
  );
});

export default StudentResult;
