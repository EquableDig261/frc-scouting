"use client";

import React, { useEffect, useState } from "react";
import { fetchData } from "./../get-data";
import { Helper } from "@/components/form/help";
import { fetchComparisonData } from "../actions/comparison-data";

// Define the types
type TeamData = {
  team_id: number;
  picklist_rank: number;
};

type ComparisonData = {
  team_id: number;
  auto_avg: number;
  auto_l1_avg: number;
  auto_l2_avg: number;
  auto_l3_avg: number;
  auto_l4_avg: number;
  teleop_avg: number;
  teleop_l1_avg: number;
  teleop_l2_avg: number;
  teleop_l3_avg: number;
  teleop_l4_avg: number;
  auto_barge_avg: number;
  teleop_barge_avg: number;
  processor_avg: number;
  num_deep_climbs: number;
  num_shallow_climbs: number;
  num_parks: number;
  num_no_climbs: number;
  climb_rating_avg: number;
  defence_rating_avg: number;
  scoring_rating_avg: number;
};

export default function TeamComparison() {
    const [teams, setTeams] = useState<TeamData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedTeams, setSelectedTeams] = useState({
      team1: "",
      team2: "",
      team3: "",
      team4: ""
    });
    const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
    const [dataLoading, setDataLoading] = useState<boolean>(false);
  
    useEffect(() => {
      const getTeams = async () => {
        try {
          const fetchedData = await fetchData();
          setTeams(fetchedData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching teams:", error);
          setLoading(false);
        }
      };
      
      getTeams();
    }, []);
  
    const handleTeamChange = (dropdownName: string, value: string) => {
      const newSelectedTeams = {
        ...selectedTeams,
        [dropdownName]: value
      };
      
      setSelectedTeams(newSelectedTeams);
    };
  
    const handleCompare = async () => {
      // Validate that teams have been selected
      let { team1, team2, team3, team4 } = selectedTeams;
      
      team1 = !team1 ? "0" : team1;
      team2 = !team2 ? "0" : team2;
      team3 = !team3 ? "0" : team3;
      team4 = !team4 ? "0" : team4;
      
      if (!team1 || !team2 || !team3 || !team4) {
        alert("Please select all four teams to compare");
        return;
      }
      
      setDataLoading(true);
      
      try {
        const compData = await fetchComparisonData(
          parseInt(team1), 
          parseInt(team2), 
          parseInt(team3), 
          parseInt(team4)
        );
        setComparisonData(compData);
      } catch (error) {
        console.error("Error comparing teams:", error);
        alert("There was an error comparing the teams. Please try again.");
      } finally {
        setDataLoading(false);
      }
    };

    // Format number to 2 decimal places
    const formatNumber = (num: number): string => {
      return parseFloat(num.toString()).toFixed(2);
    };
  
    return (
      <>
        <Helper />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center mb-8">Team Comparison</h1>
          
          {loading ? (
            <div className="text-center text-xl">Loading teams...</div>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto mb-8">
              <h2 className="text-xl font-bold mb-4">Select Teams to Compare</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {/* Team 1 Dropdown */}
                <div>
                  <label htmlFor="team1" className="block text-sm font-medium text-gray-700 mb-2">
                    Team 1:
                  </label>
                  <select
                    id="team1"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={selectedTeams.team1}
                    onChange={(e) => handleTeamChange("team1", e.target.value)}
                  >
                    <option value="">Select Team</option>
                    {teams.map((team) => (
                      <option key={`team1-${team.team_id}`} value={team.team_id}>
                        {team.team_id}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Team 2 Dropdown */}
                <div>
                  <label htmlFor="team2" className="block text-sm font-medium text-gray-700 mb-2">
                    Team 2:
                  </label>
                  <select
                    id="team2"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={selectedTeams.team2}
                    onChange={(e) => handleTeamChange("team2", e.target.value)}
                  >
                    <option value="">Select Team</option>
                    {teams.map((team) => (
                      <option key={`team2-${team.team_id}`} value={team.team_id}>
                        {team.team_id}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Team 3 Dropdown */}
                <div>
                  <label htmlFor="team3" className="block text-sm font-medium text-gray-700 mb-2">
                    Team 3:
                  </label>
                  <select
                    id="team3"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={selectedTeams.team3}
                    onChange={(e) => handleTeamChange("team3", e.target.value)}
                  >
                    <option value="">Select Team</option>
                    {teams.map((team) => (
                      <option key={`team3-${team.team_id}`} value={team.team_id}>
                        {team.team_id}
                      </option>
                    ))}
                  </select>
                </div>
                
                {/* Team 4 Dropdown */}
                <div>
                  <label htmlFor="team4" className="block text-sm font-medium text-gray-700 mb-2">
                    Team 4:
                  </label>
                  <select
                    id="team4"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={selectedTeams.team4}
                    onChange={(e) => handleTeamChange("team4", e.target.value)}
                  >
                    <option value="">Select Team</option>
                    {teams.map((team) => (
                      <option key={`team4-${team.team_id}`} value={team.team_id}>
                        {team.team_id}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <button
                  type="button"
                  className="px-6 py-3 bg-600 text-white font-medium rounded-md bg-primary hover:bg-700 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-500 focus:ring-offset-2"
                  onClick={handleCompare}
                  disabled={dataLoading}
                >
                  {dataLoading ? 'Loading...' : 'Compare Teams'}
                </button>
              </div>
            </div>
          )}
          
          {/* Results Table */}
          {comparisonData.length > 0 && (
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Comparison Results</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Metric
                      </th>
                      {comparisonData.map((team) => (
                        <th key={`header-${team.team_id}`} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Team {team.team_id}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Autonomous Scoring Section */}
                    <tr className="bg-blue-50">
                      <td colSpan={comparisonData.length + 1} className="px-6 py-2 text-left text-sm font-medium text-blue-800">
                        Autonomous Scoring
                      </td>
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Total Auto Average
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`auto-avg-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {formatNumber(team.auto_avg)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Auto L1 Average
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`auto-l1-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {formatNumber(team.auto_l1_avg)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Auto L2 Average
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`auto-l2-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {formatNumber(team.auto_l2_avg)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Auto L3 Average
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`auto-l3-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {formatNumber(team.auto_l3_avg)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Auto L4 Average
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`auto-l4-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {formatNumber(team.auto_l4_avg)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-blue-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Auto Barge Average
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`auto-barge-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {formatNumber(team.auto_barge_avg)}
                        </td>
                      ))}
                    </tr>

                    {/* Teleop Scoring Section */}
                    <tr className="bg-green-50">
                      <td colSpan={comparisonData.length + 1} className="px-6 py-2 text-left text-sm font-medium text-green-800">
                        Teleop Scoring
                      </td>
                    </tr>
                    <tr className="bg-green-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Total Teleop Average
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`teleop-avg-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {formatNumber(team.teleop_avg)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-green-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Teleop L1 Average
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`teleop-l1-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {formatNumber(team.teleop_l1_avg)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-green-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Teleop L2 Average
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`teleop-l2-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {formatNumber(team.teleop_l2_avg)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-green-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Teleop L3 Average
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`teleop-l3-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {formatNumber(team.teleop_l3_avg)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-green-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Teleop L4 Average
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`teleop-l4-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {formatNumber(team.teleop_l4_avg)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-green-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Teleop Barge Average
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`teleop-barge-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {formatNumber(team.teleop_barge_avg)}
                        </td>
                      ))}
                    </tr>

                    {/* Processing Section */}
                    <tr className="bg-orange-50">
                      <td colSpan={comparisonData.length + 1} className="px-6 py-2 text-left text-sm font-medium text-orange-800">
                        Processing
                      </td>
                    </tr>
                    <tr className="bg-orange-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Processor Average
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`processor-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {formatNumber(team.processor_avg)}
                        </td>
                      ))}
                    </tr>

                    {/* Climbing Section */}
                    <tr className="bg-purple-50">
                      <td colSpan={comparisonData.length + 1} className="px-6 py-2 text-left text-sm font-medium text-purple-800">
                        Climbing Statistics
                      </td>
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Deep Climbs
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`deep-climbs-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {team.num_deep_climbs}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Shallow Climbs
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`shallow-climbs-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {team.num_shallow_climbs}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Parks
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`parks-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {team.num_parks}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-purple-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        No Climbs
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`no-climbs-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {team.num_no_climbs}
                        </td>
                      ))}
                    </tr>
                    {/* Ratings Section */}
                    <tr className="bg-red-50">
                      <td colSpan={comparisonData.length + 1} className="px-6 py-2 text-left text-sm font-medium text-red-800">
                        Performance Ratings
                      </td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Defense Rating Average
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`defense-rating-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {formatNumber(team.defence_rating_avg)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-red-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Scoring Rating Average
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`scoring-rating-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {formatNumber(team.scoring_rating_avg)}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-red-50">
                      <td className="px-6 py-2 pl-10 whitespace-nowrap text-sm text-gray-700">
                        Climb Rating Average
                      </td>
                      {comparisonData.map((team) => (
                        <td key={`climb-rating-${team.team_id}`} className="px-6 py-2 text-center whitespace-nowrap text-sm text-gray-700">
                          {formatNumber(team.climb_rating_avg)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }