import api from 'api';
import { InewPosts } from 'interfaces/posts';

export const posts = () => api({ endpoint: `posts` });

export const newPosts = (data: InewPosts) =>
  api({ endpoint: `posts`, method: 'POST', data });

export const editPosts = (data: InewPosts) =>
  api({ endpoint: `posts/${data.id}`, method: 'PUT', data });

export const deletePosts = (data: { id: number }) =>
  api({ endpoint: `posts/${data.id}`, method: 'DELETE' });
