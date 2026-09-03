import { supabase } from './supabase';
import type { Lang } from '../i18n/ui';

interface DbPost {
  id: string;
  title: string;
  description: string;
  slug: string;
  lang: string;
  content: string;
  category: string | null;
  tags: string[];
  author: string;
  canonical: string | null;
  og_image: string | null;
  robots: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  slug: string;
  lang: Lang;
  content: string;
  category: string | null;
  tags: string[];
  author: string;
  canonical: string | null;
  ogImage: string | null;
  robots: string;
  publishedAt: Date;
  updatedAt: Date;
}

function toAppPost(row: DbPost): Post {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    slug: row.slug,
    lang: row.lang as Lang,
    content: row.content,
    category: row.category,
    tags: row.tags,
    author: row.author,
    canonical: row.canonical,
    ogImage: row.og_image,
    robots: row.robots,
    publishedAt: new Date(row.published_at ?? row.created_at),
    updatedAt: new Date(row.updated_at),
  };
}

export async function getPublishedPosts(lang: Lang): Promise<Post[]> {
  const { data, error } = await supabase
    .from('ilbira_posts')
    .select('*')
    .eq('lang', lang)
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) throw error;
  return (data as DbPost[]).map(toAppPost);
}

export async function getAllPublishedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('ilbira_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (error) throw error;
  return (data as DbPost[]).map(toAppPost);
}

export async function getPostBySlug(slug: string, lang: Lang): Promise<Post | null> {
  const { data, error } = await supabase
    .from('ilbira_posts')
    .select('*')
    .eq('slug', slug)
    .eq('lang', lang)
    .eq('published', true)
    .maybeSingle();

  if (error) throw error;
  return data ? toAppPost(data as DbPost) : null;
}
