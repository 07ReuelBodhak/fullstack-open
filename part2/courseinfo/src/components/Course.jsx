import Header from "./Header";
import Part from "./Part";
import Total from "./Total";

const Course = ({ course }) => {
  const total = course.parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);

  return (
    <div>
      <Header title={course.name} />
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <Total total={total} />
    </div>
  );
};

export default Course;
