"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "./../get-data";
import { updatePicklist } from "@/app/actions/update-picklist";

// Define the DataType type for the rows returned by the database
type DataType = {
  team_id: number;
  picklist_rank: number;
};

export default function DataAnalysis() {
  const [data, setData] = useState<DataType[]>([]);
  const [draggedItem, setDraggedItem] = useState<DataType | null>(null);
  const [draggedOverIndex, setDraggedOverIndex] = useState<number | null>(null);

  // Function to fetch data that can be called multiple times
  const getData = async () => {
    const fetchedData = await fetchData();
    setData(fetchedData);
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

    // Log the new position to the console
    
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

  // if (loading) return <div className="text-center text-xl">Loading...</div>;

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-6">Data Analysis</h1>
        <p className="text-center mb-4 text-gray-600">Drag and drop rows to reorder them</p>
        
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 border-b text-center text-sm font-medium text-gray-700">Team ID</th>
                <th className="px-6 py-3 border-b text-center text-sm font-medium text-gray-700">Picklist Rank</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr 
                  key={item.team_id} 
                  className={`
                    hover:bg-gray-100 cursor-move
                    ${draggedItem && draggedItem.team_id === item.team_id ? 'opacity-50 bg-blue-50' : ''}
                    ${draggedOverIndex === index ? 'border-t-2 border-blue-400' : ''}
                  `}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                >
                  <td className="px-6 py-3 border-b text-center text-sm text-gray-900">{item.team_id}</td>
                  <td className="px-6 py-3 border-b text-center text-sm text-gray-900">{item.picklist_rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}