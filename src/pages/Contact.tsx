import { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import { Button } from '../components/Button';

const faqs = [
  {
    q: 'How do I join the server?',
    a: 'Simply add the server IP (play.eclipse-minecraft.net) to your Minecraft launcher and join! No application required.'
  },
  {
    q: 'Is Eclipse Minecraft really free?',
    a: 'Yes! The server is completely free to play. Ranks and cosmetics are optional for an enhanced experience.'
  },
  {
    q: 'How do I report a player?',
    a: 'Use /report <player> <reason> in-game or submit a ticket on Discord for more serious issues.'
  },
  {
    q: 'What are server reset timings?',
    a: 'Worlds are never reset. Your progress is permanent unless you choose to start fresh.'
  },
  {
    q: 'Do you have a mobile app?',
    a: 'We\'re working on one! Immortal+ ranks get early access to the beta.'
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', category: 'general', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-minecraft text-white">
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-pixel text-4xl sm:text-5xl mb-4 text-minecraft-accent text-center">
            Get In Touch
          </h1>
          <p className="text-gray-400 text-center mb-16">
            Have questions or issues? We're here to help!
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-minecraft-dark/50 border border-minecraft-accent/30 rounded-lg p-8 backdrop-blur-md">
              <Mail className="text-minecraft-accent mb-4" size={32} />
              <h3 className="text-xl font-bold text-minecraft-green mb-2">Email</h3>
              <p className="text-gray-400 mb-4">
                For general inquiries and support
              </p>
              <a
                href="mailto:support@eclipse-minecraft.net"
                className="text-minecraft-accent hover:text-minecraft-green transition-colors font-mono"
              >
                support@eclipse-minecraft.net
              </a>
            </div>

            <div className="bg-minecraft-dark/50 border border-minecraft-accent/30 rounded-lg p-8 backdrop-blur-md">
              <MessageSquare className="text-minecraft-accent mb-4" size={32} />
              <h3 className="text-xl font-bold text-minecraft-green mb-2">Discord</h3>
              <p className="text-gray-400 mb-4">
                Join our community server
              </p>
              <a
                href="#discord"
                className="text-minecraft-accent hover:text-minecraft-green transition-colors font-bold"
              >
                discord.gg/eclipse-minecraft
              </a>
            </div>

            <div className="bg-minecraft-dark/50 border border-minecraft-accent/30 rounded-lg p-8 backdrop-blur-md">
              <div className="text-minecraft-accent mb-4 text-2xl">📍</div>
              <h3 className="text-xl font-bold text-minecraft-green mb-2">Server IP</h3>
              <p className="text-gray-400 mb-4">
                Connect to our game server
              </p>
              <code className="text-minecraft-green font-mono font-bold">
                play.eclipse-minecraft.net
              </code>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="font-pixel text-2xl mb-8 text-minecraft-green">Contact Us</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-minecraft-accent mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-minecraft-dark border border-minecraft-accent/30 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-minecraft-accent transition-colors"
                    placeholder="John Miner"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-minecraft-accent mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-minecraft-dark border border-minecraft-accent/30 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-minecraft-accent transition-colors"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-minecraft-accent mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-minecraft-dark border border-minecraft-accent/30 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-minecraft-accent transition-colors"
                      placeholder="Report"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-minecraft-accent mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-minecraft-dark border border-minecraft-accent/30 rounded px-4 py-3 text-white focus:outline-none focus:border-minecraft-accent transition-colors"
                    >
                      <option value="general">General</option>
                      <option value="support">Support</option>
                      <option value="report">Report</option>
                      <option value="appeal">Appeal</option>
                      <option value="business">Business</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-minecraft-accent mb-2">
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-minecraft-dark border border-minecraft-accent/30 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-minecraft-accent transition-colors h-32 resize-none"
                    placeholder="Tell us what you need..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  size="md"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Send Message
                </Button>

                {submitted && (
                  <div className="bg-minecraft-green/20 border border-minecraft-green rounded p-4 text-center text-minecraft-green font-bold">
                    Message sent successfully! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>

            <div>
              <h2 className="font-pixel text-2xl mb-8 text-minecraft-green">FAQ</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="bg-minecraft-dark/50 border border-minecraft-accent/30 rounded-lg p-6 backdrop-blur-md"
                  >
                    <h3 className="font-bold text-minecraft-accent mb-2">{faq.q}</h3>
                    <p className="text-gray-400 text-sm">{faq.a}</p>
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
