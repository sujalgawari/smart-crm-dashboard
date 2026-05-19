import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  Search,
  Bell,
  Trash2,
  Plus,
} from "lucide-react";

import { Link } from "react-router-dom";

import API from "../services/api";

function Dashboard() {

  const [leads, setLeads] = useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [status, setStatus] =
    useState("New");

  const [source, setSource] =
    useState("Website");

  const fetchLeads = async () => {
    try {

      const res = await API.get(
        `/leads?search=${search}`
      );

      setLeads(
        res.data.leads || res.data
      );

    } catch (error) {
      console.log(error);
    }
  };

  const createLead = async () => {
    try {

      await API.post("/leads", {
        name,
        email,
        status,
        source,
      });

      fetchLeads();

      setName("");
      setEmail("");

    } catch (error) {
      console.log(error);
    }
  };

  const deleteLead = async (
    id: string
  ) => {
    try {

      await API.delete(
        `/leads/${id}`
      );

      fetchLeads();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search]);

  return (

    <div className="min-h-screen bg-[#F4F7FE] flex overflow-hidden">

      {/* Sidebar */}

      <div className="w-[270px] bg-gradient-to-b from-[#2563EB] to-[#7C3AED] text-white p-6 flex flex-col justify-between shadow-2xl">

        <div>

          <h1 className="text-4xl font-bold mb-12">
            Smart CRM
          </h1>

          <div className="space-y-4">

            <Link
              to="/dashboard"
              className="flex items-center gap-4 bg-white text-[#2563EB] font-semibold p-4 rounded-2xl shadow-lg"
            >

              <LayoutDashboard size={22} />

              Dashboard

            </Link>

            <Link
              to="/leads"
              className="flex items-center gap-4 hover:bg-white/20 p-4 rounded-2xl transition-all"
            >

              <Users size={22} />

              Leads

            </Link>

            <Link
              to="/analytics"
              className="flex items-center gap-4 hover:bg-white/20 p-4 rounded-2xl transition-all"
            >

              <BarChart3 size={22} />

              Analytics

            </Link>

            <Link
              to="/settings"
              className="flex items-center gap-4 hover:bg-white/20 p-4 rounded-2xl transition-all"
            >

              <Settings size={22} />

              Settings

            </Link>
            <button
  onClick={() => {
    localStorage.removeItem("token");
    window.location.href = "/";
  }}
  className="w-full bg-red-500 text-white p-4 rounded-2xl mt-5 hover:bg-red-600 transition-all"
>
  Logout
</button>

          </div>

        </div>

        <div className="bg-white/20 rounded-3xl p-5">

          <div className="flex items-center gap-4">

            <img
              src="https://i.pravatar.cc/100"
              className="w-14 h-14 rounded-full border-4 border-white"
            />

            <div>

              <h2 className="font-bold text-lg">
                Sujal
              </h2>

              <p className="text-sm text-white/80">
                Admin
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Main */}

      <div className="flex-1 overflow-y-auto p-8">

        {/* Header */}

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold text-[#111827] mb-3">
              Welcome Back 👋
            </h1>

            <p className="text-gray-500 text-lg">
              Manage your business leads professionally
            </p>

          </div>

          <div className="flex items-center gap-5">

            <div className="relative">

              <Search
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search leads..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="bg-white shadow-lg rounded-2xl pl-14 pr-5 py-4 w-[320px] outline-none border border-gray-200"
              />

            </div>

            <div className="w-14 h-14 rounded-2xl bg-white shadow-lg flex items-center justify-center relative">

              <Bell size={22} color="#2563EB" />

              <div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full" />

            </div>

          </div>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-4 gap-6 mb-10">

          <div className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white p-7 rounded-[30px] shadow-xl">

            <p className="text-lg">
              Total Leads
            </p>

            <h2 className="text-5xl font-bold mt-5">
              {leads.length}
            </h2>

          </div>

          <div className="bg-white p-7 rounded-[30px] shadow-xl">

            <p className="text-gray-500">
              New Leads
            </p>

            <h2 className="text-5xl font-bold mt-5 text-[#10B981]">

              {
                leads.filter(
                  (lead) =>
                    lead.status ===
                    "New"
                ).length
              }

            </h2>

          </div>

          <div className="bg-white p-7 rounded-[30px] shadow-xl">

            <p className="text-gray-500">
              Qualified
            </p>

            <h2 className="text-5xl font-bold mt-5 text-[#7C3AED]">

              {
                leads.filter(
                  (lead) =>
                    lead.status ===
                    "Qualified"
                ).length
              }

            </h2>

          </div>

          <div className="bg-gradient-to-r from-[#EC4899] to-[#F43F5E] text-white p-7 rounded-[30px] shadow-xl">

            <p className="text-lg">
              Revenue
            </p>

            <h2 className="text-4xl font-bold mt-5">
              ₹12L
            </h2>

          </div>

        </div>

        {/* Add Lead */}

        <div className="bg-white rounded-[30px] p-8 shadow-xl mb-10">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold text-[#111827]">
              Add New Lead
            </h2>

            <div className="bg-[#EEF2FF] text-[#2563EB] px-5 py-2 rounded-full text-sm font-semibold">
              CRM SYSTEM
            </div>

          </div>

          <div className="grid grid-cols-4 gap-5">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="bg-[#F9FAFB] border border-gray-200 rounded-2xl p-4 outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="bg-[#F9FAFB] border border-gray-200 rounded-2xl p-4 outline-none"
            />

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              className="bg-[#F9FAFB] border border-gray-200 rounded-2xl p-4"
            >

              <option>
                New
              </option>

              <option>
                Qualified
              </option>

              <option>
                Contacted
              </option>

              <option>
                Lost
              </option>

            </select>

            <select
              value={source}
              onChange={(e) =>
                setSource(
                  e.target.value
                )
              }
              className="bg-[#F9FAFB] border border-gray-200 rounded-2xl p-4"
            >

              <option>
                Website
              </option>

              <option>
                Instagram
              </option>

              <option>
                Referral
              </option>

            </select>

          </div>

          <button
            onClick={createLead}
            className="mt-7 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:scale-[1.02] transition-all shadow-lg"
          >

            <Plus size={20} />

            Add New Lead

          </button>

        </div>

        {/* Table */}

        <div className="bg-white rounded-[30px] p-8 shadow-xl overflow-auto">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl font-bold text-[#111827]">
              Leads Management
            </h2>

            <div className="text-gray-500">
              Total: {leads.length}
            </div>

          </div>

          <table className="w-full">

            <thead>

              <tr className="text-left border-b border-gray-200 text-gray-500">

                <th className="pb-5">
                  Lead Name
                </th>

                <th className="pb-5">
                  Email
                </th>

                <th className="pb-5">
                  Status
                </th>

                <th className="pb-5">
                  Source
                </th>

                <th className="pb-5">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {leads.map((lead) => (

                <tr
                  key={lead._id}
                  className="border-b border-gray-100 hover:bg-[#F9FAFB] transition-all"
                >

                  <td className="py-6 font-semibold text-[#111827]">
                    {lead.name}
                  </td>

                  <td className="py-6 text-gray-500">
                    {lead.email}
                  </td>

                  <td className="py-6">

                    <span className="bg-[#EEF2FF] text-[#2563EB] px-4 py-2 rounded-full text-sm font-semibold">

                      {lead.status}

                    </span>

                  </td>

                  <td className="py-6 text-gray-600">
                    {lead.source}
                  </td>

                  <td className="py-6">

                    <button
                      onClick={() =>
                        deleteLead(
                          lead._id
                        )
                      }
                      className="bg-[#FEE2E2] text-[#DC2626] px-5 py-3 rounded-xl hover:bg-[#DC2626] hover:text-white transition-all"
                    >

                      <Trash2 size={18} />

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;