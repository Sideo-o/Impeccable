import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase configuration. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local");
}

export const supabaseClient = createClient(supabaseUrl, supabaseKey);

// Helper function to upload files to storage
export async function uploadFile(
  bucket: string,
  path: string,
  file: File
): Promise<string | null> {
  try {
    const { data, error } = await supabaseClient.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Upload error:', error)
      return null
    }

    const { data: publicUrl } = supabaseClient.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return publicUrl.publicUrl
  } catch (error) {
    console.error('Upload failed:', error)
    return null
  }
}

// Helper function to delete files from storage
export async function deleteFile(bucket: string, path: string): Promise<boolean> {
  try {
    const { error } = await supabaseClient.storage.from(bucket).remove([path])
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
