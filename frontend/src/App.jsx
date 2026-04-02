import Login from "./pages/Login";
import MyRequestsPage from "./pages/MyRequestsPage";

function App() {
  const loginUser = localStorage.getItem("loginUser");

  return loginUser ? <MyRequestsPage /> : <Login />;
}

export default App;