"use client";
import React from "react";
import { useState, useEffect } from "react";
import { FaDatabase, FaShieldAlt, FaFileExcel, FaCode, FaSearch, FaSort, FaFilter, FaChartBar, FaUserShield, FaFileUpload, FaHistory } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Remove Prism type declaration
// declare global {
//   interface Window {
//     Prism?: {
//       highlightAll: () => void;
//     };
//   }
// }

// Simple syntax highlighter with a different approach
// const highlightCode = (code: string) => { ... };

const helperDocs = [
  {
    category: "Database Operations",
    icon: <FaDatabase className="h-6 w-6" />,
    functions: [
      {
        name: "execute_query",
        description: "Execute raw SQL queries with parameters",
        example: `execute_query(
  sql_query="SELECT * FROM users WHERE status = %s",
  params=['active'],
  db_alias='default'
)`,
        params: [
          { name: "sql_query", type: "str", desc: "SQL query to execute" },
          { name: "params", type: "tuple/list", desc: "Query parameters" },
          { name: "db_alias", type: "str", desc: "Database alias" }
        ]
      },
      {
        name: "insert_data",
        description: "Insert data into a table",
        example: `insert_data(
  table_name="users",
  data={"name": "John", "email": "john@example.com"},
  db_alias='default'
)`,
        params: [
          { name: "table_name", type: "str", desc: "Target table name" },
          { name: "data", type: "dict", desc: "Data to insert" },
          { name: "db_alias", type: "str", desc: "Database alias" }
        ]
      },
      {
        name: "get_data",
        description: "Read data from a table with filters",
        example: `get_data(
  table_name="users",
  filters={"status": "active"},
  search="john",
  search_columns=["name", "email"]
)`,
        params: [
          { name: "table_name", type: "str", desc: "Source table name" },
          { name: "filters", type: "dict", desc: "Filter conditions" },
          { name: "search", type: "str", desc: "Search keyword" },
          { name: "columns", type: "str/list", desc: "Columns to select" }
        ]
      },
      {
        name: "update_data",
        description: "Update data in a table",
        example: `update_data(
  table_name="users",
  data={"status": "inactive"},
  filters={"id": 123},
  db_alias='default'
)`,
        params: [
          { name: "table_name", type: "str", desc: "Target table name" },
          { name: "data", type: "dict", desc: "Data to update" },
          { name: "filters", type: "dict", desc: "Filter conditions" },
          { name: "db_alias", type: "str", desc: "Database alias" }
        ]
      },
      {
        name: "delete_data",
        description: "Delete data from a table",
        example: `delete_data(
  table_name="users",
  filters={"id": 123},
  db_alias='default'
)`,
        params: [
          { name: "table_name", type: "str", desc: "Target table name" },
          { name: "filters", type: "dict", desc: "Filter conditions" },
          { name: "db_alias", type: "str", desc: "Database alias" }
        ]
      },
      {
        name: "insert_get_id_data",
        description: "Insert data and return the inserted row's ID",
        example: `insert_get_id_data(
  table_name="users",
  data={"name": "John", "email": "john@example.com"},
  column_id="id",
  db_alias='default'
)`,
        params: [
          { name: "table_name", type: "str", desc: "Target table name" },
          { name: "data", type: "dict", desc: "Data to insert" },
          { name: "column_id", type: "str", desc: "ID column name" },
          { name: "db_alias", type: "str", desc: "Database alias" }
        ]
      }
    ]
  },
  {
    category: "Data Retrieval",
    icon: <FaSearch className="h-6 w-6" />,
    functions: [
      {
        name: "first_data",
        description: "Get the first row of data from a table",
        example: `first_data(
  table_name="users",
  filters={"status": "active"},
  columns="*",
  order_by="created_at DESC"
)`,
        params: [
          { name: "table_name", type: "str", desc: "Source table name" },
          { name: "filters", type: "dict", desc: "Filter conditions" },
          { name: "columns", type: "str/list", desc: "Columns to select" },
          { name: "order_by", type: "str/list", desc: "Order by clause" },
          { name: "db_alias", type: "str", desc: "Database alias" }
        ]
      },
      {
        name: "last_data",
        description: "Get the last row of data from a table",
        example: `last_data(
  table_name="users",
  filters={"status": "active"},
  order_by_column="id",
  columns="*"
)`,
        params: [
          { name: "table_name", type: "str", desc: "Source table name" },
          { name: "filters", type: "dict", desc: "Filter conditions" },
          { name: "order_by_column", type: "str", desc: "Column to order by" },
          { name: "columns", type: "str/list", desc: "Columns to select" },
          { name: "db_alias", type: "str", desc: "Database alias" }
        ]
      },
      {
        name: "count_data",
        description: "Get the count of rows in a table",
        example: `count_data(
  table_name="users",
  filters={"status": "active"}
)`,
        params: [
          { name: "table_name", type: "str", desc: "Source table name" },
          { name: "filters", type: "dict", desc: "Filter conditions" },
          { name: "db_alias", type: "str", desc: "Database alias" }
        ]
      },
      {
        name: "pluck_data",
        description: "Get values from a specific column in a table",
        example: `pluck_data(
  table_name="users",
  column_name="email",
  filters={"status": "active"}
)`,
        params: [
          { name: "table_name", type: "str", desc: "Source table name" },
          { name: "column_name", type: "str", desc: "Column to pluck" },
          { name: "filters", type: "dict", desc: "Filter conditions" },
          { name: "db_alias", type: "str", desc: "Database alias" }
        ]
      },
      {
        name: "distinct_data",
        description: "Get distinct values from a specific column",
        example: `distinct_data(
  table_name="users",
  column_name="status",
  filters={"active": True}
)`,
        params: [
          { name: "table_name", type: "str", desc: "Source table name" },
          { name: "column_name", type: "str", desc: "Column to get distinct values from" },
          { name: "filters", type: "dict", desc: "Filter conditions" },
          { name: "db_alias", type: "str", desc: "Database alias" }
        ]
      },
      {
        name: "get_value",
        description: "Get a single value from a table",
        example: `get_value(
  table_name="users",
  column_name="email",
  filters={"id": 123},
  type="UUID"
)`,
        params: [
          { name: "table_name", type: "str", desc: "Source table name" },
          { name: "column_name", type: "str", desc: "Column to get value from" },
          { name: "filters", type: "dict", desc: "Filter conditions" },
          { name: "type", type: "str", desc: "Type of the value (e.g., 'UUID')" },
          { name: "db_alias", type: "str", desc: "Database alias" }
        ]
      }
    ]
  },
  {
    category: "Data Manipulation",
    icon: <FaSort className="h-6 w-6" />,
    functions: [
      {
        name: "order_by_data",
        description: "Get ordered data from a table",
        example: `order_by_data(
  table_name="users",
  order_column="created_at",
  ascending=False,
  filters={"status": "active"},
  limit=10,
  offset=0
)`,
        params: [
          { name: "table_name", type: "str", desc: "Source table name" },
          { name: "order_column", type: "str", desc: "Column to order by" },
          { name: "ascending", type: "bool", desc: "True for ascending, False for descending" },
          { name: "filters", type: "dict", desc: "Filter conditions" },
          { name: "limit", type: "int", desc: "Limit number of records" },
          { name: "offset", type: "int", desc: "Offset for pagination" },
          { name: "db_alias", type: "str", desc: "Database alias" }
        ]
      },
      {
        name: "exists_data",
        description: "Check if data exists in a table",
        example: `exists_data(
  table_name="users",
  filters={"email": "john@example.com"},
  id_column="id",
  exclude_id=123
)`,
        params: [
          { name: "table_name", type: "str", desc: "Source table name" },
          { name: "filters", type: "dict", desc: "Filter conditions" },
          { name: "id_column", type: "str", desc: "ID column name" },
          { name: "exclude_id", type: "int", desc: "ID to exclude from check" },
          { name: "db_alias", type: "str", desc: "Database alias" }
        ]
      },
      {
        name: "fetch_records_with_conditions",
        description: "Fetch records based on null/not null conditions",
        example: `fetch_records_with_conditions(
  table_name="users",
  null_column="deleted_at",
  not_null_column="email",
  additional_filters={"status": "active"}
)`,
        params: [
          { name: "table_name", type: "str", desc: "Source table name" },
          { name: "null_column", type: "str", desc: "Column to check for NULL" },
          { name: "not_null_column", type: "str", desc: "Column to check for NOT NULL" },
          { name: "additional_filters", type: "dict", desc: "Additional filter conditions" },
          { name: "db_alias", type: "str", desc: "Database alias" }
        ]
      },
      {
        name: "sum_data",
        description: "Sum data from a column in a table",
        example: `sum_data(
  table_name="orders",
  column_name="total_amount",
  filters={"status": "completed"}
)`,
        params: [
          { name: "table_name", type: "str", desc: "Source table name" },
          { name: "column_name", type: "str", desc: "Column to sum" },
          { name: "filters", type: "dict", desc: "Filter conditions" },
          { name: "db_alias", type: "str", desc: "Database alias" }
        ]
      }
    ]
  },
  {
    category: "Security & Validation",
    icon: <FaShieldAlt className="h-6 w-6" />,
    functions: [
      {
        name: "validate_request",
        description: "Validate incoming request data",
        example: `validate_request(data, {
  "email": "required|email",
  "age": "required|numeric|min:18"
})`,
        params: [
          { name: "data", type: "dict", desc: "Request data to validate" },
          { name: "rules", type: "dict", desc: "Validation rules" }
        ]
      },
      {
        name: "validate_method",
        description: "Validate HTTP method and apply rate limiting",
        example: `validate_method(
  request,
  required_method="POST",
  require_api_key=True,
  rate_limit=60,
  time_window=60,
  method_specific=True,
  block_bots=True
)`,
        params: [
          { name: "request", type: "HttpRequest", desc: "Django request object" },
          { name: "required_method", type: "str", desc: "Allowed HTTP method" },
          { name: "require_api_key", type: "bool", desc: "Require API key" },
          { name: "rate_limit", type: "int", desc: "Max requests per time window" },
          { name: "time_window", type: "int", desc: "Time window in seconds" },
          { name: "method_specific", type: "bool", desc: "Apply rate limit per method" },
          { name: "block_bots", type: "bool", desc: "Block suspicious user agents" }
        ]
      },
      {
        name: "validate_user_agent",
        description: "Validate user agent header",
        example: `validate_user_agent(request)`,
        params: [
          { name: "request", type: "HttpRequest", desc: "Django request object" }
        ]
      },
      {
        name: "validate_json_payload",
        description: "Validate JSON payload from request",
        example: `validate_json_payload(request)`,
        params: [
          { name: "request", type: "HttpRequest", desc: "Django request object" }
        ]
      },
      {
        name: "validate_file_upload",
        description: "Validate file uploads",
        example: `validate_file_upload(request)`,
        params: [
          { name: "request", type: "HttpRequest", desc: "Django request object" }
        ]
      },
      {
        name: "contains_malicious_input",
        description: "Check for malicious input in data",
        example: `contains_malicious_input(data)`,
        params: [
          { name: "data", type: "Any", desc: "Data to check for malicious content" }
        ]
      },
      {
        name: "jwt_uuid_conveter",
        description: "Convert JWT UUID to user ID",
        example: `user_id = jwt_uuid_conveter(uuid)`,
        params: [
          { name: "uuid", type: "str", desc: "User UUID from JWT" }
        ]
      }
    ]
  },
  {
    category: "File Operations",
    icon: <FaFileExcel className="h-6 w-6" />,
    functions: [
      {
        name: "save_uploaded_file",
        description: "Save and process uploaded files securely",
        example: `save_uploaded_file(
  file=request.FILES['document'],
  upload_dir='uploads'
)`,
        params: [
          { name: "file", type: "UploadedFile", desc: "File object" },
          { name: "upload_dir", type: "str", desc: "Target directory" }
        ]
      },
      {
        name: "generate_custom_excel",
        description: "Generate Excel file with custom formatting",
        example: `generate_custom_excel(
  data=rows,
  headers=["ID", "Name", "Email"],
  title="User Report"
)`,
        params: [
          { name: "data", type: "list", desc: "Data rows for Excel" },
          { name: "headers", type: "list", desc: "Column headers" },
          { name: "title", type: "str", desc: "Report title" }
        ]
      },
      {
        name: "generate_excel_from_template",
        description: "Generate Excel from template with filters",
        example: `generate_excel_from_template(
  data=sheets_data,
  url=request.build_absolute_uri(),
  output_file_name="report.xlsx"
)`,
        params: [
          { name: "data", type: "list", desc: "Data for Excel sheets" },
          { name: "url", type: "str", desc: "URL for filter parameters" },
          { name: "output_file_name", type: "str", desc: "Output file name" }
        ]
      }
    ]
  },
  {
    category: "Utility Functions",
    icon: <FaCode className="h-6 w-6" />,
    functions: [
      {
        name: "log_exception",
        description: "Log exceptions with detailed context",
        example: `log_exception(request, exception)`,
        params: [
          { name: "request", type: "HttpRequest", desc: "Django request object" },
          { name: "exception", type: "Exception", desc: "Exception object" }
        ]
      },
      {
        name: "get_client_ip",
        description: "Get client IP address from request",
        example: `client_ip = get_client_ip(request)`,
        params: [
          { name: "request", type: "HttpRequest", desc: "Django request object" }
        ]
      },
      {
        name: "generate_request_signature",
        description: "Generate unique signature for request",
        example: `signature = generate_request_signature(request, endpoint)`,
        params: [
          { name: "request", type: "HttpRequest", desc: "Django request object" },
          { name: "endpoint", type: "str", desc: "Request endpoint" }
        ]
      }
    ]
  }
];

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState(helperDocs[0].category);
  const [selectedFunction, setSelectedFunction] = useState(helperDocs[0].functions[0]);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter functions based on search term
  const filteredCategories = helperDocs.map(category => ({
    ...category,
    functions: category.functions.filter(func => 
      func.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      func.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.functions.length > 0);

  // Get the first available category and function when search results change
  React.useEffect(() => {
    if (filteredCategories.length > 0) {
      setSelectedCategory(filteredCategories[0].category);
      setSelectedFunction(filteredCategories[0].functions[0]);
    }
  }, [searchTerm]);

  // Remove Prism.js loading code
  // useEffect(() => {
  //   // Load Prism CSS
  //   const link = document.createElement('link');
  //   link.rel = 'stylesheet';
  //   link.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism-tomorrow.min.css';
  //   document.head.appendChild(link);
  // 
  //   // Load Prism JS
  //   const script = document.createElement('script');
  //   script.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js';
  //   script.async = true;
  //   script.onload = () => {
  //     // Load Python language support
  //     const pythonScript = document.createElement('script');
  //     pythonScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/components/prism-python.min.js';
  //     pythonScript.async = true;
  //     document.body.appendChild(pythonScript);
  //   };
  //   document.body.appendChild(script);
  // 
  //   return () => {
  //     // Clean up
  //     document.head.removeChild(link);
  //     document.body.removeChild(script);
  //   };
  // }, []);
  // 
  // // Apply syntax highlighting when selected function changes
  // useEffect(() => {
  //   if (window.Prism) {
  //     window.Prism.highlightAll();
  //   }
  // }, [selectedFunction]);

  return (
    <section id="projects" className="bg-gray-50 dark:bg-stone-800">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-teal-600 tracking-wide uppercase">Documentation</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Helper Functions Reference
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            Comprehensive guide to using the Django Database Helper functions
          </p>
        </div>

        {/* Search Bar */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search functions..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 dark:bg-stone-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="space-y-1">
              {filteredCategories.map((category) => (
                <button
                  key={category.category}
                  onClick={() => {
                    setSelectedCategory(category.category);
                    setSelectedFunction(category.functions[0]);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md flex items-center space-x-3 ${
                    selectedCategory === category.category
                      ? "bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-teal-100"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-stone-700"
                  }`}
                >
                  <span className="flex-shrink-0">{category.icon}</span>
                  <span className="text-sm font-medium">{category.category}</span>
                  <span className="ml-auto bg-gray-200 dark:bg-stone-600 text-gray-700 dark:text-gray-200 text-xs rounded-full px-2 py-1">
                    {category.functions.length}
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-8">
              <div className="space-y-1">
                {filteredCategories
                  .find((c) => c.category === selectedCategory)
                  ?.functions.map((func) => (
                    <button
                      key={func.name}
                      onClick={() => setSelectedFunction(func)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                        selectedFunction.name === func.name
                          ? "bg-teal-50 text-teal-700 dark:bg-teal-900 dark:text-teal-100"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-stone-700"
                      }`}
                    >
                      {func.name}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-stone-700 shadow-lg rounded-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedFunction.name}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {selectedFunction.description}
                </p>

                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Parameters</h4>
                  <div className="mt-4 border dark:border-gray-600 rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                      <thead className="bg-gray-50 dark:bg-stone-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white dark:bg-stone-700 divide-y divide-gray-200 dark:divide-gray-600">
                        {selectedFunction.params.map((param) => (
                          <tr key={param.name}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                              {param.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                              {param.type}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                              {param.desc}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white">Example Usage</h4>
                  <div className="mt-4">
                    <SyntaxHighlighter 
                      language="python" 
                      style={tomorrow}
                      customStyle={{
                        borderRadius: '0.375rem',
                        padding: '1rem',
                        fontSize: '0.875rem',
                        backgroundColor: '#1f2937',
                        margin: 0
                      }}
                    >
                      {selectedFunction.example}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
