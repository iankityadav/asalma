"use client";
import { useAssignAssetToEmployeeMutation, useCreateAssetMutation, useGetUnAssignedAssets, useLazyGetAssetsQuery } from "@/store/assets/assets.endpoint";
import { useEffect, useState } from "react";
import internal from "stream";
import router, { useRouter } from "../../../node_modules/next/router";

const AssetsPage = () => {
  const [getAssets, { data }] = useLazyGetAssetsQuery();
  const [createAsset] = useCreateAssetMutation();
  const [assignAssetToEmployee] = useAssignAssetToEmployeeMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignAssetModalOpen, setIsAssignAssetModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    serialNumber: "",
    condition: ""
  });

  const [assignData, setAssignData] = useState({
    employeeId: "",
    assetId: ""
  });

  useEffect(() => {
    getAssets({});
  }, [getAssets]);

  const handleNewAssetClick = () => setIsModalOpen(true);

  const handleAssignAssetClick = () => setIsAssignAssetModalOpen(true);
  
  const handleAssignChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAssignData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.type && formData.serialNumber && formData.condition) {
      await createAsset(formData); // Send post request with form data
      setIsModalOpen(false); // Close modal after submission
      setFormData({ name: "", type: "", serialNumber: "", condition: "" }); // Reset form
      getAssets({}); // Refresh asset list
    } else {
      alert("Please fill in all fields.");
    }
  }

  // Submit handler for assigning an asset to an employee
  const handleAssignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { employeeId, assetId } = assignData;
    if (employeeId && assetId) {
      await assignAssetToEmployee({ employeeId: parseInt(employeeId), assetId: parseInt(assetId) });
      setIsAssignAssetModalOpen(false);
      setAssignData({ employeeId: "", assetId: "" });
      getAssets({});
    } else {
      alert("Please enter valid IDs.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-items-center gap-8">
      <div className="flex flex-col p-4 mt-8 bg-white max-w-[720px] w-full rounded-md shadow-lg">
        <div className="flex justify-between">
          <div className="text-2xl font-light flex gap-3">
            <div className="flex items-center text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"
                />
              </svg>
            </div>
            <span className="flex items-center font-extralight">Assets</span>
          </div>
          <button onClick={handleNewAssetClick}
           className="border-2 border-blue-400 rounded-md px-3 py-1">
            <div className="text-gray-600 flex gap-2">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
              <div className="flex items-center">New Asset</div>
            </div>
          </button>
          <button onClick={handleAssignAssetClick}
           className="border-2 border-blue-400 rounded-md px-3 py-1">
            <div className="text-gray-600 flex gap-2">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
              <div className="flex items-center">Assign Asset</div>
            </div>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Create New Asset</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              <input
                type="text"
                name="type"
                placeholder="Type"
                value={formData.type}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              <input
                type="text"
                name="serialNumber"
                placeholder="Serial Number"
                value={formData.serialNumber}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              <input
                type="text"
                name="condition"
                placeholder="Condition"
                value={formData.condition}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-2"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-gray-500 text-white py-2 rounded-md mt-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {isAssignAssetModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Assign Asset to Employee</h2>
            <form onSubmit={handleAssignSubmit}>
              <input type="number" name="employeeId" placeholder="Employee ID" value={assignData.employeeId} onChange={handleAssignChange} className="w-full p-2 border border-gray-300 rounded mb-2" required />
              <input type="number" name="assetId" placeholder="Asset ID" value={assignData.assetId} onChange={handleAssignChange} className="w-full p-2 border border-gray-300 rounded mb-2" required />
              <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md mt-4">Assign</button>
              <button type="button" onClick={() => setIsAssignAssetModalOpen(false)} className="w-full bg-gray-500 text-white py-2 rounded-md mt-2">Cancel</button>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 justify-center items-center p-4 bg-white max-w-[720px] w-full rounded-md shadow-lg gap-3">
        {data?.map((el: Asset, i: number) => (
          <AssetInfo
            key={i}
            id = {el.id}
            name={el.name}
            type={el.type}
            assignedToEmpId={el.assignedToEmpId}
            serialNumber = {el.serialNumber}
          />
        ))}
      </div>
    </div>
  );
};

type Asset = {
  id: number;
  name: string;
  type: string;
  assignedToEmpId: string;
  serialNumber: string;
};

const AssetInfo = ({ id, name, type, assignedToEmpId,serialNumber }: Asset) => {
  return (
    <div className="w-full border-2 border-blue-200 rounded-md max-w-[220px] p-2">
      <div className="font-semibold">{name}</div>
      <div className="text-sm">Asset Id: {id} </div>
      <div className="text-sm">{type}</div>
      <div className="text-sm">Assigned to: {assignedToEmpId || "No One"}</div>
      <div className="text-sm">Serial Number: {serialNumber} </div>
    </div>
  );
};

export default AssetsPage;
