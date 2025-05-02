"use client";

import { env } from "@src/config/env";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = env.supabase.url;
const supabaseAnonKey = env.supabase.key;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
