"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "../get-data";
import { setColorData } from "../actions/setColor";
import { updatePicklist } from "@/app/actions/update-picklist";

// Define the DataType type for the rows returned by the database
type DataType = {
  team_id: number;
  picklist_rank: number;
  backgroundColor?: string; // Add backgroundColor property
  background_color?: string; // Match the database field name
};

// Color options for the dropdown
const colorOptions = [
  { value: "bg-white", label: "Default" },
  { value: "bg-red-100", label: "Red" },
  { value: "bg-blue-100", label: "Blue" },
  { value: "bg-green-100", label: "Green" },
  { value: "bg-yellow-100", label: "Yellow" },
  { value: "bg-purple-100", label: "Purple" },
];

export default function DataAnalysis() {
  const [data, setData] = useState<DataType[]>([]);
  const [draggedItem, setDraggedItem] = useState<DataType | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  // Function to fetch data that can be called multiple times
  const getData = async () => {
    const fetchedData = await fetchData();
    // Initialize backgroundColor if not already set
    const dataWithColors = fetchedData.map(item => ({
      ...item,
      backgroundColor: item.background_color || "bg-white"
    }));
    setData(dataWithColors);
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle drag start
  const handleDragStart = (e: React.DragEvent, item: DataType) => {
    setDraggedItem(item);
    // Set data transfer properties to enable drag
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", item.team_id.toString());
    // For Firefox, we need to set some data
    const dragImage = document.createElement("div");
    dragImage.classList.add("bg-blue-100", "p-2", "rounded", "border", "border-blue-300");
    dragImage.textContent = `ID: ${item.team_id} - ${item.picklist_rank}`;
    document.body.appendChild(dragImage);
    e.dataTransfer.setDragImage(dragImage, 20, 20);
    setTimeout(() => document.body.removeChild(dragImage), 0);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedOverIndex !== index) {
      setDraggedOverIndex(index);
    }
    return false;
  };

  // Handle drop
  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (!draggedItem) return;

    const draggedIndex = data.findIndex(item => item.team_id === draggedItem.team_id);
    if (draggedIndex === dropIndex) return;
    
    try {
      // Update the database with the new order
      await updatePicklist(draggedIndex, dropIndex);
      
      // Refresh data after the database update
      await getData();
      
    } catch (error) {
      console.error("Error updating picklist:", error);
      
      // If there's an error, at least update the UI state temporarily
      // Create a new copy of the data array
      const newData = [...data];
      // Remove the dragged item
      newData.splice(draggedIndex, 1);
      // Insert the dragged item at the drop position
      newData.splice(dropIndex, 0, draggedItem);
      // Update state with the new order
      setData(newData);
    }
    
    // Reset drag states
    setDraggedItem(null);
    setDraggedOverIndex(null);
  };

  // Handle drag end
  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOverIndex(null);
  };

  // Handle color change
  const handleColorChange = async (index: number, color: string) => {
    const newData = [...data];
    newData[index].backgroundColor = color;
    setData(newData); // Update UI immediately
    
    try {
      // Update the database with the new color
      await setColorData(color, data[index].team_id);
    } catch (error) {
      console.error("Error updating color:", error);
      // Optionally revert the UI if the server update fails
      // await getData();
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-6">Pick List</h1>
        <p className="text-center mb-4 text-gray-600">Drag and drop rows to reorder them or change row colors</p>
        
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-fixed">
            <colgroup>
              <col className="w-1/4" /><col className="w-2/4" /><col className="w-1/4" />
            </colgroup>
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 border-b text-center text-sm font-medium text-gray-700">Picklist Rank</th>
                <th className="px-6 py-3 border-b text-center text-sm font-medium text-gray-700">Team ID</th>
                <th className="px-6 py-3 border-b text-right text-sm font-medium text-gray-700">Background Color</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr 
                    key={item.team_id} 
                    className={`
                      cursor-move
                      ${item.backgroundColor || 'bg-white'}
                      ${draggedItem && draggedItem.team_id === item.team_id ? 'opacity-50' : ''}
                      ${draggedOverIndex === index ? 'border-t-2 border-blue-400' : ''}
                    `}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                  >
                    <td className="px-6 py-3 border-b text-center text-sm text-gray-900">{item.picklist_rank}</td>
                    <td className="px-6 py-3 border-b text-center text-lg font-medium text-gray-900">{item.team_id}</td>
                    <td className="px-6 py-3 border-b text-right">
                      <div className="flex justify-end">
                        <select 
                          className="w-24 px-3 py-1.5 text-sm border border-gray-300 rounded-md 
                                    focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          value={item.backgroundColor || "bg-white"}
                          onChange={(e) => handleColorChange(index, e.target.value)}
                          onClick={(e) => e.stopPropagation()} // Prevent drag when clicking the select
                        >
                          {colorOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 border-b text-center text-sm text-gray-500">-</td>
                  <td className="px-6 py-4 border-b text-center text-lg font-medium text-gray-500">No data available</td>
                  <td className="px-6 py-4 border-b text-right">-</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}