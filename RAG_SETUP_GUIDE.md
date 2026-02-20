# How to Set Up Supabase for RAG

## 1. Create a Project
Go to [supabase.com](https://supabase.com) and create a free project.

## 2. Enable Vector Extension
In the SQL Editor, run:
```sql
create extension if not exists vector;
```

## 3. Create Documents Table
Create a table to store your church knowledge chunks. Gemini's `embedding-001` model outputs 768 dimensions.
```sql
create table documents (
  id bigserial primary key,
  content text,
  metadata jsonb,
  embedding vector(768)
);
```

## 4. Create Search Function (RPC)
This function allows us to search for similar vectors (cosine distance).
```sql
create or replace function match_documents (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    documents.id,
    documents.content,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
end;
$$;
```

## 5. Get Credentials
Go to Project Settings > API.
Copy the **Project URL** and **anon public** key into your `.env` file.
