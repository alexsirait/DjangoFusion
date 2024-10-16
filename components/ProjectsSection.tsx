"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import SlideUp from "./SlideUp";
import { BsGithub, BsArrowUpRightSquare } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const projects = [
  {
    name: "Thankful Thoughts",
    description:
      "ThankfulThoughts is a web app that generates an appreciative sentence of something or someone you are thankful for.",
    image: "/thankfulthoughts.png",
    github: "https://github.com/hqasmei/thankful-thoughts",
    link: "https://thankfulthoughts.io/",
  },
  {
    name: "PlatoIO",
    description: "PlatoIO is a to do list app that built using the PERN stack.",
    image: "/platoio.png",
    github: "https://github.com/hqasmei/platoio",
    link: "https://platoio.com/register",
  },
  {
    name: "Kator Family Photos",
    description:
      "Kator Family Photos is a photos and video digitization service in the LA area.",
    image: "/familyphotos.png",
    github: "https://github.com/hqasmei/katorfamilyphotos",
    link: "https://katorfamilyphotos.com/",
  },
  {
    name: "ALEK JAHAT + GALAK",
    description:
      "ALEK TUKANG MEREPET",
    image: "/familyphotos.png",
    github: "#",
    link: "#",
  },
];

const ProjectsSection = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      {/* @ts-ignore */}
      scrollRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      {/* @ts-ignore */}
      scrollRef.current.scrollBy({
        left: 300, // Geser ke kanan 300px
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="projects">
      <h1 className="my-10 text-center font-bold text-4xl">
        Docs
        <hr className="w-6 h-1 mx-auto my-4 bg-teal-500 border-0 rounded"></hr>
      </h1>

      <div className="relative">
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">DjangoFushion!</h1>
      <p className="mb-6">
        Dokumentasi ini menjelaskan beberapa helper functions yang dapat digunakan untuk berinteraksi dengan database
        di proyek Django. Setiap helper memiliki penjelasan mendetail mengenai fungsi, parameter, dan contoh
        penggunaan.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Execute Query</h2>
        <p className="mb-4">
          Fungsi <strong>execute_query</strong> digunakan untuk menjalankan SQL query mentah dan mengembalikan hasilnya
          sebagai daftar dictionary. Ini berguna untuk query yang kompleks atau ketika ORM Django tidak mencukupi.
        </p>
        <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-scroll overflow-y-hidden">
{`def execute_query(sql_query, params=None):
    """
    Executes a raw SQL query and returns the results as a list of dictionaries.
    
    Parameters:
    sql_query (str): The SQL query to execute.
    params (list, optional): A list of parameters to bind to the query.
    
    Returns:
    list: A list of dictionaries representing the rows returned by the query.
    """
    try:
        with connection.cursor() as cursor:
            cursor.execute(sql_query, params or [])
            columns = [col[0] for col in cursor.description]  # Get column names
            rows = cursor.fetchall()  # Fetch all rows
        return [dict(zip(columns, row)) for row in rows]  # Convert to list of dictionaries
    except Exception as e:
        raise Exception(f"Error executing query: {e}")`}
        </pre>
        <h3 className="text-xl font-semibold mt-4">Parameters:</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>sql_query</strong>: <em>str</em> - SQL query yang ingin dieksekusi. Contoh: 
            <code>&quot;SELECT * FROM my_table WHERE id = %s&quot;</code>.
          </li>
          <li>
            <strong>params</strong>: <em>list</em>, optional - Parameter untuk SQL query jika menggunakan placeholders. 
            Contoh: <code>[1]</code> untuk menggantikan placeholder.
          </li>
        </ul>
        <h3 className="text-xl font-semibold mt-4">Contoh Penggunaan:</h3>
        <pre className="bg-gray-700 text-white p-4 rounded-md overflow-x-scroll overflow-y-hidden">
{`result = execute_query("SELECT * FROM my_table WHERE id = %s", [1])`}
        </pre>
        <p className="mb-4">Hasil <code>result</code> akan menjadi list dictionary yang berisi data dari baris yang sesuai.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Insert Data</h2>
        <p className="mb-4">
          Fungsi <strong>insert_data</strong> digunakan untuk memasukkan data ke dalam tabel. Fungsi ini mengembalikan
          ID dari baris yang dimasukkan, sehingga Anda dapat mengetahui entri baru yang telah dibuat.
        </p>
        <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-scroll overflow-y-hidden">
{`def insert_data(table_name, data):
    """
    Inserts data into the specified table and returns the ID of the inserted row.

    Parameters:
    table_name (str): The name of the table to insert data into.
    data (dict): A dictionary where keys are column names and values are the data to insert.

    Returns:
    int: The ID of the inserted row.
    """
    try:
        columns = ', '.join(data.keys())
        placeholders = ', '.join(['%s'] * len(data))  # Prepare placeholders
        sql_query = f"INSERT INTO {table_name} ({columns}) VALUES ({placeholders})"
        with transaction.atomic():  # Ensure atomic transaction
            with connection.cursor() as cursor:
                cursor.execute(sql_query, list(data.values()))  # Execute the insert
                return cursor.lastrowid  # Return the last inserted ID
    except Exception as e:
        raise Exception(f"Error in insert: {e}")`}
        </pre>
        <h3 className="text-xl font-semibold mt-4">Parameters:</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>table_name</strong>: <em>str</em> - Nama tabel di mana data akan dimasukkan. Contoh: 
            <code>&quot;my_table&quot;</code>.
          </li>
          <li>
            <strong>data</strong>: <em>dict</em> - Kunci adalah nama kolom, dan nilai adalah data yang ingin dimasukkan.
            Contoh: 
            <code>{"{'column1': 'value1', 'column2': 'value2'}"}</code>.
          </li>
        </ul>
        <h3 className="text-xl font-semibold mt-4">Contoh Penggunaan:</h3>
        <pre className="bg-gray-700 text-white p-4 rounded-md overflow-x-scroll overflow-y-hidden">
{`data = {
    'column1': 'value1',
    'column2': 'value2',
}
inserted_id = insert_data('my_table', data)`}
        </pre>
        <p className="mb-4">Variabel <code>inserted_id</code> akan berisi ID dari baris yang baru dimasukkan.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Get Data</h2>
        <p className="mb-4">
          Fungsi <strong>get_data</strong> digunakan untuk membaca data dari tabel, dengan dukungan filter, pencarian,
          limit, dan offset. Ini sangat berguna untuk paginasi dan pencarian data.
        </p>
        <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-scroll overflow-y-hidden">
{`def get_data(table_name, filters=None, search=None, search_columns=None, columns='*', limit=None, offset=None):
    """
    Retrieves data from the specified table with optional filtering, searching, and pagination.

    Parameters:
    table_name (str): The name of the table to retrieve data from.
    filters (dict, optional): Filters to apply to the query (e.g., {'column_name': 'value'}).
    search (str, optional): A keyword to search for in the specified columns.
    search_columns (list, optional): Columns to search for the keyword.
    columns (str or list, optional): Columns to retrieve (default: '*').
    limit (int, optional): Limit the number of records retrieved.
    offset (int, optional): Offset for pagination.

    Returns:
    list: A list of dictionaries representing the rows returned by the query.
    """
    try:
        if isinstance(columns, list):
            columns = ', '.join(columns)  # Join columns if provided as a list
        sql_query = f"SELECT {columns} FROM {table_name}"
        conditions = []
        values = []
        if filters:
            conditions += [f"{key}=%s" for key in filters.keys()]  # Add filters to conditions
            values += list(filters.values())
        if search and search_columns:
            search_conditions = [f"{col}::text ILIKE %s" for col in search_columns]  # Prepare search conditions
            conditions.append(f"({' OR '.join(search_conditions)})")  # Combine with OR
            values += [f"%{search}%"] * len(search_columns)  # Prepare search values
        if conditions:
            where_clause = ' WHERE ' + ' AND '.join(conditions)  # Create WHERE clause
            sql_query += where_clause
        if limit:
            sql_query += f" LIMIT {limit}"  # Add LIMIT clause
        if offset:
            sql_query += f" OFFSET {offset}"  # Add OFFSET clause
        with connection.cursor() as cursor:
            cursor.execute(sql_query, values)  # Execute query with values
            columns = [col[0] for col in cursor.description]  # Get column names
            rows = cursor.fetchall()  # Fetch all rows
        return [dict(zip(columns, row)) for row in rows]  # Convert to list of dictionaries
    except Exception as e:
        raise Exception(f"Error in read: {e}")`}
        </pre>
        <h3 className="text-xl font-semibold mt-4">Parameters:</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>table_name</strong>: <em>str</em> - Nama tabel dari mana data akan diambil. Contoh: 
            <code>&quot;my_table&quot;</code>.
          </li>
          <li>
            <strong>filters</strong>: <em>dict</em>, optional - Filter untuk menentukan baris yang ingin diambil. 
            Contoh: 
            <code>{"{'column_name': 'value'}"}</code>.
          </li>
          <li>
            <strong>search</strong>: <em>str</em>, optional - Kata kunci untuk pencarian dalam kolom tertentu.
          </li>
          <li>
            <strong>search_columns</strong>: <em>list</em>, optional - Kolom yang akan dicari berdasarkan kata kunci.
          </li>
          <li>
            <strong>columns</strong>: <em>str</em> atau <em>list</em>, optional - Kolom yang ingin diambil, default 
            <code>*</code>.
          </li>
          <li>
            <strong>limit</strong>: <em>int</em>, optional - Batas jumlah baris yang akan diambil.
          </li>
          <li>
            <strong>offset</strong>: <em>int</em>, optional - Offset untuk paginasi.
          </li>
        </ul>
        <h3 className="text-xl font-semibold mt-4">Contoh Penggunaan:</h3>
        <pre className="bg-gray-700 text-white p-4 rounded-md overflow-x-scroll overflow-y-hidden">
{`# Mengambil semua data
result_all = get_data('my_table')

# Mengambil data dengan filter
result_filtered = get_data('my_table', filters={'column1': 'value1'})

# Mengambil data dengan pencarian dan limit
result_search = get_data('my_table', search='keyword', search_columns=['column1', 'column2'], limit=10)`}
        </pre>
        <p className="mb-4">
          <code>result_all</code>, <code>result_filtered</code>, dan <code>result_search</code> akan berisi hasil 
          yang sesuai berdasarkan query yang dijalankan.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Update Data</h2>
        <p className="mb-4">
          Fungsi <strong>update_data</strong> digunakan untuk memperbarui data dalam tabel berdasarkan filter. 
          Fungsi ini tidak mengembalikan nilai tetapi akan mengeksekusi operasi update pada database.
        </p>
        <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-scroll overflow-y-hidden">
{`def update_data(table_name, data, filters):
    """
    Updates data in the specified table based on the given filters.

    Parameters:
    table_name (str): The name of the table to update.
    data (dict): A dictionary where keys are column names to update and values are the new values.
    filters (dict): A dictionary where keys are column names for filtering the rows to update.

    Returns:
    bool: True if the update was successful, False otherwise.
    """
    try:
        set_clause = ', '.join([f"{key}=%s" for key in data.keys()])  # Prepare SET clause
        where_clause = ' AND '.join([f"{key}=%s" for key in filters.keys()])  # Prepare WHERE clause
        sql_query = f"UPDATE {table_name} SET {set_clause} WHERE {where_clause}"
        values = list(data.values()) + list(filters.values())  # Combine values for execution
        with transaction.atomic():  # Ensure atomic transaction
            with connection.cursor() as cursor:
                cursor.execute(sql_query, values)  # Execute update
        return True  # Indicate success
    except Exception as e:
        raise Exception(f"Error in update: {e}")`}
        </pre>
        <h3 className="text-xl font-semibold mt-4">Parameters:</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>table_name</strong>: <em>str</em> - Nama tabel yang ingin diperbarui. Contoh: 
            <code>&quot;my_table&quot;</code>.
          </li>
          <li>
            <strong>data</strong>: <em>dict</em> - Kunci adalah nama kolom yang ingin diperbarui, dan nilai adalah 
            nilai baru. Contoh: 
            <code>{"{'column1': 'new_value'}"}</code>.
          </li>
          <li>
            <strong>filters</strong>: <em>dict</em> - Filter untuk menentukan baris mana yang akan diperbarui.
            Contoh: 
            <code>{"{'id': 1}"}</code>.
          </li>
        </ul>
        <h3 className="text-xl font-semibold mt-4">Contoh Penggunaan:</h3>
        <pre className="bg-gray-700 text-white p-4 rounded-md overflow-x-scroll overflow-y-hidden">
{`data_to_update = {'column1': 'updated_value'}
filters = {'id': 1}
update_success = update_data('my_table', data_to_update, filters)`}
        </pre>
        <p className="mb-4">Variabel <code>update_success</code> akan berisi <code>True</code> jika pembaruan berhasil.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. Delete Data</h2>
        <p className="mb-4">
          Fungsi <strong>delete_data</strong> digunakan untuk menghapus data dari tabel berdasarkan filter tertentu. 
          Ini berguna untuk mengelola entri yang tidak diperlukan lagi dalam database.
        </p>
        <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-scroll overflow-y-hidden">
{`def delete_data(table_name, filters):
    """
    Deletes rows from the specified table based on the given filters.

    Parameters:
    table_name (str): The name of the table from which to delete data.
    filters (dict): A dictionary where keys are column names for filtering the rows to delete.

    Returns:
    bool: True if the deletion was successful, False otherwise.
    """
    try:
        where_clause = ' AND '.join([f"{key}=%s" for key in filters.keys()])  # Prepare WHERE clause
        sql_query = f"DELETE FROM {table_name} WHERE {where_clause}"
        with transaction.atomic():  # Ensure atomic transaction
            with connection.cursor() as cursor:
                cursor.execute(sql_query, list(filters.values()))  # Execute delete
        return True  # Indicate success
    except Exception as e:
        raise Exception(f"Error in delete: {e}")`}
        </pre>
        <h3 className="text-xl font-semibold mt-4">Parameters:</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>
            <strong>table_name</strong>: <em>str</em> - Nama tabel dari mana data akan dihapus. Contoh: 
            <code>&quot;my_table&quot;</code>.
          </li>
          <li>
            <strong>filters</strong>: <em>dict</em> - Filter untuk menentukan baris mana yang akan dihapus. 
            Contoh: 
            <code>{"{'id': 1}"}</code>.
          </li>
        </ul>
        <h3 className="text-xl font-semibold mt-4">Contoh Penggunaan:</h3>
        <pre className="bg-gray-700 text-white p-4 rounded-md overflow-x-scroll overflow-y-hidden">
{`delete_success = delete_data('my_table', {'id': 1})`}
        </pre>
        <p className="mb-4">Variabel <code>delete_success</code> akan berisi <code>True</code> jika penghapusan berhasil.</p>
      </section>
    </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
