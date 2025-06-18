import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { MdAdd } from "react-icons/md";
import Table from "./Table";

type Person = {
  name: string;
  position: string;
  age: number;
  salary: number;
  office: number;
  startDate: string;
  image: string;
  actions: string;
};

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>age</span>,
  }),
  columnHelper.accessor("position", {
    header: () => <span>Position</span>,
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("office", {
    header: () => <span>Office</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("startDate", {
    header: () => <span>Start Date</span>,
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor("actions", {
    header: () => <span>Actions</span>,
    cell: () => (
      <div className="flex items-center gap-2">
        <button className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
          <LuPencil size={18} />
        </button>
        <button className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500">
          <LuTrash2 size={18} />
        </button>
      </div>
    ),
  }),
];

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/employees");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-5 py-4 sm:px-6 sm:py-5">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            Employee List
          </h3>
        </div>
        <div className="border-t border-gray-100 p-5 dark:border-gray-800 sm:p-6">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="mb-4 flex flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="text-gray-500 dark:text-gray-400"> Show </span>
                <div className="relative z-20 bg-transparent">
                  <select className="dark:bg-dark-900 h-9 w-full appearance-none rounded-lg border border-gray-300 bg-transparent bg-none py-2 pl-3 pr-8 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                    <option
                      value="10"
                      className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                    >
                      10
                    </option>
                    <option
                      value="8"
                      className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                    >
                      8
                    </option>
                    <option
                      value="5"
                      className="text-gray-500 dark:bg-gray-900 dark:text-gray-400"
                    >
                      5
                    </option>
                  </select>
                  <span className="absolute right-2 top-1/2 z-30 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    <svg
                      className="stroke-current"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.8335 5.9165L8.00016 10.0832L12.1668 5.9165"
                        stroke=""
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">
                  entries
                </span>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative">
                  <button className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z"
                        fill=""
                      ></path>
                    </svg>
                  </button>

                  <input
                    type="text"
                    x-model="search"
                    placeholder="Search..."
                    className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pl-11 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[300px]"
                  />
                </div>

                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-[11px] text-sm font-medium text-gray-700 shadow-theme-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 sm:w-auto">
                  <MdAdd size={20} />
                  Add New Employee
                </button>
              </div>
            </div>

            <Table data={employees} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeTable;
