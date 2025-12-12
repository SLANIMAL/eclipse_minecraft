import { Award, TrendingUp, Gift, ExternalLink, Users, Activity } from 'lucide-react';
import { Button } from '../components/Button';
import bgImage from '../assets/bg.png';
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { apiService, LinkedProfileResponse, ServerStatus, VoteClaimResponse, VotePlatform } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const topVoters = [
  { rank: 1, name: 'Player123', votes: 2850 },
  { rank: 2, name: 'VoteLord', votes: 2720 },
  { rank: 3, name: 'CommunityGuy', votes: 2645 },
  { rank: 4, name: 'Voter99', votes: 2510 },
  { rank: 5, name: 'HeartVoter', votes: 2398 },
];

const milestoneRewards = [
  { votes: 10, reward: 'Cosmetic Item', bonus: '100 Bonus Coins' },
  { votes: 25, reward: 'Exclusive Skin', bonus: '250 Bonus Coins' },
  { votes: 50, reward: 'Rank Upgrade Token', bonus: '500 Bonus Coins' },
  { votes: 100, reward: 'Legendary Title', bonus: '1000 Bonus Coins' },
];

export function Vote() {
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
  const [statusLoading, setStatusLoading] = useState(true);
  const [platforms, setPlatforms] = useState<VotePlatform[]>([]);
  const [platformsLoading, setPlatformsLoading] = useState(true);
  const [platformError, setPlatformError] = useState<string | null>(null);
  const [profileResponse, setProfileResponse] = useState<LinkedProfileResponse | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [linkInput, setLinkInput] = useState('');
  const [linkLoading, setLinkLoading] = useState(false);
  const [linkSuccess, setLinkSuccess] = useState<string | null>(null);
  const [voteStatuses, setVoteStatuses] = useState<Record<string, VoteClaimResponse>>({});
  const [voteMessages, setVoteMessages] = useState<Record<string, { type: 'success' | 'error' | 'info'; text: string }>>({});
  const [claimingService, setClaimingService] = useState<string | null>(null);
  const { user, session, loading: authLoading } = useAuth();
  const accessToken = session?.access_token;

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        const status = await apiService.getServerStatus();
        setServerStatus(status);
      } catch (error) {
        console.error('Failed to fetch server status:', error);
      } finally {
        setStatusLoading(false);
      }
    };

    fetchServerStatus();
    // Refresh every 30 seconds
    const interval = setInterval(fetchServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const data = await apiService.getVotePlatforms();
        setPlatforms(data);
      } catch (error) {
        console.error('Failed to load vote platforms:', error);
        setPlatformError('Unable to load vote platforms right now.');
      } finally {
        setPlatformsLoading(false);
      }
    };

    fetchPlatforms();
  }, []);

  const fetchLinkedProfile = async () => {
    if (!accessToken) {
      setProfileResponse(null);
      return;
    }

    try {
      const linked = await apiService.getLinkedProfile(accessToken);
      setProfileResponse(linked);
      setLinkInput(linked.profile?.username ?? '');
      setProfileError(null);
    } catch (error) {
      console.error('Failed to load linked profile:', error);
      setProfileError('Unable to load your linked Minecraft username.');
    }
  };

  useEffect(() => {
    if (!accessToken) {
      setProfileResponse(null);
      setLinkInput('');
      return;
    }
    fetchLinkedProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const isLinked = Boolean(profileResponse?.linked && profileResponse.profile?.username);

  const handleLinkProfile = async () => {
    if (!accessToken || !linkInput.trim()) {
      setProfileError('Enter a valid Minecraft username.');
      return;
    }
    setLinkLoading(true);
    setLinkSuccess(null);
    setProfileError(null);
    try {
      await apiService.linkMinecraftProfile(linkInput.trim(), accessToken);
      setLinkSuccess('Username linked successfully!');
      await fetchLinkedProfile();
    } catch (error) {
      console.error('Failed to link username:', error);
      setProfileError(error instanceof Error ? error.message : 'Failed to link username.');
    } finally {
      setLinkLoading(false);
    }
  };

  const updateVoteMessage = (serviceId: string, type: 'success' | 'error' | 'info', text: string) => {
    setVoteMessages((prev) => ({
      ...prev,
      [serviceId]: { type, text },
    }));
  };

  const handleVote = async (serviceId: string) => {
    if (authLoading || claimingService) return;

    if (!user || !accessToken) {
      updateVoteMessage(serviceId, 'error', 'Log in to vote and earn rewards.');
      return;
    }

    if (!isLinked) {
      updateVoteMessage(serviceId, 'error', 'Link your Minecraft username to vote.');
      return;
    }

    try {
      setClaimingService(serviceId);
      const result = await apiService.claimVote(serviceId, accessToken);
      setVoteStatuses((prev) => ({ ...prev, [serviceId]: result }));

      if (result.cooldownActive) {
        const next = result.nextVoteAt ? new Date(result.nextVoteAt) : null;
        updateVoteMessage(
          serviceId,
          'info',
          next ? `Next vote available ${formatRelativeTime(next)}.` : 'Please wait before voting again.',
        );
        return;
      }

      updateVoteMessage(serviceId, 'success', 'Vote recorded! Completing it on the listing unlocks rewards.');
      if (result.redirectUrl) {
        window.open(result.redirectUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('Failed to claim vote:', error);
      updateVoteMessage(
        serviceId,
        'error',
        error instanceof Error ? error.message : 'Failed to start the vote. Try again shortly.',
      );
    } finally {
      setClaimingService(null);
    }
  };

  const formatRelativeTime = (date: Date) => {
    const diff = date.getTime() - Date.now();
    if (diff <= 0) return 'soon';
    const minutes = Math.round(diff / 60000);
    if (minutes < 60) return `in ${minutes} min`;
    const hours = Math.round(minutes / 60);
    if (hours < 24) return `in ${hours} hr`;
    const days = Math.round(hours / 24);
    return `in ${days} day${days > 1 ? 's' : ''}`;
  };

  const voteButtonLabel = (platform: VotePlatform) => {
    if (!user) return 'Login to vote';
    if (!isLinked) return 'Link IGN to vote';
    const status = voteStatuses[platform.id];
    if (claimingService === platform.id) return 'Processing...';
    if (status?.cooldownActive && status.nextVoteAt) {
      return `Ready ${formatRelativeTime(new Date(status.nextVoteAt))}`;
    }
    return 'Vote Now';
  };

  const canVote = (platform: VotePlatform) => {
    if (!user || !isLinked || authLoading) return false;
    const status = voteStatuses[platform.id];
    if (claimingService === platform.id) return false;
    if (status?.cooldownActive && status.nextVoteAt && new Date(status.nextVoteAt).getTime() > Date.now()) {
      return false;
    }
    return true;
  };

  const sortedPlatforms = useMemo(() => {
    return [...platforms].sort((a, b) => a.name.localeCompare(b.name));
  }, [platforms]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(1,4,9,0.95) 0%, rgba(1,4,9,0.75) 35%, rgba(1,4,9,0.4) 75%, rgba(1,4,9,0.85) 100%), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Server Status Banner */}
          <div className="mb-12">
            <div className="bg-gradient-to-r from-minecraft-accent/10 to-minecraft-green/10 border border-minecraft-accent/30 rounded-2xl p-6 backdrop-blur-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${serverStatus?.online ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                  <div>
                    <h3 className="text-minecraft-green font-bold text-lg">Server Status</h3>
                    <p className="text-gray-400">
                      {statusLoading ? 'Checking...' : serverStatus?.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                {serverStatus?.online && (
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-minecraft-accent" />
                      <span className="text-gray-300">
                        {serverStatus.players?.online || 0}/{serverStatus.players?.max || 0}
                      </span>
                    </div>
                    {serverStatus.latency && (
                      <div className="flex items-center gap-2">
                        <Activity size={16} className="text-minecraft-accent" />
                        <span className="text-gray-300">{serverStatus.latency}ms</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <h1 className="font-pixel text-4xl sm:text-5xl mb-4 text-minecraft-accent text-center">
            Vote for Eclipse Minecraft
          </h1>
          <p className="text-gray-400 text-center mb-16">
            Support our server and earn exclusive rewards with every vote!
          </p>

          <div className="space-y-6 mb-12">
            {!user && !authLoading && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-sm text-red-200 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>Login to track your votes and unlock in-game rewards.</div>
                <Link to="/login">
                  <Button variant="accent" size="sm">
                    Go to Login
                  </Button>
                </Link>
              </div>
            )}

            {user && !authLoading && !isLinked && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <h3 className="text-amber-300 font-semibold mb-3">Link your Minecraft username</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Rewards are delivered to your Minecraft account. Enter the exact in-game name below.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    placeholder="Minecraft Username"
                    className="flex-1 bg-minecraft-dark border border-minecraft-accent/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-minecraft-accent"
                  />
                  <Button variant="accent" onClick={handleLinkProfile} disabled={linkLoading}>
                    {linkLoading ? 'Linking...' : 'Link Username'}
                  </Button>
                </div>
                {profileError && <p className="text-red-300 text-sm mt-2">{profileError}</p>}
                {linkSuccess && <p className="text-emerald-300 text-sm mt-2">{linkSuccess}</p>}
              </div>
            )}

            {platformError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-sm text-red-200">
                {platformError}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {platformsLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="bg-minecraft-dark/40 border border-minecraft-accent/10 rounded-2xl h-64 animate-pulse"
                  />
                ))
              : sortedPlatforms.map((platform) => {
                  const message = voteMessages[platform.id];
                  return (
                    <div
                      key={platform.id}
                      className="group relative bg-gradient-to-br from-minecraft-dark/60 to-minecraft-dark/40 border border-minecraft-accent/20 rounded-2xl overflow-hidden backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-minecraft-accent/40"
                    >
                      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-minecraft-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="p-8 text-center relative">
                        <div className="text-6xl mb-4 transition-transform duration-300 group-hover:scale-110">
                          {platform.icon}
                        </div>
                        <h3 className="text-xl font-bold text-minecraft-green mb-2">{platform.name}</h3>
                        <p className="text-xs text-gray-400 mb-4">{platform.description}</p>
                        <div className="inline-flex items-center gap-2 bg-minecraft-accent/20 px-4 py-2 rounded-full mb-4">
                          <Gift size={16} className="text-minecraft-accent" />
                          <span className="text-minecraft-accent font-bold">{platform.rewardCoins} Coins</span>
                        </div>
                        <Button
                          variant="accent"
                          className="w-full"
                          disabled={!canVote(platform)}
                          onClick={() => handleVote(platform.id)}
                        >
                          <span className="flex items-center justify-center gap-2">
                            {voteButtonLabel(platform)}
                            <ExternalLink size={16} />
                          </span>
                        </Button>
                        {message && (
                          <p
                            className={`text-xs mt-3 ${
                              message.type === 'error'
                                ? 'text-red-300'
                                : message.type === 'success'
                                ? 'text-emerald-300'
                                : 'text-amber-200'
                            }`}
                          >
                            {message.text}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
          </div>

          <div className="bg-gradient-to-br from-minecraft-accent/10 to-minecraft-accent/5 border border-minecraft-accent/30 rounded-2xl p-8 backdrop-blur-lg mb-16">
            <h2 className="font-pixel text-2xl mb-6 text-minecraft-green flex items-center gap-2">
              <TrendingUp size={28} className="text-minecraft-accent" /> Voting Streak Bonus
            </h2>
            <div className="space-y-6">
              <p className="text-gray-300 text-lg">
                Vote every day to increase your streak multiplier and earn more rewards!
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[1, 3, 7, 14, 30].map((day) => (
                  <div key={day} className="group bg-gradient-to-br from-minecraft-dark/60 to-minecraft-dark/40 border border-minecraft-accent/20 rounded-xl p-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-minecraft-accent/40 hover:shadow-lg">
                    <div className="text-2xl font-bold text-minecraft-accent mb-1">{day}x</div>
                    <div className="text-xs text-gray-400">{day} day streak</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-pixel text-2xl mb-8 text-minecraft-green flex items-center gap-2">
                <Award size={28} className="text-minecraft-accent" /> Top Voters This Month
              </h2>
              <div className="space-y-3">
                {topVoters.map((voter) => (
                  <div
                    key={voter.rank}
                    className="group bg-gradient-to-br from-minecraft-dark/60 to-minecraft-dark/40 border border-minecraft-accent/20 rounded-xl p-4 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-minecraft-accent/40 hover:shadow-lg flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                        voter.rank === 1 ? 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/50 text-yellow-400' :
                        voter.rank === 2 ? 'bg-gradient-to-br from-gray-400/20 to-gray-500/20 border border-gray-400/50 text-gray-300' :
                        voter.rank === 3 ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/50 text-orange-400' :
                        'bg-minecraft-accent/20 border border-minecraft-accent/50 text-minecraft-accent'
                      }`}>
                        #{voter.rank}
                      </div>
                      <div>
                        <span className="font-bold text-minecraft-green text-lg">{voter.name}</span>
                        <div className="text-xs text-gray-400 mt-1">Level {Math.floor(Math.random() * 50) + 10}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-minecraft-accent font-bold text-lg">{voter.votes}</div>
                      <div className="text-xs text-gray-400">votes</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-pixel text-2xl mb-8 text-minecraft-green flex items-center gap-2">
                <Gift size={28} className="text-minecraft-accent" /> Milestone Rewards
              </h2>
              <div className="space-y-4">
                {milestoneRewards.map((milestone, i) => (
                  <div
                    key={i}
                    className="group bg-gradient-to-br from-minecraft-dark/60 to-minecraft-dark/40 border border-minecraft-accent/20 rounded-xl p-6 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-minecraft-accent/40 hover:shadow-lg"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Award size={16} className="text-minecraft-accent" />
                          <span className="text-minecraft-accent font-bold">{milestone.votes} Total Votes</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Gift size={16} className="text-minecraft-green" />
                          <span className="text-minecraft-green font-bold text-lg">{milestone.reward}</span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-minecraft-gold/20 to-minecraft-gold/10 border border-minecraft-gold/50 px-3 py-1 rounded-full">
                        <span className="text-minecraft-gold font-bold text-sm">{milestone.bonus}</span>
                      </div>
                    </div>
                    <div className="w-full bg-minecraft-accent/10 border border-minecraft-accent/20 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-minecraft-accent to-minecraft-green h-full rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${Math.min(100, (i + 1) * 25)}%` }}
                      />
                    </div>
                    <div className="mt-2 text-xs text-gray-400 text-right">
                      {((i + 1) * 25)}% Complete
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
