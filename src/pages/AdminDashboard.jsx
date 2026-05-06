import React, { useEffect, useState } from 'react';
import { db, auth } from '../config/firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, CheckCircle, HandHeart, FileSpreadsheet, MapPin, Phone } from 'lucide-react';
import { content } from '../data/content';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // We'll use English content for labels in the admin panel
  const sevaOptions = content.EN.sevaOptions;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedUsers = [];
        querySnapshot.forEach((doc) => {
          fetchedUsers.push({ id: doc.id, ...doc.data() });
        });
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  const exportToExcel = () => {
    if (users.length === 0) return;

    const headers = ["Name", "Email", "WhatsApp", "Pincode", "Pledge Accepted", "Sevas Selected", "Date"];
    const rows = users.map(user => {
      const sevas = user.selectedSevas && user.selectedSevas.length > 0
        ? user.selectedSevas.map(idx => sevaOptions[idx]).join(" | ")
        : "None";
        
      return [
        `"${user.name}"`,
        `"${user.email}"`,
        `"${user.whatsapp}"`,
        `"${user.pincode}"`,
        user.pledgeAccepted ? "Yes" : "No",
        `"${sevas}"`,
        user.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleString() : "N/A"
      ];
    });

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Kumbh_Parv_Users_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalUsers = users.length;
  const totalPledges = users.filter(u => u.pledgeAccepted).length;
  const totalSevas = users.filter(u => u.selectedSevas && u.selectedSevas.length > 0).length;

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Analytics Dashboard</h2>
          <p className="text-gray-500">Overview of KumbhParv 2026 Registrations</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={exportToExcel}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-xl font-semibold border border-green-100 hover:bg-green-100 transition-all"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          <button 
            onClick={handleLogout}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-semibold border border-red-100 hover:bg-red-100 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shadow-inner">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Registrations</p>
            <p className="text-3xl font-black text-gray-800">{totalUsers}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
          <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center shadow-inner">
            <CheckCircle className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Pledges Taken</p>
            <p className="text-3xl font-black text-gray-800">{totalPledges}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
          <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center shadow-inner">
            <HandHeart className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Seva Volunteers</p>
            <p className="text-3xl font-black text-gray-800">{totalSevas}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 bg-gray-50/30">
          <h3 className="font-bold text-lg text-gray-800">Recent Registrations</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-widest">
                <th className="p-6 font-bold border-b border-gray-100">User Information</th>
                <th className="p-6 font-bold border-b border-gray-100">Contact Details</th>
                <th className="p-6 font-bold border-b border-gray-100">Engagement & Seva Selected</th>
                <th className="p-6 font-bold border-b border-gray-100">Registration Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-6">
                    <div className="font-bold text-gray-800 text-base">{user.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {user.pincode}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="text-sm font-medium text-gray-700">{user.email}</div>
                    <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {user.whatsapp}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col gap-2 max-w-md">
                      {user.pledgeAccepted && (
                        <div>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-tighter">Pledge Accepted</span>
                        </div>
                      )}
                      {user.selectedSevas && user.selectedSevas.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {user.selectedSevas.map((sevaIdx, i) => (
                            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-medium bg-orange-50 text-orange-600 border border-orange-100">
                              {sevaOptions[sevaIdx]}
                            </span>
                          ))}
                        </div>
                      ) : (
                        !user.pledgeAccepted && <span className="text-gray-300 text-xs italic">No activity yet</span>
                      )}
                    </div>
                  </td>
                  <td className="p-6 text-sm text-gray-500 font-medium">
                    {user.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-12 text-center text-gray-400 italic">No users registered yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
