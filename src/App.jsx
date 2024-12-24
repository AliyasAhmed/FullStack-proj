import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import MainContent from "./Components/MainContent";
import { Provider } from "react-redux";
import store from "./redux/store";
import ReactDOM from 'react-dom';


function App() {
  return (
    <Provider store={store}>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <Header />
          <MainContent />
        </div>
      </div>
      </Provider>
    
  );
}

export default App;
