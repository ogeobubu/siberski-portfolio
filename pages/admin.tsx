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
    author: ''
  });
  const router = useRouter();

  useEffect(() => {
    checkAuth();
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
        setFormData({ title: '', content: '', author: '' });
        setEditingBlog(null);
      }
    } catch (error) {
      console.error('Failed to save blog:', error);
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          fetchBlogs();
        }
      } catch (error) {
        console.error('Failed to delete blog:', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  const handleCancel = () => {
    setEditingBlog(null);
    setFormData({ title: '', content: '', author: '' });
  };

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

              {/* Analytics Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '30px',
                marginBottom: '50px'
              }}>
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
                    {editingBlog ? 'Update Blog Post' : 'Create Blog Post'}
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
                {blogs.length > 0 ? (
                  <div style={{ display: 'grid', gap: '20px' }}>
                    {blogs.map((blog) => (
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
                            style={{
                              padding: '10px 20px',
                              backgroundColor: 'transparent',
                              color: 'white',
                              border: '1px solid #dc3545',
                              borderRadius: '20px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.backgroundColor = '#dc3545';
                              e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{
                    margin: '0',
                    color: '#b0b0b0',
                    textAlign: 'center',
                    padding: '60px 20px',
                    fontSize: '16px'
                  }}>
                    No blog posts yet. Create your first blog post above!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;