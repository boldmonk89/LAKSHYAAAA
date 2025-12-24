import { supabase } from "@/integrations/supabase/client";

interface RetryOptions {
  maxRetries?: number;
  retryDelay?: number;
  onRetry?: (attempt: number) => void;
}

export async function invokeWithRetry<T>(
  functionName: string,
  body: any,
  options: RetryOptions = {}
): Promise<{ data: T | null; error: Error | null }> {
  const { maxRetries = 3, retryDelay = 2000, onRetry } = options;
  
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const { data, error } = await supabase.functions.invoke(functionName, { body });
      
      if (error) {
        // Check if it's a wake-up related error
        const isWakeUpError = 
          error.message?.includes('FunctionsFetchError') || 
          error.message?.includes('Failed to fetch') ||
          error.message?.includes('NetworkError') ||
          error.message?.includes('ECONNREFUSED');
        
        if (isWakeUpError && attempt < maxRetries) {
          console.log(`Backend waking up, retry ${attempt}/${maxRetries}...`);
          onRetry?.(attempt);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          continue;
        }
        
        throw error;
      }
      
      return { data: data as T, error: null };
    } catch (err: any) {
      lastError = err;
      
      // Check if we should retry
      const shouldRetry = 
        attempt < maxRetries && 
        (err.message?.includes('fetch') || 
         err.message?.includes('network') ||
         err.message?.includes('ECONNREFUSED'));
      
      if (shouldRetry) {
        console.log(`Retry attempt ${attempt}/${maxRetries} after error:`, err.message);
        onRetry?.(attempt);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }
  
  return { data: null, error: lastError };
}

// Ping health check to wake up backend
export async function wakeUpBackend(): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke('health-check', {});
    return !error && data?.status === 'active';
  } catch {
    return false;
  }
}
