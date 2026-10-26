import { supabase } from '../lib/supabase'

export const getBlogs = async (publishedOnly = true) => {
  let query = supabase
    .from('blogs')
    .select('*')
    .order('published_at', { ascending: false })

  if (publishedOnly) query = query.eq('published', true)

  const { data, error } = await query
  if (error) throw error
  return data
}

export const getBlogBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error) throw error
  return data
}

export const createBlog = async (blogData) => {
  const { data, error } = await supabase
    .from('blogs')
    .insert([blogData])
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateBlog = async (id, blogData) => {
  const { data, error } = await supabase
    .from('blogs')
    .update(blogData)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteBlog = async (id) => {
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id)

  if (error) throw error
  return true
}