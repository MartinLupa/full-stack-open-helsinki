import { Content } from "./components/Content";
import { Header } from "./components/Header";
import { Total } from "./components/Total";

const App = () => {
  const course = "Half Stack application development";

  let parts = {
    part1: "Fundamentals of React",
    part2: "Usingprops to pass data",
    part3: "Stateof a component",
  };

  let exercises = {
    exercises1: 10,
    exercises2: 7,
    exercises3: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  );
};

export default App;
