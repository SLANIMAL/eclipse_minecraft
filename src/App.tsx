import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CopyIPButton } from './components/CopyIPButton';
import { ParticleBackground } from './components/ParticleBackground';
import { AuthProvider } from './contexts/AuthContext';
import { StripeProvider } from './contexts/StripeContext';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Features } from './pages/Features';
import { Gamemodes } from './pages/Gamemodes';
import { Store } from './pages/Store';
import { Vote } from './pages/Vote';
import { Leaderboards } from './pages/Leaderboards';
import { Rules } from './pages/Rules';
import { Staff } from './pages/Staff';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { PaymentSuccess } from './pages/PaymentSuccess';

export default function App() {
  return (
    <AuthProvider>
      <StripeProvider>
        <Router>
          <div className="min-h-screen flex flex-col relative bg-transparent">
            <ParticleBackground />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/features" element={<Features />} />
              <Route path="/gamemodes" element={<Gamemodes />} />
              <Route path="/ranks" element={<Store />} />
              <Route path="/store" element={<Store />} />
              <Route path="/vote" element={<Vote />} />
              <Route path="/leaderboards" element={<Leaderboards />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
            </Routes>
            <Footer />
            <CopyIPButton />
          </div>
        </Router>
      </StripeProvider>
    </AuthProvider>
  );
}
