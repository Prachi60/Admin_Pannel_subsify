

import { AiOutlineAppstore } from "react-icons/ai";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { RiGhostSmileLine } from "react-icons/ri";
import { FaWpforms } from "react-icons/fa6";
import { BsTable } from "react-icons/bs";
import { SlDocs } from "react-icons/sl";
import { Link } from "react-router-dom";


const Sidebar = () => {
  const menuItems = [
    {
      id: "dashboard",
      icon: <AiOutlineAppstore className="me-2" />,
      label: "Dashboard",
      links: [{ to: "dashboard", label: "Dashboard" }],
    },
    {
      id: "category",
      icon: <RiGhostSmileLine className="me-2" />,
      label: "Category",
      links: [
        { to: "/admin/managecategory", label: "Manage Your Category" },
        { to: "/admin/getcategory", label: "Get all Category" },
      ],
    },
    {
      id: "products",
      icon: <FaWpforms className="me-2" />,
      label: "Products",
      links: [
        { to: "productlist", label: "Product List" },
        { to: "manageproduct", label: "Manage Your Products" },
      ],
    },
    {
      id: "store",
      icon: <BsTable className="me-2" />,
      label: "Store",
      links: [{ to: "registerstore", label: "Register Store" }],
    },
    {
      id: "orders",
      icon: <SlDocs className="me-2" />,
      label: "Orders",
      links: [
        { to: "order", label: "All orders" },
        { to: "deliverypartner", label: "Assign Delivery Partner" },
      ],
    },
    {
      id: "deliveryPartner",
      icon: <MdOutlineHeadsetMic className="me-2" />,
      label: "Delivery Partner",
      links: [{ to: "managedeliverypartner", label: "Manage your partner" }],
    },
  ];


  const AccordionItem = ({ item, parentId }) => (
    <div className="accordion-item bg-transparent border-0">
      <h2 className="accordion-header" id={`heading${item.id}`}>
        <button
          className="accordion-button bg-transparent shadow-none collapsed p-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${item.id}`}
          aria-expanded="false"
          aria-controls={`collapse${item.id}`}
        >
          {item.icon}
          <span className="fs-5">{item.label}</span>
        </button>
      </h2>
      <div
        id={`collapse${item.id}`}
        className="accordion-collapse collapse"
        aria-labelledby={`heading${item.id}`}
        data-bs-parent={`#${parentId}`}
      >
        <div className="accordion-body ps-4 py-2">
          <ul className="list-unstyled m-0">
            {item.links.map((link, index) => (
              <li key={index} className="py-1">
                <Link
                  to={link.to}
                  className="text-decoration-none text-dark d-block p-1"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid p-0 w-100 sidebar_section">
      
      <div className="row g-0 w-100">
        <div
          className="col-lg-3 col-xl-2 bg-white vh-100 d-none d-lg-block border-end  w-100"
          style={{ overflowY: "auto" }}
        >
          <div className="p-3">
            <div className="side_menu">
              <span className="text-muted mt-4 mb-3 d-block fs-5">MENU</span>
            </div>
            <div className="accordion" id="sidebarAccordion">
              {menuItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  parentId="sidebarAccordion"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-start d-lg-none mt-5"
        id="mobileSidebar"
      >
        <div className="offcanvas-header flex-column align-items-start">
         
          <div className="side_menu w-100">
            <span className="text-muted d-block mt-2 fs-6">MENU</span>
          </div>
        </div>
        <div className="offcanvas-body p-0 sidebar_section">
          <div className="accordion" id="mobileAccordion">
            {menuItems.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                parentId="mobileAccordion"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
