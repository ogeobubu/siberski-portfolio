import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  author: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface Analytics {
  totalBlogs: number;
  totalViews: number;
  recentBlogs: BlogPost[];
}

const Admin: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'blogs'>('dashboard');
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    image: ''
  });
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [reactQuillKey, setReactQuillKey] = useState(0);
  const [tiktokUrl, setTiktokUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchTiktokUrl();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        fetchBlogs();
        fetchAnalytics();
      } else {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
      }
    } catch (error) {
      localStorage.removeItem('adminToken');
      router.push('/admin/login');
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/blogs', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    // Mock analytics data - in a real app, you'd have an analytics API
    setAnalytics({
      totalBlogs: blogs.length,
      totalViews: blogs.length * 100, // Mock data
      recentBlogs: blogs.slice(0, 5),
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!formData.title.trim()) {
      showToastNotification('Title is required', 'error');
      return;
    }
    if (!formData.author.trim()) {
      showToastNotification('Author is required', 'error');
      return;
    }
    if (!formData.content.trim()) {
      showToastNotification('Content is required', 'error');
      return;
    }

    setUploading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const url = editingBlog ? `/api/blogs/${editingBlog._id}` : '/api/blogs';
      const method = editingBlog ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchBlogs();
        setFormData({ title: '', content: '', author: '', image: '' });
        setEditingBlog(null);
        showToastNotification(editingBlog ? 'Blog post updated successfully' : 'Blog post created successfully', 'success');
      } else {
        showToastNotification('Failed to save blog post', 'error');
      }
    } catch (error) {
      console.error('Failed to save blog:', error);
      showToastNotification('Failed to save blog post', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      image: blog.image || '',
    });
  };

  const showToastNotification = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDelete = async (id: string) => {
    setBlogToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/blogs/${blogToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchBlogs();
        showToastNotification('Blog post deleted successfully', 'success');
      } else {
        showToastNotification('Failed to delete blog post', 'error');
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
      showToastNotification('Failed to delete blog post', 'error');
    } finally {
      setShowDeleteModal(false);
      setBlogToDelete(null);
    }
  };

  const fetchTiktokUrl = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/settings', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const settings = await response.json();
      setTiktokUrl(settings.tiktokVideoUrl || '');
    } catch (error) {
      console.error('Failed to fetch TikTok URL:', error);
    }
  };

  const handleSaveTiktokUrl = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ tiktokVideoUrl: tiktokUrl }),
      });

      if (response.ok) {
        showToastNotification('TikTok URL updated successfully', 'success');
      } else {
        showToastNotification('Failed to update TikTok URL', 'error');
      }
    } catch (error) {
      console.error('Failed to save TikTok URL:', error);
      showToastNotification('Failed to update TikTok URL', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const handleCancel = () => {
    setEditingBlog(null);
    setFormData({ title: '', content: '', author: '', image: '' });
    // Force re-render of ReactQuill by updating the key
    setReactQuillKey(prev => prev + 1);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formDataUpload,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({ ...formData, image: data.url });
        showToastNotification('Image uploaded successfully', 'success');
      } else {
        showToastNotification('Failed to upload image', 'error');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      showToastNotification('Failed to upload image', 'error');
    } finally {
      setUploading(false);
    }
  };

  // Filtered and paginated blogs
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterAuthor === '' || blog.author.toLowerCase().includes(filterAuthor.toLowerCase()))
  );

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Reset to first page when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterAuthor]);

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  if (authLoading || loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - AMLDecoded</title>
        <meta name="google-site-verification" content="5UE1LEtXWiGmbk9UZJkp3P4JTt4d18RZy6jsVzy7DSU" />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0c0c1d, #111132)',
        color: 'lightgray',
        fontFamily: '"DM Sans", sans-serif'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '15px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{
            margin: 0,
            color: 'white',
            fontSize: '24px',
            fontWeight: '500'
          }}>
            AMLDecoded Admin
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{
              color: '#b0b0b0',
              fontSize: '14px'
            }}>
              Welcome, {user?.username}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                color: 'white',
                border: '1px solid white',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = '#0c0c1d';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'white';
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '0 30px'
        }}>
          <div style={{ display: 'flex', gap: '0' }}>
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{
                padding: '15px 20px',
                border: 'none',
                backgroundColor: activeTab === 'dashboard' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: 'white',
                cursor: 'pointer',
                borderBottom: activeTab === 'dashboard' ? '2px solid orange' : 'none',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('blogs')}
              style={{
                padding: '15px 20px',
                border: 'none',
                backgroundColor: activeTab === 'blogs' ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                color: 'white',
                cursor: 'pointer',
                borderBottom: activeTab === 'blogs' ? '2px solid orange' : 'none',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              Manage Blogs
            </button>
          </div>
        </div>

        {/* Content */}
        <div style={{
          padding: '30px',
          maxWidth: '1366px',
          margin: 'auto'
        }}>
          {activeTab === 'dashboard' && (
            <div>
              <h2 style={{
                color: 'white',
                fontSize: '36px',
                marginBottom: '40px',
                textAlign: 'center'
              }}>
                Dashboard Overview
              </h2>

              {/* TikTok URL Settings */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '30px',
                borderRadius: '12px',
                marginBottom: '50px'
              }}>
                <h3 style={{
                  margin: '0 0 20px 0',
                  color: 'white',
                  fontSize: '24px',
                  textAlign: 'center'
                }}>
                  TikTok Video Settings
                </h3>
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="tiktokUrl" style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: 'white',
                    fontWeight: '500',
                    fontSize: '16px'
                  }}>
                    TikTok Video URL:
                  </label>
                  <input
                    type="url"
                    id="tiktokUrl"
                    value={tiktokUrl}
                    onChange={(e) => setTiktokUrl(e.target.value)}
                    placeholder="https://www.tiktok.com/@username/video/123456789"
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontFamily: '"DM Sans", sans-serif'
                    }}
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={handleSaveTiktokUrl}
                    style={{
                      padding: '15px 30px',
                      backgroundColor: 'orange',
                      color: '#0c0c1d',
                      border: 'none',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(255, 165, 0, 0.3)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 165, 0, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 165, 0, 0.3)';
                    }}
                  >
                    Save TikTok URL
                  </button>
                </div>
              </div>

              {/* Analytics Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px',
                marginBottom: '50px'
              }}
              role="region"
              aria-label="Dashboard Analytics">
                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '30px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'orange',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    fontSize: '24px'
                  }}>
                    📝
                  </div>
                  <h3 style={{
                    margin: '0 0 15px 0',
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: '500'
                  }}>
                    Total Blogs
                  </h3>
                  <p style={{
                    fontSize: '3em',
                    fontWeight: 'bold',
                    margin: '0',
                    color: 'orange'
                  }}>
                    {analytics?.totalBlogs || blogs.length}
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '30px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'orange',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    fontSize: '24px'
                  }}>
                    👁️
                  </div>
                  <h3 style={{
                    margin: '0 0 15px 0',
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: '500'
                  }}>
                    Total Views
                  </h3>
                  <p style={{
                    fontSize: '3em',
                    fontWeight: 'bold',
                    margin: '0',
                    color: 'orange'
                  }}>
                    {analytics?.totalViews || blogs.length * 100}
                  </p>
                </div>

                <div style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '30px',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <div style={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'orange',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    fontSize: '24px'
                  }}>
                    📊
                  </div>
                  <h3 style={{
                    margin: '0 0 15px 0',
                    color: 'white',
                    fontSize: '20px',
                    fontWeight: '500'
                  }}>
                    Recent Activity
                  </h3>
                  <p style={{
                    margin: '0',
                    color: '#b0b0b0',
                    fontSize: '16px'
                  }}>
                    {blogs.length > 0 ? `${blogs.length} blog${blogs.length > 1 ? 's' : ''} published` : 'No blogs yet'}
                  </p>
                </div>
              </div>

              {/* Recent Blogs */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '30px',
                borderRadius: '12px'
              }}>
                <h3 style={{
                  margin: '0 0 30px 0',
                  color: 'white',
                  fontSize: '24px',
                  textAlign: 'center'
                }}>
                  Recent Blog Posts
                </h3>
                {blogs.length > 0 ? (
                  <div style={{ display: 'grid', gap: '20px' }}>
                    {blogs.slice(0, 5).map((blog) => (
                      <div key={blog._id} style={{
                        padding: '20px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      >
                        <div>
                          <h4 style={{
                            margin: '0 0 8px 0',
                            color: 'white',
                            fontSize: '18px',
                            fontWeight: '500'
                          }}>
                            {blog.title}
                          </h4>
                          <p style={{
                            margin: '0',
                            color: '#b0b0b0',
                            fontSize: '14px'
                          }}>
                            By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTab('blogs');
                            handleEdit(blog);
                          }}
                          style={{
                            padding: '10px 20px',
                            backgroundColor: 'transparent',
                            color: 'white',
                            border: '1px solid white',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.color = '#0c0c1d';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'white';
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{
                    margin: '0',
                    color: '#b0b0b0',
                    textAlign: 'center',
                    fontSize: '16px'
                  }}>
                    No blog posts yet. Create your first blog post!
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'blogs' && (
            <div>
              <h2 style={{
                color: 'white',
                fontSize: '36px',
                marginBottom: '40px',
                textAlign: 'center'
              }}>
                Blog Management
              </h2>

              <form onSubmit={handleSubmit} style={{
                marginBottom: '50px',
                padding: '40px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px'
              }}>
                <h3 style={{
                  margin: '0 0 30px 0',
                  color: 'white',
                  fontSize: '24px',
                  textAlign: 'center'
                }}>
                  {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
                </h3>

                <div style={{ marginBottom: '25px' }}>
                  <label htmlFor="title" style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: 'white',
                    fontWeight: '500',
                    fontSize: '16px'
                  }}>
                    Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontFamily: '"DM Sans", sans-serif'
                    }}
                    placeholder="Enter blog title"
                  />
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label htmlFor="author" style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: 'white',
                    fontWeight: '500',
                    fontSize: '16px'
                  }}>
                    Author:
                  </label>
                  <input
                    type="text"
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontFamily: '"DM Sans", sans-serif'
                    }}
                    placeholder="Enter author name"
                  />
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <label htmlFor="image" style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: 'white',
                    fontWeight: '500',
                    fontSize: '16px'
                  }}>
                    Blog Image:
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    style={{
                      width: '100%',
                      padding: '15px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      boxSizing: 'border-box',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontFamily: '"DM Sans", sans-serif'
                    }}
                  />
                  {uploading && <p style={{ color: 'orange', marginTop: '8px' }}>Uploading...</p>}
                  {formData.image && (
                    <div style={{ marginTop: '15px' }}>
                      <img
                        src={formData.image}
                        alt={`Preview of blog image for "${formData.title || 'new blog post'}"`}
                        style={{
                          maxWidth: '200px',
                          maxHeight: '150px',
                          borderRadius: '8px',
                          border: '1px solid rgba(255, 255, 255, 0.2)'
                        }}
                      />
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <label htmlFor="content" style={{
                    display: 'block',
                    marginBottom: '8px',
                    color: 'white',
                    fontWeight: '500',
                    fontSize: '16px'
                  }}>
                    Content:
                  </label>
                  <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    overflow: 'hidden'
                  }}>
                    <ReactQuill
                      key={reactQuillKey}
                      value={formData.content}
                      onChange={(value) => setFormData({ ...formData, content: value })}
                      theme="snow"
                      style={{
                        backgroundColor: 'transparent',
                        color: 'white'
                      }}
                      modules={{
                        toolbar: [
                          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                          ['bold', 'italic', 'underline', 'strike'],
                          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                          [{ 'script': 'sub'}, { 'script': 'super' }],
                          [{ 'indent': '-1'}, { 'indent': '+1' }],
                          [{ 'direction': 'rtl' }],
                          [{ 'color': [] }, { 'background': [] }],
                          [{ 'align': [] }],
                          ['link', 'image', 'video'],
                          ['clean']
                        ],
                      }}
                      formats={[
                        'header', 'bold', 'italic', 'underline', 'strike',
                        'list', 'bullet', 'indent', 'script',
                        'direction', 'color', 'background', 'align',
                        'link', 'image', 'video'
                      ]}
                      placeholder="Enter blog content with rich formatting..."
                    />
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <button
                    type="submit"
                    disabled={uploading}
                    style={{
                      padding: '15px 30px',
                      backgroundColor: uploading ? '#666' : 'orange',
                      color: '#0c0c1d',
                      border: 'none',
                      borderRadius: '25px',
                      cursor: uploading ? 'not-allowed' : 'pointer',
                      fontSize: '16px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      boxShadow: uploading ? 'none' : '0 4px 15px rgba(255, 165, 0, 0.3)'
                    }}
                    onMouseOver={(e) => {
                      if (!uploading) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 165, 0, 0.4)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!uploading) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(255, 165, 0, 0.3)';
                      }
                    }}
                  >
                    {uploading ? 'Saving...' : (editingBlog ? 'Update Blog Post' : 'Create Blog Post')}
                  </button>
                  {editingBlog && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      style={{
                        padding: '15px 30px',
                        marginLeft: '15px',
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: '1px solid white',
                        borderRadius: '25px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.color = '#0c0c1d';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'white';
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>

              {/* Search and Filter Controls */}
              <div style={{
                marginBottom: '30px',
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
                <div style={{ flex: '1', minWidth: '200px' }}>
                  <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontFamily: '"DM Sans", sans-serif'
                    }}
                  />
                </div>
                <div style={{ flex: '1', minWidth: '200px' }}>
                  <input
                    type="text"
                    placeholder="Filter by author..."
                    value={filterAuthor}
                    onChange={(e) => setFilterAuthor(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRadius: '8px',
                      fontSize: '16px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontFamily: '"DM Sans", sans-serif'
                    }}
                  />
                </div>
                <div style={{ color: '#b0b0b0', fontSize: '14px' }}>
                  Showing {filteredBlogs.length} of {blogs.length} blogs
                </div>
              </div>

              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '30px',
                borderRadius: '12px'
              }}>
                <h3 style={{
                  margin: '0 0 30px 0',
                  color: 'white',
                  fontSize: '24px',
                  textAlign: 'center'
                }}>
                  Existing Blog Posts
                </h3>
                {filteredBlogs.length > 0 ? (
                  <>
                    <div style={{ display: 'grid', gap: '20px' }}>
                      {currentBlogs.map((blog) => (
                        <div key={blog._id} style={{
                          padding: '25px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '12px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        >
                          <h4 style={{
                            margin: '0 0 12px 0',
                            color: 'white',
                            fontSize: '20px',
                            fontWeight: '500'
                          }}>
                            {blog.title}
                          </h4>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '15px'
                          }}>
                            <span style={{
                              color: '#b0b0b0',
                              fontSize: '14px'
                            }}>
                              By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div style={{
                            margin: '0 0 20px 0',
                            color: '#b0b0b0',
                            lineHeight: '1.6',
                            fontSize: '15px',
                            maxHeight: '100px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: blog.content.length > 200
                                  ? blog.content.substring(0, 200) + '...'
                                  : blog.content
                              }}
                            />
                          </div>
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                              onClick={() => handleEdit(blog)}
                              style={{
                                padding: '10px 20px',
                                backgroundColor: 'orange',
                                color: '#0c0c1d',
                                border: 'none',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.3s ease'
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-1px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 165, 0, 0.3)';
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(blog._id)}
                              disabled={uploading}
                              style={{
                                padding: '10px 20px',
                                backgroundColor: 'transparent',
                                color: 'white',
                                border: '1px solid #dc3545',
                                borderRadius: '20px',
                                cursor: uploading ? 'not-allowed' : 'pointer',
                                fontSize: '14px',
                                opacity: uploading ? 0.6 : 1,
                                transition: 'all 0.3s ease'
                              }}
                              onMouseOver={(e) => {
                                if (!uploading) {
                                  e.currentTarget.style.backgroundColor = '#dc3545';
                                  e.currentTarget.style.transform = 'translateY(-1px)';
                                }
                              }}
                              onMouseOut={(e) => {
                                if (!uploading) {
                                  e.currentTarget.style.backgroundColor = 'transparent';
                                  e.currentTarget.style.transform = 'translateY(0)';
                                }
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '10px',
                        marginTop: '30px',
                        flexWrap: 'wrap'
                      }}>
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          style={{
                            padding: '8px 12px',
                            backgroundColor: currentPage === 1 ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                            color: currentPage === 1 ? '#666' : 'white',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '6px',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                            minWidth: '80px'
                          }}
                          aria-label="Go to previous page"
                        >
                          Previous
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                          <button
                            key={number}
                            onClick={() => paginate(number)}
                            style={{
                              padding: '8px 12px',
                              backgroundColor: currentPage === number ? 'orange' : 'rgba(255, 255, 255, 0.1)',
                              color: currentPage === number ? '#0c0c1d' : 'white',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              minWidth: '40px'
                            }}
                            aria-label={`Go to page ${number}`}
                            aria-current={currentPage === number ? 'page' : undefined}
                          >
                            {number}
                          </button>
                        ))}

                        <button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          style={{
                            padding: '8px 12px',
                            backgroundColor: currentPage === totalPages ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                            color: currentPage === totalPages ? '#666' : 'white',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '6px',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                            minWidth: '80px'
                          }}
                          aria-label="Go to next page"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <p style={{
                    margin: '0',
                    color: '#b0b0b0',
                    textAlign: 'center',
                    padding: '60px 20px',
                    fontSize: '16px'
                  }}>
                    {blogs.length === 0 ? 'No blog posts yet. Create your first blog post above!' : 'No blogs match your search criteria.'}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '30px',
              maxWidth: '400px',
              width: '90%',
              textAlign: 'center'
            }}>
              <h3 style={{
                color: 'white',
                margin: '0 0 20px 0',
                fontSize: '24px'
              }}>
                Confirm Delete
              </h3>
              <p style={{
                color: '#b0b0b0',
                margin: '0 0 30px 0',
                fontSize: '16px'
              }}>
                Are you sure you want to delete this blog post? This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: 'transparent',
                    color: 'white',
                    border: '1px solid white',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = '#0c0c1d';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'white';
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 53, 69, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {showToast && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: toastType === 'success' ? '#28a745' : '#dc3545',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            zIndex: 1001,
            maxWidth: '300px',
            fontSize: '14px'
          }}>
            {toastMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default Admin;