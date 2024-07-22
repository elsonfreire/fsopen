import { useState } from "react";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
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
  let total = 0;

  const createParts = () => {
    return course.parts.map((part) => {
      total += part.exercises;
      return <Part key={part.id} part={part} />;
    });
  };

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
