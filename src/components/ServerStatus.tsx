import { useState, useEffect } from 'react';
import { apiService, type ServerStatus } from '../services/api';

export function ServerStatus() {
  const [status, setStatus] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const serverStatus = await apiService.getServerStatus();
        setStatus(serverStatus);
        setError(null);
      } catch (err) {
        setError('Failed to connect to server');
        console.error('Server status error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading server status...</div>;

  if (error) {
    return (
      <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4">
        <p className="text-red-300">{error}</p>
        <p className="text-sm text-red-400 mt-2">Make sure the backend server is running on port 4000</p>
      </div>
    );
  }

  return (
    <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-green-300 font-semibold">Server Status</h3>
          <p className="text-sm text-green-400">
            {status?.online ? 'Online' : 'Offline'} - {status?.host}:{status?.port}
          </p>
          {status?.players && (
            <p className="text-sm text-green-400">
              Players: {status.players.online}/{status.players.max}
            </p>
          )}
        </div>
        <div className={`w-3 h-3 rounded-full ${status?.online ? 'bg-green-500' : 'bg-red-500'}`} />
      </div>
    </div>
  );
}
