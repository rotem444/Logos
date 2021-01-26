import React, { useContext } from "react";
import { GiBookCover, GiTeacher, GiLogicGateAnd } from "react-icons/gi";
import { MdCreate } from "react-icons/md";
import { RiSearchEyeLine } from "react-icons/ri";
import { ImHome } from "react-icons/im";
import { Context } from "../App";
import "../utilize/logicFunc";

export default function About({ history }) {
  const {
    name,
    status,
    teacherEmail,
    dispatch,
    queryStr,
    ...state
  } = useContext(Context);
  return (
    <div className="container-fluid container-md">
      <h2 className="text-center">Hello {name} And Welcom To Logos</h2>
      <div
        className="mt-3 row justify-content-center"
        onClick={() => history.push("/help")}
      >
        <div className="col-12 col-md-6 btn btn-info d-flex">
          <p>
            this site is a logic taturial from learning natural deduction of
            propositional calculus. If you do not familiar whit the subject it
            is recommended that you read the guide first.
          </p>
          <div>
            <GiBookCover size="7rem" />
          </div>
        </div>
      </div>
      <div
        className="mt-3 row justify-content-center"
        onClick={() => history.push("/examples")}
      >
        <div className="col-12 col-md-6 btn btn-info d-flex">
          <div>
            <GiTeacher size="7rem" />
          </div>
          <p>
            After reading the guide, you can start implementing what you have
            learned and solving the examples on the site. Note: As long as you
            are not registered, your solution will not be saved in the system
          </p>
        </div>
      </div>
      {status === "guest" && (
        <div
          className="mt-3 row justify-content-center"
          onClick={() => history.push("/signin")}
        >
          <div className="col-12 col-md-6 btn btn-info d-flex">
            <p>
              You can register on the site as 'teacher' or 'student' of one of
              the teacher. the teachers can create exercises for her student.
              and
            </p>
            <div>
              <GiLogicGateAnd size="7rem" />
            </div>
          </div>
        </div>
      )}
      {status === "teacher" && (
        <>
          <div
            className="mt-3 row justify-content-center"
            onClick={() => history.push("/eding")}
          >
            <div className="col-12 col-md-6 btn btn-info d-flex">
              <p>
                You can add and modify your students' homework. Note: The system
                verifies that the formulas thet you inset are Well-formed and
                the profs are profable.
              </p>
              <div>
                <MdCreate size="7rem" />
              </div>
            </div>
          </div>
          <div
            className="mt-3 row justify-content-center"
            onClick={() => history.push("/tracking")}
          >
            <div className="col-12 col-md-6 btn btn-info d-flex">
              <div>
                <RiSearchEyeLine size="7rem" />
              </div>
              <p className="align-middle">
                You can keep track of your students and see what percentage of
                homework they have done.
              </p>
            </div>
          </div>
        </>
      )}
      {status === "student" && (
        <>
          <div
            className="mt-3 row justify-content-center"
            onClick={() => history.push("/homework")}
          >
            <div className="col-12 col-md-6 btn btn-info d-flex">
              <p>you can start do your homework by click here.</p>
              <div>
                <ImHome size="7rem" />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
