import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Element } from "./screens/Element/Element";
import { TranslateLesson } from "./screens/TranslateLesson/TranslateLesson";
import { ResultScreen } from "./screens/ResultScreen/ResultScreen";
import { LessonComplete } from "./screens/LessonComplete/LessonComplete";

export default function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Element />} />
        <Route path="/lesson/translate" element={<TranslateLesson />} />
        <Route path="/lesson/result" element={<ResultScreen />} />
        <Route path="/lesson/complete" element={<LessonComplete />} />
      </Routes>
    </Router>
  );
}