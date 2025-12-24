import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const now = new Date();
  const indianTime = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  
  console.log(`Health check pinged at: ${indianTime}`);

  return new Response(
    JSON.stringify({ 
      status: 'active',
      message: 'Lakshya Defence Academy backend is running!',
      timestamp: indianTime,
      uptime: 'Backend is awake and ready'
    }),
    { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200 
    }
  );
});
