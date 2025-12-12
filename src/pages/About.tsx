import { Star, Users, Zap } from 'lucide-react';

export function About() {
  const milestones = [
    { year: '2020', title: 'Founded', desc: 'Eclipse Minecraft officially launches' },
    { year: '2021', title: '10K Players', desc: 'Community reaches 10,000 members' },
    { year: '2022', title: 'New Features', desc: 'Major update with new gamemodes' },
    { year: '2024', title: 'World Record', desc: 'Reached 50,000+ active players' },
  ];

  return (
    <div className="min-h-screen bg-gradient-minecraft text-white">
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-pixel text-4xl sm:text-5xl mb-8 text-minecraft-accent">About Eclipse Network</h1>

          <div className="bg-minecraft-dark/50 border border-minecraft-accent/30 rounded-lg p-8 backdrop-blur-md mb-12">
            <h2 className="text-2xl font-bold text-minecraft-green mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Eclipse Network exists to create the most immersive and cinematic Minecraft experience in the industry. We believe in fostering a vibrant community where players of all skill levels can thrive, compete, and make lasting friendships.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Since our founding in 2020, we've grown from a small server to one of the most respected Minecraft communities worldwide. Our success is built on our commitment to player satisfaction, regular updates, and maintaining a safe, inclusive environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-minecraft-accent/5 border border-minecraft-accent/20 rounded-lg p-6 text-center">
              <Star className="text-minecraft-accent mx-auto mb-4" size={32} />
              <div className="text-3xl font-bold text-minecraft-green mb-2">50K+</div>
              <p className="text-gray-400">Active Players</p>
            </div>
            <div className="bg-minecraft-accent/5 border border-minecraft-accent/20 rounded-lg p-6 text-center">
              <Users className="text-minecraft-accent mx-auto mb-4" size={32} />
              <div className="text-3xl font-bold text-minecraft-green mb-2">500+</div>
              <p className="text-gray-400">Staff Members</p>
            </div>
            <div className="bg-minecraft-accent/5 border border-minecraft-accent/20 rounded-lg p-6 text-center">
              <Zap className="text-minecraft-accent mx-auto mb-4" size={32} />
              <div className="text-3xl font-bold text-minecraft-green mb-2">99.9%</div>
              <p className="text-gray-400">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 border-t border-minecraft-accent/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pixel text-3xl sm:text-4xl mb-12 text-minecraft-accent">Our Journey</h2>

          <div className="space-y-8">
            {milestones.map((milestone, i) => (
              <div key={i} className="flex gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-minecraft-accent/20 border-2 border-minecraft-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-pixel text-sm text-minecraft-accent">{i + 1}</span>
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-1 h-24 bg-gradient-to-b from-minecraft-accent/50 to-minecraft-accent/10 mt-4" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="text-minecraft-green font-pixel text-sm mb-2">{milestone.year}</div>
                  <h3 className="text-xl font-bold text-minecraft-green mb-2">{milestone.title}</h3>
                  <p className="text-gray-400">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 border-t border-minecraft-accent/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pixel text-3xl sm:text-4xl mb-12 text-minecraft-accent">What Makes Us Different</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Player-First Philosophy',
                desc: 'Every decision is made with player experience in mind, ensuring balance and fairness across all content.'
              },
              {
                title: 'Constant Innovation',
                desc: 'We regularly introduce new features, events, and improvements based on community feedback.'
              },
              {
                title: 'Professional Staff',
                desc: 'Our trained moderation team ensures a safe, welcoming environment 24/7.'
              },
              {
                title: 'Transparent Governance',
                desc: 'We communicate openly with our community about updates, changes, and server decisions.'
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-minecraft-dark/50 border border-minecraft-accent/30 rounded-lg p-6 backdrop-blur-md hover:border-minecraft-accent transition-all"
              >
                <h3 className="text-lg font-bold text-minecraft-green mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
