import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Home as HomeIcon, 
  LogOut, 
  Trash2, 
  ExternalLink, 
  Filter, 
  CheckCircle, 
  Clock, 
  XCircle,
  Plus,
  Settings as SettingsIcon,
  MessageSquare,
  Save,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import api from '../services/api';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState([]);
  const [properties, setProperties] = useState([]);
  const [settings, setSettings] = useState({
    whatsappTemplate: 'Hello {name}, thank you for inquiring about our {propertyType}. Our consultant will contact you shortly.',
    isWhatsAppEnabled: false,
    whatsappStatus: {
      isReady: false,
      qrCodeData: ''
    }
  });
  const [testPhone, setTestPhone] = useState('');
  const [testingWhatsApp, setTestingWhatsApp] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchData();
  }, [token, navigate]);

  useEffect(() => {
    let interval;
    if (activeTab === 'settings' && token) {
      interval = setInterval(() => {
        api.get('/settings')
          .then(res => {
            if (res.data) setSettings(res.data);
          })
          .catch(err => console.error('Poll error', err));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [activeTab, token]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, propsRes, settingsRes] = await Promise.all([
        api.get('/leads'),
        api.get('/properties'),
        api.get('/settings')
      ]);
      setLeads(leadsRes.data);
      setProperties(propsRes.data);
      if (settingsRes.data) setSettings(settingsRes.data);
    } catch (error) {
      toast.error('Failed to fetch data');
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      await api.put('/settings', settings);
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
    }
  };

  const deleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      await api.delete(`/leads/${id}`);
      setLeads(leads.filter(l => l._id !== id));
      toast.success('Lead deleted');
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/leads/${id}`, { status });
      setLeads(leads.map(l => l._id === id ? { ...l, status } : l));
      toast.success('Status updated');
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const handleTestWhatsApp = async () => {
    if (!testPhone) {
      toast.error('Please enter a phone number to test');
      return;
    }
    setTestingWhatsApp(true);
    try {
      await api.post('/settings/test-whatsapp', { phone: testPhone });
      toast.success('Test message sent! Check your WhatsApp.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send test message');
    } finally {
      setTestingWhatsApp(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-luxury-black">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-black pt-24 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-serif font-bold text-white">Dashboard</h1>
            <p className="text-white/40 text-sm mt-1">Manage your luxury real estate leads and properties</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-2 text-white/60 hover:text-red-400 transition-colors bg-white/5 px-6 py-3 rounded-xl border border-white/10"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('leads')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${activeTab === 'leads' ? 'bg-primary text-luxury-black font-bold' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
          >
            <Users size={18} />
            <span>Leads</span>
          </button>
          <button 
            onClick={() => setActiveTab('properties')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${activeTab === 'properties' ? 'bg-primary text-luxury-black font-bold' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
          >
            <HomeIcon size={18} />
            <span>Properties</span>
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-primary text-luxury-black font-bold' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}
          >
            <SettingsIcon size={18} />
            <span>WhatsApp Automation</span>
          </button>
        </div>

        {/* Content */}
        <div className="luxury-card overflow-hidden">
          {activeTab === 'leads' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="px-6 py-5 text-xs uppercase tracking-widest text-white/40 font-medium">Client</th>
                    <th className="px-6 py-5 text-xs uppercase tracking-widest text-white/40 font-medium">Property</th>
                    <th className="px-6 py-5 text-xs uppercase tracking-widest text-white/40 font-medium">Status</th>
                    <th className="px-6 py-5 text-xs uppercase tracking-widest text-white/40 font-medium">Date</th>
                    <th className="px-6 py-5 text-xs uppercase tracking-widest text-white/40 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {leads.map((lead) => (
                    <tr key={lead._id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-5">
                        <div className="text-white font-medium">{lead.name}</div>
                        <div className="text-white/40 text-xs mt-1">{lead.email} | {lead.phone}</div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium border border-primary/20">
                          {lead.propertyType}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <select 
                          value={lead.status} 
                          onChange={(e) => updateStatus(lead._id, e.target.value)}
                          className={`bg-transparent text-xs font-bold focus:outline-none cursor-pointer ${
                            lead.status === 'Interested' ? 'text-green-400' : 
                            lead.status === 'Not Interested' ? 'text-red-400' : 'text-yellow-400'
                          }`}
                        >
                          <option value="Pending" className="bg-luxury-black text-white">Pending</option>
                          <option value="Interested" className="bg-luxury-black text-white">Interested</option>
                          <option value="Not Interested" className="bg-luxury-black text-white">Not Interested</option>
                        </select>
                      </td>
                      <td className="px-6 py-5 text-white/40 text-sm">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button 
                          onClick={() => deleteLead(lead._id)}
                          className="p-2 text-white/20 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {leads.length === 0 && (
                <div className="py-20 text-center text-white/20 uppercase tracking-widest text-sm">No leads found</div>
              )}
            </div>
          ) : activeTab === 'properties' ? (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Plus size={32} />
              </div>
              <h3 className="text-xl font-serif text-white mb-2">Property Management</h3>
              <p className="text-white/40 text-sm mb-8">Ready to add your next masterpiece to the collection?</p>
              <button className="btn-primary">Add New Property</button>
            </div>
          ) : (
            <div className="p-8 lg:p-12 space-y-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-serif text-white">WhatsApp Integration</h3>
                  <p className="text-white/40 text-sm mt-1">Link your device to enable automated replies</p>
                </div>
                <button 
                  onClick={() => setSettings({...settings, isWhatsAppEnabled: !settings.isWhatsAppEnabled})}
                  className="focus:outline-none"
                >
                  {settings.isWhatsAppEnabled ? (
                    <ToggleRight size={48} className="text-primary" />
                  ) : (
                    <ToggleLeft size={48} className="text-white/20" />
                  )}
                </button>
              </div>

              {/* QR Code Section */}
              <div className="luxury-card p-8 bg-white/5 border-white/10">
                <div className="flex flex-col md:flex-row items-center gap-10">
                  <div className="bg-white p-4 rounded-2xl w-64 h-64 flex items-center justify-center relative overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                    {settings.whatsappStatus?.isReady ? (
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle size={48} className="text-green-500" />
                        </div>
                        <p className="text-luxury-black font-bold uppercase tracking-widest text-xs">WhatsApp Linked</p>
                      </div>
                    ) : settings.whatsappStatus?.qrCodeData ? (
                      <img src={settings.whatsappStatus.qrCodeData} alt="WhatsApp QR Code" className="w-full h-full" />
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
                        <p className="text-luxury-black font-medium text-xs">Generating QR Code...</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    <div>
                      <h4 className="text-xl font-serif text-white mb-2">Connection Status</h4>
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${settings.whatsappStatus?.isReady ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'}`}></div>
                        <span className={`text-sm font-bold uppercase tracking-widest ${settings.whatsappStatus?.isReady ? 'text-green-500' : 'text-red-500'}`}>
                          {settings.whatsappStatus?.isReady ? 'Active & Linked' : 'Disconnected'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <p className="text-white/60 text-sm leading-relaxed">
                        To enable automatic notifications, please scan the QR code using your WhatsApp:
                      </p>
                      <ol className="text-white/40 text-xs space-y-2 list-decimal list-inside">
                        <li>Open WhatsApp on your phone</li>
                        <li>Tap Menu (⋮) or Settings and select Linked Devices</li>
                        <li>Tap on Link a Device</li>
                        <li>Point your phone to this screen to capture the code</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs uppercase tracking-widest text-white/40">Message Template</label>
                  <div className="flex gap-2">
                    <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-primary border border-white/10 cursor-help" title="Replaced with client's name">{`{name}`}</span>
                    <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-primary border border-white/10 cursor-help" title="Replaced with villa/flat/plot">{`{propertyType}`}</span>
                  </div>
                </div>
                <textarea 
                  rows="4"
                  value={settings.whatsappTemplate}
                  onChange={(e) => setSettings({...settings, whatsappTemplate: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-primary/50 focus:outline-none transition-all leading-relaxed"
                  placeholder="Hello {name}, this is from Green Villa..."
                ></textarea>
                <p className="text-[10px] text-white/20">Tip: Use placeholders like {`{name}`} and {`{propertyType}`} to personalize messages.</p>
              </div>

              <div className="pt-4 flex flex-col md:flex-row gap-4">
                <button 
                  onClick={saveSettings}
                  className="btn-primary w-full md:w-auto flex items-center justify-center space-x-2 px-12"
                >
                  <Save size={18} />
                  <span>Save Configuration</span>
                </button>

                {settings.whatsappStatus?.isReady && (
                  <div className="flex-1 flex gap-2">
                    <input 
                      type="tel"
                      value={testPhone}
                      onChange={(e) => setTestPhone(e.target.value)}
                      placeholder="Enter 10-digit number to test"
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary/50 focus:outline-none transition-all text-sm"
                    />
                    <button 
                      onClick={handleTestWhatsApp}
                      disabled={testingWhatsApp}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all text-sm font-bold flex items-center space-x-2 disabled:opacity-50"
                    >
                      {testingWhatsApp ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <MessageSquare size={16} />
                          <span>Test</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
