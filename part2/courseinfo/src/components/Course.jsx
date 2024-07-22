import { useState } from "react";

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
};

const Part = ({ part }) => {
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  );
};

const Content = ({ course }) => {
  const createParts = () => {
    return course.parts.map((part) => {
      return <Part key={part.id} part={part} />;
    });
  };

  let total = course.parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);

  return (
    <>
      {createParts()}
      <p>
        <strong>total of {total} exercises</strong>
      </p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
    </>
  );
};

export default Course;
