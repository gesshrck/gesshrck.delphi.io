
/**
 * Session Logging Utility
 * Isolated for stability and easier debugging reconciliation.
 */

export const logSession = (action: string, details?: any) => {
  const timestamp = new Date().toLocaleTimeString();
  const detailStr = details ? JSON.stringify(details) : '';
  
  // Console styling
  const labelStyle = 'color: #667eea; font-weight: bold;';
  const textStyle = 'color: #333;';

  console.log(
    `%c[SESSION] ${timestamp} %c${action}`, 
    labelStyle, 
    textStyle, 
    detailStr
  );
};
