const SideNav = ({ type, setType }) => {
  return (
    <nav
      id="side-nav"
      className="side-nav d-flex flex-md-row flex-lg-column col-lg-1 col-md-12"
    >
      <ul className="sidenav-nav col-12">
        <li className="sidenav-item col-md-4 col-lg-12">
          <a
            className="sidenav-link"
            id="generate"
            onClick={() => {
              setType("generate");
            }}
          >
            Text to Image
          </a>
        </li>
        <li className="sidenav-item col-md-4 col-lg-12">
          <a
            className="sidenav-link"
            id="variate"
            onClick={() => {
              setType("variate");
            }}
          >
            Variation
          </a>
        </li>
        <li className="sidenav-item col-md-4 col-lg-12">
          <a
            className="sidenav-link"
            id="edit"
            onClick={() => {
              setType("edit");
            }}
          >
            Edit
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
