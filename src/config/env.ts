export const env = {
  emailer: {
    user: process.env.NEXT_PUBLIC_EMAILER_USER as string,
    pass: process.env.NEXT_PUBLIC_EMAILER_PASS as string,
    host: process.env.NEXT_PUBLIC_EMAILER_HOST as string,
  },
  supabase: {
    url:
      (process.env.NEXT_PUBLIC_SUPABASE_URL as string) ||
      "https://svtnrqfblasgxsijeyva.supabase.co",
    key:
      (process.env.NEXT_PUBLIC_SUPABASE_KEY as string) ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2dG5ycWZibGFzZ3hzaWpleXZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5MTY1MTQsImV4cCI6MjA2MTQ5MjUxNH0.JSB1GDIF-kIsRYv9IUpAXdSvI_iePIkRykASE5W349c",
  },
};
