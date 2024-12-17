
// connceting to supabase db 
const { createClient } = require('@supabase/supabase-js');

//  supabae url is generated automatically in the supabase website
const supabaseUrl = 'https://nfieedvidaikkqkhhdwo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5maWVlZHZpZGFpa2txa2hoZHdvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzg1OTkyNCwiZXhwIjoyMDQ5NDM1OTI0fQ.bL-icBam6AbYQhFe1BkCAACXyJrTjKfUMHRf7p60Ttw';    
const supabase = createClient(supabaseUrl, supabaseKey)


module.exports = supabase;