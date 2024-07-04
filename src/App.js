
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {RoutesManagerAzienda} from "./Azienda/RoutesManagerAzienda";
import "bootstrap/dist/css/bootstrap.min.css";
import {MainRoutesManager} from "./MainRoutesManager";
function App() {
  return (<>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<MainRoutesManager/>}/>

          </Routes>

        </BrowserRouter>
      </>

  );
}

export default App;
