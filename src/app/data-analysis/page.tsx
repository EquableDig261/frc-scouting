"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "./../get-data"; // Import the fetchData function

// Define the DataType type for the rows returned by the database
type DataType = {
  id: number;
  name: string;
};

export default function DataAnalysis() {
  const [data, setData] = useState<DataType[]>([]); // State to store data
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData(); // Fetch data using the fetchData function
      setData(fetchedData); // Ensure we use the rows from the query result
      setLoading(false); // Stop loading once data is fetched
    };

    getData(); // Run fetchData once on component mount
  }, []); // Empty dependency array ensures it only runs once

  if (loading) return <div className="text-center text-xl">Loading...</div>; // Show loading message while fetching data

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-600">Data Analysis</h1>

        {/* Table to display data */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 border-b text-center text-sm font-medium text-gray-700">ID</th>
                <th className="px-6 py-3 border-b text-center text-sm font-medium text-gray-700">Name</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="px-6 py-3 border-b text-center text-sm text-gray-900">{item.id}</td>
                  <td className="px-6 py-3 border-b text-center text-sm text-gray-900">{item.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
