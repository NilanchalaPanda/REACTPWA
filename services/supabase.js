
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://kfxmvgkdjmnkpttimaad.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmeG12Z2tkam1ua3B0dGltYWFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1NDg3NDgsImV4cCI6MjAyNzEyNDc0OH0.T_AVSIWGoU8lAzlvySCGNL9sxkPPG6vXtIIumMA9Vys'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;