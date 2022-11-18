import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/posts">Hacker News</Link>
            </div>
        </nav>
    );
};

export default Navbar;