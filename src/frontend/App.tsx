import "./helpers/editorConfig";
import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom"
import Lesson from "./Lesson"
import Exercise from "./Exercise"
import Book from './Book';
import Chapter from './Chapter';
import './i18n';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Book />} />
        <Route path="/chapters/:chapterId" element={<Chapter />} />
        {/* <Route path="/chapters/:chapterId/appendix" element={<Appendix />} /> */}
        <Route path="/lessons/:lessonId" element={<Lesson />} />
        <Route path="/lessons/:lessonId/exercises/:exerciseId" element={<Exercise />} />
        {/* <Route path="/faqs" element={<Faqs />} /> */}
      </Routes>
    </HashRouter>
  );
}
export default App;
