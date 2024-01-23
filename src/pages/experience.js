import { Colors, Gradients } from "../styles/colors";
import { Component } from "react";
import JobSection from "../components/jobSection";

let experiencePageStyle = {
  backgroundColor: Colors.dark,
  height: "80vh",
  width: "100vw",
  backgroundSize: "cover",
  textAlign: "center",
  display: "grid",
  padding: "10vh 0",
};

const ExperiencePage = () => (
  <div style={experiencePageStyle}>
    <JobSection
      title="Unity Technologies"
      skills={["C++", "C#", "Unity", "Windows", "Xbox"]}
    />
    <JobSection
      title="C Software"
      skills={["Kotlin", "C#", "Android", "WPF", "Web (Server)"]}
    />
    <JobSection
      title="Rift Technologies"
      skills={[
        "Java",
        "PHP",
        "C",
        "JS",
        "Android",
        "Atmel",
        "Web (Client)",
        "Web (Server)",
      ]}
    />
  </div>
);

export default ExperiencePage;
