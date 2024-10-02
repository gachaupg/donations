import React, { useState, useEffect } from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import axios from 'axios';

const Admin = () => {
  const [title, setTitle] = useState('');
  const [desc, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('create');
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null); // For handling updates

  // Fetch posts for the manage posts section
  useEffect(() => {
    if (activeTab === 'manage') {
      axios.get('https://house-new.netlify.app/.netlify/functions/api/ruben')
        .then(response => {
          setPosts(response.data);
        })
        .catch(error => console.error('Error fetching posts:', error));
    }
  }, [activeTab]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || (!image && !editingPost)) {
      alert('Please fill all fields!');
      return;
    }

    setUploading(true);

    // If updating a post, we might not upload a new image
    let imageUrl = editingPost?.image || '';

    // Upload a new image if one is selected
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on('state_changed',
        (snapshot) => { },
        (error) => {
          console.error('Error uploading file:', error);
          setUploading(false);
        },
        async () => {
          imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
          await handlePostSave(imageUrl);
        }
      );
    } else {
      await handlePostSave(imageUrl); // No new image uploaded
    }
  };

  const handlePostSave = async (imageUrl) => {
    try {
      const postData = { title, desc, image: imageUrl };

      if (editingPost) {
        // Update existing post
        await axios.put(`https://house-new.netlify.app/.netlify/functions/api/ruben/${editingPost._id}`, postData);
        alert('Post updated successfully!');
      } else {
        // Create new post
        await axios.post('https://house-new.netlify.app/.netlify/functions/api/ruben/create', postData);
        alert('Post created successfully!');
      }

      setTitle('');
      setDescription('');
      setImage(null);
      setEditingPost(null); // Clear editing state
      setActiveTab('manage'); // Switch back to the manage tab
    } catch (error) {
      console.error('Error saving post:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://house-new.netlify.app/.netlify/functions/api/ruben/${id}`);
      setPosts(posts.filter(post => post._id !== id));
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setDescription(post.desc);
    setEditingPost(post); // Set the current post for editing
    setActiveTab('create'); // Switch to the create tab to show the form
  };

  const renderCreateForm = () => (
    <form className='text-slate-800' onSubmit={handleSubmit} style={{ padding: '20px', borderRadius: '8px', background: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2>{editingPost ? 'Update Post' : 'Create a New Post'}</h2>
      <div className='text-slate-800' style={{ marginBottom: '15px' }}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <div className='text-slate-800' style={{ marginBottom: '15px' }}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={desc}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          style={{ width: '100%' }}
        />
      </div>
      <button type="submit" disabled={uploading} style={{ padding: '10px', background: '#28a745', color: '#fff', borderRadius: '4px' }}>
        {uploading ? 'Uploading...' : (editingPost ? 'Update' : 'Submit')}
      </button>
    </form>
  );

  const renderManagePosts = () => (
    <div className='small' style={{ padding: '20px', borderRadius: '8px', background: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 className='text-white' >Manage Posts</h2>
      <div  style={{ border: '2px solid #374151', borderRadius: '8px', overflow: 'hidden' }}>
  <table className='border-slate-700' style={{ width: '100%', borderSpacing: '0' }}>
    <thead>
      <tr  >
        <th style={{ border: '1px solid ', padding: '10px', borderRadius: '0' }}>
          Image</th>
        <th style={{ border: '1px solid', padding: '10px', borderRadius: '0' }}>Title</th>
        <th style={{ border: '1px solid', padding: '10px', borderRadius: '0' }}>Description</th>
        <th style={{ border: '1px solid', padding: '10px', borderRadius: '0' }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {posts.map(post => (
        <tr key={post._id}>
          <td style={{ border: '1px solid ', padding: '10px' }}>
            <img src={post.image} alt={post.title} style={{ width: '30px', height: 'auto' }} />
          </td>
          <td style={{ border: '1px solid ', padding: '10px' }}>{post.title}</td>
          <td style={{ border: '1px solid ', padding: '10px' }}>{post.desc}</td>
          <td className='' style={{ border: '1px solid ', padding: '10px' }}>
            <button className='w-24 ' onClick={() => handleEdit(post)} style={{ marginRight: '10px', padding: '5px', background: '#007bff', color: '#fff', borderRadius: '4px' }}>
              Edit
            </button>
            <button className='w-24 mt-7' onClick={() => handleDelete(post._id)} style={{ padding: '5px', background: '#dc3545', color: '#fff', borderRadius: '4px' }}>
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );

  return (
    <div className='text-slate-800 sidebar' style={{ display: 'flex', height: '100vh' }}>
      <div className='text-slate-800 small  ' style={{ width: '200px', background: '#333', color: '#fff', padding: '20px' }}>
        <h3 className='text-white' >Dashboard</h3>
        <ul className='text-slate-800 tab' style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <button
              onClick={() => { setActiveTab('create'); setEditingPost(null); }} // Clear editing state when creating a new post
              style={{
                width: '100%',
                padding: '10px',
                background: activeTab === 'create' ? '#007bff' : '#444',
                color: '#fff',
                borderRadius: '4px'
              }}
            >
              Create Post
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab('manage')}
              style={{
                width: '100%',
                padding: '10px',
                background: activeTab === 'manage' ? '#007bff' : '#444',
                color: '#fff',
                borderRadius: '4px'
              }}
            >
              Manage Posts
            </button>
          </li>
        </ul>
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        {activeTab === 'create' ? renderCreateForm() : renderManagePosts()}
      </div>
    </div>
  );
};

export default Admin;
