
// connceting to supabase db 
const { createClient } = require('@supabase/supabase-js');

//  supabae url is generated automatically in the supabase website
const supabaseUrl = 'https://nfieedvidaikkqkhhdwo.supabase.co'
const supabaseKey = "process.env.SUPABASE_KEY"  
const supabase = createClient(supabaseUrl, supabaseKey)


module.exports = supabase;