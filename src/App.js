import { useRef } from "react";
import StudentDataTable from "./components/StudentDataTable/StudentData.component";
import StudentResult from "./components/StudentResult/StudentResult.component";
import { Routes, Route, useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

import "./App.css";

const App = () => {
  const location = useLocation();

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="App">
      <Routes location={location} key={location.key}>
        <Route
          path="/"
          element={<StudentDataTable handlePrint={handlePrint} />}
        />
        <Route
          path="/view-result/:id"
          element={<StudentResult ref={componentRef} />}
        />
      </Routes>
    </div>
  );
};

export default App;
