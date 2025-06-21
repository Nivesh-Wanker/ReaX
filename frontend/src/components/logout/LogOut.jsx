import { useEffect } from "react";
import { useAuth} from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/signin");
  }, [logout, navigate]);

  return null;
}

export default Logout;