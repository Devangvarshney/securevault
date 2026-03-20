import React, { useState, useEffect, useCallback } from "react";
import { Plus, Trash2, X, FileText, Zap, Search, Download, Upload, Folder } from "lucide-react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";
const TOKEN_KEY = "access"; 

const DocumentVault = () => {
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Unified Auth Header
  const getAuthHeader = useCallback(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  }, []);

  // 2. Fetch Files
  const fetchFiles = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return;

    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}posts/`, getAuthHeader());
      setFiles(Array.isArray(res.data) ? res.data : []);
      console.log("MY DATA:", res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
      if (err.response?.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
      }
    } finally {
      setLoading(false);
    }
  }, [getAuthHeader]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // 3. Login Logic
  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}login/`, {
        username: "your_username", 
        password: "your_password",
      });

      if (res.data.access) {
        localStorage.setItem(TOKEN_KEY, res.data.access);
        alert("Login success");
        fetchFiles();
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Login failed.");
    }
  };

  // 4. Upload Logic
  const handleUpload = async (file) => {
    if (!file) return;
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      alert("Please login again.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);

    try {
      setLoading(true);
      const res = await axios.post(
        `${API_URL}posts/create/`, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFiles((prev) => [...prev, res.data]);
      setIsModalOpen(false);
      alert("Upload Successful!");
    } catch (err) {
      console.error("Upload Error:", err.response?.data);
      alert("Upload failed. Check Console.");
    } finally {
      setLoading(false);
    }
  };

  // 5. Delete Logic
  const deleteFile = async (id) => {
    if (!window.confirm("Delete this document?")) return;
    try {
      await axios.delete(`${API_URL}posts/delete/${id}/`, getAuthHeader());
      setFiles((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const filteredFiles = files.filter((f) =>
    f.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-sans overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="relative z-20 p-4 flex justify-end">
        <button onClick={login} className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-xl font-bold transition-all">
          Quick Login
        </button>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tighter mb-4">Secure Vault</h1>
          <p className="text-gray-500 mb-8 font-mono text-sm uppercase">Encrypted Personal Storage</p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-indigo-500 transition-all backdrop-blur-md"
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 px-8 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Plus className="w-5 h-5" /> Add Document
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 animate-pulse text-indigo-400 font-mono text-xs">ACCESSING VAULT...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-3xl flex items-center gap-4">
               <Folder className="w-10 h-10 text-indigo-400" />
               <div>
                 <h3 className="font-bold">Files</h3>
                 <p className="text-xs text-gray-500">{filteredFiles.length} items</p>
               </div>
            </div>

            {filteredFiles.map((file) => (
              <div key={file.id} className="bg-[#0f1115]/60 border border-white/10 p-5 rounded-3xl hover:border-indigo-500/40 transition-all group backdrop-blur-sm relative">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-white/5 rounded-2xl">
                    <FileText className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* ✅ Corrected Download/View Logic */}
                    <button 
                      onClick={() => window.open(file.file, "_blank", "noopener,noreferrer")}
                      className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white"
                    >
                      <Download size={18}/>
                    </button>
                    <button onClick={() => deleteFile(file.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-400">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <h3 className="text-sm font-semibold truncate mb-1">{file.name}</h3>
                <p className="text-[10px] text-gray-500 font-mono uppercase">
                  {new Date(file.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-[#0f1115] border border-white/10 rounded-[2rem] p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Secure Upload</h2>
              <X className="cursor-pointer text-gray-500 hover:text-white" onClick={() => setIsModalOpen(false)} />
            </div>

            <div 
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-3xl p-12 transition-all flex flex-col items-center justify-center gap-4 ${
                dragActive ? "border-indigo-500 bg-indigo-500/10" : "border-white/10 bg-black/20"
              }`}
            >
              <Upload className="w-8 h-8 text-indigo-400" />
              <p className="text-sm font-medium">Drag & Drop your files here</p>
              
              <label className="mt-4 bg-white text-black px-6 py-2 rounded-full text-sm font-bold cursor-pointer hover:bg-gray-200">
                Browse Files
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={(e) => handleUpload(e.target.files[0])} 
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentVault;