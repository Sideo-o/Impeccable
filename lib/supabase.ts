import { createClient } from '@supabase/supabase-js'

// Client-side Supabase client for browser operations
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Server-side Supabase client (for API routes)
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

// Upload file to Supabase Storage
export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<string | null> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Upload error:', error)
      return null
    }

    // Get public URL
    const { data: publicUrl } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return publicUrl.publicUrl
  } catch (error) {
    console.error('Upload failed:', error)
    return null
  }
}

// Delete file from Supabase Storage
export async function deleteFile(bucket: string, path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path])
    if (error) {
      console.error('Delete error:', error)
      return false
    }
    return true
  } catch (error) {
    console.error('Delete failed:', error)
    return false
  }
}
