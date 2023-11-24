import React from 'react'
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import EventScheduler from './EventPage';

const supabase = createClient(
  "https://uxealwfgmsdsnfijkrep.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4ZWFsd2ZnbXNkc25maWprcmVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5NTcwNjQsImV4cCI6MjAxMzUzMzA2NH0.yuF4-8WCJD28GFywJppCHX1GBuP2G5yMSMFVuuNJWGg" 
);

const Event_sch = () => {
  return (
    <>
      <SessionContextProvider supabaseClient={supabase}>
        <EventScheduler />
      </SessionContextProvider>
    </>
  )
}

export default Event_sch