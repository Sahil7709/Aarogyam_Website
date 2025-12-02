import React from "react";

export default function CardTable({ color = "light" }) {
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-blueGray-700 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Card Tables
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Project
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Budget
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Status
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Users
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                >
                  Completion
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-600 text-blueGray-200 border-blueGray-500")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 rounded-full bg-blueGray-100 border border-blueGray-200">
                      <img
                        alt="..."
                        className="w-full rounded-full"
                        src={require("assets/img/bootstrap.jpg").default}
                      />
                    </div>
                    <span className="ml-3 font-bold text-blueGray-600">
                      Argon Design System
                    </span>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  $2,500 USD
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-orange-500 mr-2"></i> pending
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex">
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                      src={require("assets/img/team-1-800x800.jpg").default}
                    />
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      src={require("assets/img/team-2-800x800.jpg").default}
                    />
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      src={require("assets/img/team-3-800x800.jpg").default}
                    />
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      src={require("assets/img/team-4-470x470.png").default}
                    />
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2">60%</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                        <div
                          style={{ width: "60%" }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  <a
                    className="text-blueGray-500 py-1 px-3"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fas fa-ellipsis-v"></i>
                  </a>
                  <div className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 right-0">
                    <a
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </a>
                    <a
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </a>
                    <a
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else here
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 rounded-full bg-blueGray-100 border border-blueGray-200">
                      <img
                        alt="..."
                        className="w-full rounded-full"
                        src={require("assets/img/angular.jpg").default}
                      />
                    </div>
                    <span className="ml-3 font-bold text-blueGray-600">
                      Angular Now UI Kit PRO
                    </span>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  $1,800 USD
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-green-500 mr-2"></i> completed
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex">
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                      src={require("assets/img/team-1-800x800.jpg").default}
                    />
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      src={require("assets/img/team-2-800x800.jpg").default}
                    />
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      src={require("assets/img/team-3-800x800.jpg").default}
                    />
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      src={require("assets/img/team-4-470x470.png").default}
                    />
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2">100%</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-green-200">
                        <div
                          style={{ width: "100%" }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  <a
                    className="text-blueGray-500 py-1 px-3"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fas fa-ellipsis-v"></i>
                  </a>
                  <div className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 right-0">
                    <a
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </a>
                    <a
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </a>
                    <a
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else here
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 rounded-full bg-blueGray-100 border border-blueGray-200">
                      <img
                        alt="..."
                        className="w-full rounded-full"
                        src={require("assets/img/sketch.jpg").default}
                      />
                    </div>
                    <span className="ml-3 font-bold text-blueGray-600">
                      Black Dashboard Sketch
                    </span>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  $3,150 USD
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-red-500 mr-2"></i> delayed
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex">
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                      src={require("assets/img/team-1-800x800.jpg").default}
                    />
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      src={require("assets/img/team-2-800x800.jpg").default}
                    />
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      src={require("assets/img/team-3-800x800.jpg").default}
                    />
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      src={require("assets/img/team-4-470x470.png").default}
                    />
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2">73%</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                        <div
                          style={{ width: "73%" }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  <a
                    className="text-blueGray-500 py-1 px-3"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fas fa-ellipsis-v"></i>
                  </a>
                  <div className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 right-0">
                    <a
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </a>
                    <a
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </a>
                    <a
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else here
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 rounded-full bg-blueGray-100 border border-blueGray-200">
                      <img
                        alt="..."
                        className="w-full rounded-full"
                        src={require("assets/img/react.jpg").default}
                      />
                    </div>
                    <span className="ml-3 font-bold text-blueGray-600">
                      React Material Dashboard
                    </span>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  $4,400 USD
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-teal-500 mr-2"></i> on schedule
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex">
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                      src={require("assets/img/team-1-800x800.jpg").default}
                    />
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      src={require("assets/img/team-2-800x800.jpg").default}
                    />
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      src={require("assets/img/team-3-800x800.jpg").default}
                    />
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      src={require("assets/img/team-4-470x470.png").default}
                    />
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2">90%</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-teal-200">
                        <div
                          style={{ width: "90%" }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  <a
                    className="text-blueGray-500 py-1 px-3"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fas fa-ellipsis-v"></i>
                  </a>
                  <div className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 right-0">
                    <a
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </a>
                    <a
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </a>
                    <a
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else here
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <div className="relative w-10 h-10 rounded-full bg-blueGray-100 border border-blueGray-200">
                      <img
                        alt="..."
                        className="w-full rounded-full"
                        src={require("assets/img/vue.jpg").default}
                      />
                    </div>
                    <span className="ml-3 font-bold text-blueGray-600">
                      React Material Dashboard
                    </span>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  $2,200 USD
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-green-500 mr-2"></i> completed
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex">
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow"
                      src={require("assets/img/team-1-800x800.jpg").default}
                    />
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      src={require("assets/img/team-2-800x800.jpg").default}
                    />
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      src={require("assets/img/team-3-800x800.jpg").default}
                    />
                    <img
                      alt="..."
                      className="w-10 h-10 rounded-full border-2 border-blueGray-50 shadow -ml-4"
                      src={require("assets/img/team-4-470x470.png").default}
                    />
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2">100%</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-green-200">
                        <div
                          style={{ width: "100%" }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  <a
                    className="text-blueGray-500 py-1 px-3"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fas fa-ellipsis-v"></i>
                  </a>
                  <div className="hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 right-0">
                    <a
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Action
                    </a>
                    <a
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Another action
                    </a>
                    <a
                      className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                    >
                      Something else here
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}