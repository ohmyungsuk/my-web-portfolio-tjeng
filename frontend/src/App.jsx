import Login from "./pages/Login";
import RequestCreatePage from "./pages/RequestCreatePage";

function App() {
  const loginUser = localStorage.getItem("loginUser");

  return loginUser ? <RequestCreatePage /> : <Login />;
}

export default App;