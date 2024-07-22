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
  const createParts = () => {
    return course.parts.map((part) => {
      return <Part key={part.id} part={part} />;
    });
  };

  return createParts();
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
