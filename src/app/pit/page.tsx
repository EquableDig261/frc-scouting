"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "./../get-data";
import { Helper } from "@/components/form/help";
import { Setter } from "@/components/form/settings";
import { fetchPitData } from "../actions/get-pit-data";
import { Tabs, TabsList, TabsTrigger } from "~/tabs";
import { PitDataSubmissionForm } from "../../components/form/pit-data-submission-form";

// Define the types
type TeamData = {
  team_id: number;
  picklist_rank: number;
};

type PitData = {
  team_id: number;
  has_left_auto: boolean;
  has_center_auto: boolean;
  has_right_auto: boolean;
  prefered_auto: number;
  can_l1: boolean;
  can_l2: boolean;
  can_l3: boolean;
  can_l4: boolean;
  can_barge: boolean;
  can_processor: boolean;
  can_deep_climb: boolean;
  can_shallow_climb: boolean;
  is_swerve: boolean;
};

export default function PitData() {
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [comparisonData, setComparisonData] = useState<PitData[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<
      "view data" | "submit data" | string
    >("view data");
  
  useEffect(() => {
    const getTeams = async () => {
      try {
        const fetchedData = await fetchData(Number(localStorage.getItem("competitionID") ? localStorage.getItem("competitionID") : 1));
        setTeams(fetchedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching teams:", error);
        setLoading(false);
      }
    };
    
    getTeams();
  }, []);
  
  const handleTeamChange = (value: string) => {
    setSelectedTeam(value);
  };

  const formatBoolean = (value: boolean) => {
    return value === null ? "null" : (value ? "Yes" : "No");
  }
  
  const handleCompare = async () => {
    // Validate that a team has been selected
    if (!selectedTeam) {
      alert("Please select a team to view");
      return;
    }
    
    setDataLoading(true);

    try {
      const compData = await fetchPitData(
        parseInt(selectedTeam), 
        0, 
        0, 
        0,
        Number(localStorage.getItem("competitionID") ? localStorage.getItem("competitionID") : 1)
      );
      setComparisonData(compData);
    } catch (error) {
      console.error("Error fetching team data:", error);
      alert("There was an error fetching the team data. Please try again.");
    } finally {
      setDataLoading(false);
    }
  };
  
  return (
    <>
      <Helper />
      <Setter />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">Pit Scouting Data</h1>
        <div className="block">
          <Tabs
            defaultValue="view data"
            className="w-full mb-4"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="view data">View Data</TabsTrigger>
              <TabsTrigger value="submit data">Submit Data</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {activeTab === "view data" ? (
          <>
            {loading ? (
              <div className="text-center text-xl">Loading teams...</div>
            ) : (
              <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto mb-8">
                <h2 className="text-xl font-bold mb-4">Select Team to View</h2>
                <div className="mb-6">
                  <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-2">
                    Team:
                  </label>
                  <select
                    id="team"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={selectedTeam}
                    onChange={(e) => handleTeamChange(e.target.value)}
                  >
                    <option value="">Select Team</option>
                    {teams.map((team) => (
                      <option key={team.team_id} value={team.team_id}>
                        {team.team_id}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="text-center mt-6">
                  <button
                    type="button"
                    className="px-6 py-3 text-white font-medium rounded-md bg-primary hover:bg-700 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={handleCompare}
                    disabled={dataLoading}
                  >
                    {dataLoading ? 'Loading...' : 'View Team Data'}
                  </button>
                </div>
              </div>
            )}
            
            {/* Results Table */}
            {comparisonData.length > 0 && (
              <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Team {comparisonData[0].team_id} Data</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Metric
                        </th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="bg-blue-50">
                        <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                          Has Left Auto
                        </td>
                        <td className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {formatBoolean(comparisonData[0].has_left_auto)}
                        </td>
                      </tr>
                      <tr className="bg-blue-50">
                        <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                          Has Center Auto
                        </td>
                        <td className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                        {formatBoolean(comparisonData[0].has_center_auto)}
                        </td>
                      </tr>
                      <tr className="bg-blue-50">
                        <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                          Has Right Auto
                        </td>
                        <td className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                        {formatBoolean(comparisonData[0].has_right_auto)}
                        </td>
                      </tr>
                      <tr className="bg-blue-50">
                        <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                          Preferred Auto
                        </td>
                        <td className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {comparisonData[0].prefered_auto}
                        </td>
                      </tr>
                      <tr className="bg-green-50">
                        <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                          Can Score L1
                        </td>
                        <td className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                        {formatBoolean(comparisonData[0].can_l1)}
                        </td>
                      </tr>
                      <tr className="bg-green-50">
                        <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                          Can Score L2
                        </td>
                        <td className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                        {formatBoolean(comparisonData[0].can_l2)}
                        </td>
                      </tr>
                      <tr className="bg-green-50">
                        <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                          Can Score L3
                        </td>
                        <td className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                        {formatBoolean(comparisonData[0].can_l3)}
                        </td>
                      </tr>
                      <tr className="bg-green-50">
                        <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                          Can Score L4
                        </td>
                        <td className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                        {formatBoolean(comparisonData[0].can_l4)}
                        </td>
                      </tr>
                      <tr className="bg-green-50">
                        <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                          Can Score Processor
                        </td>
                        <td className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                        {formatBoolean(comparisonData[0].can_processor)}
                        </td>
                      </tr>
                      <tr className="bg-green-50">
                        <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                          Can Score Barge
                        </td>
                        <td className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                        {formatBoolean(comparisonData[0].can_barge)}
                        </td>
                      </tr>
                      <tr className="bg-orange-50">
                        <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                          Is Swerve
                        </td>
                        <td className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                        {formatBoolean(comparisonData[0].is_swerve)}
                        </td>
                      </tr>
                      <tr className="bg-purple-50">
                        <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                          Can Deep Climb
                        </td>
                        <td className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                        {formatBoolean(comparisonData[0].can_deep_climb)}
                        </td>
                      </tr>
                      <tr className="bg-purple-50">
                        <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                          Can Shallow Climb
                        </td>
                        <td className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                        {formatBoolean(comparisonData[0].can_shallow_climb)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-center mb-6">Submit Pit Data</h2>
            <PitDataSubmissionForm />
          </div>
        )}
      </div>
    </>
  );
}