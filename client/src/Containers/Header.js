import { Link, useNavigate } from "react-router-dom";

const admin = localStorage.getItem("admin");

function Header() {
    const navigate = useNavigate();
    return (
        <div className="header flex navbar fixed z-10 w-full bg-white">
            <div className="container center">
                <Link to='/'>
                    <img src="/TRANS FINAL (1).png" className="img" />
                </Link>
            </div>
            {admin && (
                <button
                    onClick={() => navigate("/orders")}
                    className="btn bg-green-300 h-fit my-auto mr-8"
                >
                    Orders
                </button>
            )}
        </div>
    );
}

export default Header;
