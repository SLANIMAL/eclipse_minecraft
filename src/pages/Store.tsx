import { useState } from 'react';
import { ShoppingCart, Crown, Star, Zap, Gift, Plus, Minus, Trash2, X } from 'lucide-react';
import { Button } from '../components/Button';
import bgImage from '../assets/bg.png';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  type: string;
}

const ranks = [
  {
    id: 'hunter',
    name: 'Hunter',
    price: 9.99,
    color: 'bg-blue-500/20 border-blue-500/50',
    perks: [
      '+50% Economy Rewards',
      'Custom Prefix',
      'Special Chat Color',
      '/fly in Survival',
      'Extra Land Claims',
      'Monthly Cosmetic'
    ]
  },
  {
    id: 'champion',
    name: 'Champion',
    price: 19.99,
    color: 'bg-purple-500/20 border-purple-500/50',
    perks: [
      'All Hunter Perks',
      '+100% Economy Rewards',
      '/hat Command',
      'Exclusive Titles',
      'Private Sell GUI',
      'Double Drops (3 days/month)',
      'Cosmetic Bundle'
    ]
  },
  {
    id: 'gladiator',
    name: 'Gladiator',
    price: 34.99,
    color: 'bg-minecraft-gold/20 border-minecraft-gold/50',
    perks: [
      'All Champion Perks',
      '+200% Economy Rewards',
      'Mobile App Access',
      'Exclusive Spawner Types',
      'VIP Queue (No Queue)',
      'Legendary Cosmetics',
      'Monthly Rank Extension'
    ]
  },
  {
    id: 'warlord',
    name: 'Warlord',
    price: 49.99,
    color: 'bg-minecraft-accent/20 border-minecraft-accent/50',
    perks: [
      'All Gladiator Perks',
      '+300% Economy Rewards',
      'Early Access to Updates',
      'Custom Skins Enabled',
      'Admin Shop Access',
      'Exclusive Events',
      '3x Cosmetic Rewards'
    ]
  },
  {
    id: 'titan',
    name: 'Titan',
    price: 79.99,
    color: 'bg-minecraft-green/20 border-minecraft-green/50',
    perks: [
      'All Warlord Perks',
      '+500% Economy Rewards',
      'Weekly Mystery Boxes',
      'Exclusive Cosmetics',
      'Personal Support Ticket',
      'Special Discord Role',
      'VIP Events Access'
    ]
  },
  {
    id: 'hyper',
    name: 'Hyper',
    price: 124.99,
    color: 'bg-red-500/20 border-red-500/50',
    perks: [
      'All Titan Perks',
      '+750% Economy Rewards',
      'Daily Mystery Boxes',
      'Custom Pets',
      'Priority Support',
      'Exclusive Commands',
      'Lifetime VIP Access'
    ]
  },
  {
    id: 'hyper-plus',
    name: 'Hyper+',
    price: 199.99,
    color: 'bg-gradient-to-r from-red-500/20 to-yellow-500/20 border-red-400/50',
    perks: [
      'All Hyper Perks',
      '+1000% Economy Rewards',
      'Unlimited Mystery Boxes',
      'Server Founder Role',
      'Custom World Edit Access',
      'Exclusive Beta Features',
      'Lifetime Premium Support'
    ]
  }
];

const pvpRanks = [
  {
    id: 'brawler',
    name: 'Brawler',
    price: 9.99,
    color: 'bg-red-500/20 border-red-500/50',
    perks: [
      '+25% Kill Rewards',
      'Custom Kill Message',
      'Special Chat Color',
      'Ranked Queue Access',
      'Combat Stats',
      'Monthly Cosmetic'
    ]
  },
  {
    id: 'duelist',
    name: 'Duelist',
    price: 19.99,
    color: 'bg-orange-500/20 border-orange-500/50',
    perks: [
      'All Brawler Perks',
      '+50% Kill Rewards',
      'Custom Kit Slots',
      'Tournament Access',
      'Match Replays',
      'Combat Cosmetics'
    ]
  },
  {
    id: 'champion',
    name: 'Champion',
    price: 34.99,
    color: 'bg-yellow-500/20 border-yellow-500/50',
    perks: [
      'All Duelist Perks',
      '+100% Kill Rewards',
      'Exclusive Kits',
      'Priority Matchmaking',
      'Champion Titles',
      'VIP Events'
    ]
  }
];

const bedwarsRanks = [
  {
    id: 'defender',
    name: 'Defender',
    price: 9.99,
    color: 'bg-blue-500/20 border-blue-500/50',
    perks: [
      '+20% Win Rewards',
      'Custom Bed Design',
      'Special Chat Color',
      'Team Queue Access',
      'Build Stats',
      'Monthly Cosmetic'
    ]
  },
  {
    id: 'builder',
    name: 'Builder',
    price: 19.99,
    color: 'bg-cyan-500/20 border-cyan-500/50',
    perks: [
      'All Defender Perks',
      '+40% Win Rewards',
      'Custom Block Sets',
      'Bridge Building Tools',
      'Team Leader Access',
      'Build Cosmetics'
    ]
  },
  {
    id: 'destroyer',
    name: 'Destroyer',
    price: 34.99,
    color: 'bg-purple-500/20 border-purple-500/50',
    perks: [
      'All Builder Perks',
      '+75% Win Rewards',
      'Explosive Tools',
      'Priority Team Selection',
      'Destroyer Titles',
      'VIP Events'
    ]
  }
];

const lifestealRanks = [
  {
    id: 'survivor',
    name: 'Survivor',
    price: 9.99,
    color: 'bg-green-500/20 border-green-500/50',
    perks: [
      '+30% Heart Rewards',
      'Heart Protection (1/day)',
      'Special Chat Color',
      'Bounty Board Access',
      'Survival Stats',
      'Monthly Cosmetic'
    ]
  },
  {
    id: 'reaper',
    name: 'Reaper',
    price: 19.99,
    color: 'bg-red-500/20 border-red-500/50',
    perks: [
      'All Survivor Perks',
      '+60% Heart Rewards',
      'Heart Steal Bonus',
      'Bounty Multiplier',
      'Reaper Titles',
      'Death Cosmetics'
    ]
  },
  {
    id: 'immortal',
    name: 'Immortal',
    price: 34.99,
    color: 'bg-purple-500/20 border-purple-500/50',
    perks: [
      'All Reaper Perks',
      '+100% Heart Rewards',
      'Extra Life Slot',
      'Immunity Tokens',
      'Immortal Titles',
      'VIP Events'
    ]
  }
];

const battleroyaleRanks = [
  {
    id: 'recon',
    name: 'Recon',
    price: 14.99,
    color: 'bg-purple-500/20 border-purple-500/50',
    perks: [
      'Advanced Map Intel',
      'Loot Beacon',
      'Solo Queue Priority',
      'Fallout Radar',
      'Silent Drop Suit',
      'Monthly Cosmetic'
    ]
  },
  {
    id: 'champion',
    name: 'Champion',
    price: 29.99,
    color: 'bg-red-500/20 border-red-500/50',
    perks: [
      'All Recon Perks',
      'Extra Spawn Loadout',
      'Battle Royale Voice Channel',
      'Early Access to Events',
      'Victory Royale Title',
      'Perma Battle Pass'
    ]
  }
];

const getRanksByGamemode = (mode: 'survival' | 'pvp' | 'bedwars' | 'lifesteal' | 'battleroyale') => {
  switch (mode) {
    case 'survival': return ranks;
    case 'pvp': return pvpRanks;
    case 'bedwars': return bedwarsRanks;
    case 'lifesteal': return lifestealRanks;
    case 'battleroyale': return battleroyaleRanks;
    default: return ranks;
  }
};


const items = [
  {
    id: 'crate-key',
    name: 'Crate Key',
    category: 'Crate Keys',
    price: 4.99,
    icon: Gift,
    perks: ['Open exclusive crate', 'Random valuable rewards']
  },
  {
    id: 'cosmetic-bundle',
    name: 'Cosmetic Bundle',
    category: 'Cosmetics',
    price: 7.99,
    icon: Star,
    perks: ['3 exclusive skins', 'Animated effects']
  },
  {
    id: 'booster-24h',
    name: '24h Economy Booster',
    category: 'Boosters',
    price: 3.99,
    icon: Zap,
    perks: ['+200% Currency Gain', 'Double Drops']
  },
  {
    id: 'seasonal-pass',
    name: 'Seasonal Pass',
    category: 'Seasonal',
    price: 14.99,
    icon: Crown,
    perks: ['All season rewards', 'Exclusive items', 'Extra cosmetics']
  }
];

export function Store() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirm'>(
    'cart'
  );
  const [selectedGamemode, setSelectedGamemode] = useState<'survival' | 'pvp' | 'bedwars' | 'lifesteal' | 'battleroyale'>('survival');

  const addToCart = (item: any, type: 'rank' | 'item') => {
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      type
    };

    const existing = cartItems.find(ci => ci.id === item.id);
    if (existing) {
      setCartItems(cartItems.map(ci =>
        ci.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
      ));
    } else {
      setCartItems([...cartItems, cartItem]);
    }
    setShowCart(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (checkoutStep === 'checkout') {
      setCheckoutStep('confirm');
    }
  };

    return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-minecraft text-white pb-20">
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(1,4,9,0.95) 0%, rgba(1,4,9,0.75) 35%, rgba(1,4,9,0.4) 75%, rgba(1,4,9,0.85) 100%), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      />
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-pixel text-4xl sm:text-5xl mb-4 text-minecraft-accent text-center">
            Store & Ranks
          </h1>
          <p className="text-gray-400 text-center mb-16">
            Enhance your gameplay with ranks and exclusive items
          </p>

          {/* Gamemode Selector */}
          <div className="mb-12">
            <div className="flex justify-center">
              <div className="inline-flex rounded-lg border border-minecraft-accent/30 bg-minecraft-dark/50 backdrop-blur-sm p-1">
                <button
                  onClick={() => setSelectedGamemode('survival')}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${
                    selectedGamemode === 'survival'
                      ? 'bg-minecraft-accent text-minecraft-dark'
                      : 'text-gray-400 hover:text-white hover:bg-minecraft-accent/10'
                  }`}
                >
                  Survival
                </button>
                <button
                  onClick={() => setSelectedGamemode('pvp')}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${
                    selectedGamemode === 'pvp'
                      ? 'bg-minecraft-accent text-minecraft-dark'
                      : 'text-gray-400 hover:text-white hover:bg-minecraft-accent/10'
                  }`}
                >
                  PvP Arena
                </button>
                <button
                  onClick={() => setSelectedGamemode('bedwars')}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${
                    selectedGamemode === 'bedwars'
                      ? 'bg-minecraft-accent text-minecraft-dark'
                      : 'text-gray-400 hover:text-white hover:bg-minecraft-accent/10'
                  }`}
                >
                  Bedwars
                </button>
                <button
                  onClick={() => setSelectedGamemode('lifesteal')}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${
                    selectedGamemode === 'lifesteal'
                      ? 'bg-minecraft-accent text-minecraft-dark'
                      : 'text-gray-400 hover:text-white hover:bg-minecraft-accent/10'
                  }`}
                >
                  Lifesteal
                </button>
                <button
                  onClick={() => setSelectedGamemode('battleroyale')}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${
                    selectedGamemode === 'battleroyale'
                      ? 'bg-minecraft-accent text-minecraft-dark'
                      : 'text-gray-400 hover:text-white hover:bg-minecraft-accent/10'
                  }`}
                >
                  Battle Royale
                </button>
              </div>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="font-pixel text-2xl mb-8 text-minecraft-green capitalize">
              {selectedGamemode} Rank Tiers
            </h2>
            <p className="text-gray-400 text-center mb-6 text-sm">
              {selectedGamemode === 'survival' 
                ? 'These ranks apply to Survival mode. Other gamemodes have their own rank systems.'
                : `These ranks apply specifically to ${selectedGamemode} mode with unique perks.`
              }
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-stretch">
              {getRanksByGamemode(selectedGamemode).map((rank) => (
                <div
                  key={rank.id}
                  className={`border rounded-lg p-6 backdrop-blur-md ${rank.color} transition-all hover:shadow-lg transform hover:scale-105 flex flex-col`}
                >
                  <Crown className="text-minecraft-accent mb-3 mx-auto" size={32} />
                  <h3 className="text-xl font-bold text-center mb-2 text-minecraft-green">
                    {rank.name}
                  </h3>
                  <p className="text-2xl font-bold text-minecraft-accent text-center mb-4">
                    ${rank.price}
                  </p>
                  <ul className="space-y-2 text-xs flex-1">
                    {rank.perks.map((perk, i) => (
                      <li key={i} className="text-gray-300 flex items-start gap-2">
                        <span className="text-minecraft-green mt-1">▪</span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="sm"
                    variant="accent"
                    onClick={() => addToCart(rank, 'rank')}
                    className="w-full mt-4"
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="font-pixel text-2xl mb-8 text-minecraft-green">Additional Items</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="bg-minecraft-dark/50 border border-minecraft-accent/30 rounded-lg p-6 backdrop-blur-md hover:border-minecraft-accent transition-all flex flex-col"
                  >
                    <Icon className="text-minecraft-accent mb-3" size={32} />
                    <h3 className="text-lg font-bold text-minecraft-green mb-1">{item.name}</h3>
                    <p className="text-xs text-minecraft-accent mb-4">{item.category}</p>
                    <ul className="space-y-1 text-xs text-gray-400 flex-1">
                      {item.perks.map((perk, i) => (
                        <li key={i}>• {perk}</li>
                      ))}
                    </ul>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-lg font-bold text-minecraft-green">
                        ${item.price}
                      </span>
                      <Button
                        size="sm"
                        variant="accent"
                        onClick={() => addToCart(item, 'item')}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {showCart && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-minecraft-dark border border-minecraft-accent rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-minecraft-darker border-b border-minecraft-accent/20 p-6 flex justify-between items-center">
              <h2 className="font-pixel text-2xl text-minecraft-accent flex items-center gap-2">
                <ShoppingCart size={24} /> Shopping Cart
              </h2>
              <button
                onClick={() => {
                  setShowCart(false);
                  setCheckoutStep('cart');
                }}
                className="hover:text-minecraft-green transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {checkoutStep === 'confirm' ? (
              <div className="p-6 text-center">
                <div className="bg-minecraft-green/20 border border-minecraft-green rounded-lg p-8 mb-6">
                  <Star className="text-minecraft-green mx-auto mb-4" size={48} />
                  <h3 className="text-2xl font-bold text-minecraft-green mb-2">
                    Order Confirmed!
                  </h3>
                  <p className="text-gray-400 mb-4">
                    Your purchase has been processed successfully.
                  </p>
                  <p className="text-xl font-bold text-minecraft-accent mb-6">
                    Total: ${total.toFixed(2)}
                  </p>
                  <Button
                    variant="accent"
                    onClick={() => {
                      setShowCart(false);
                      setCheckoutStep('cart');
                      setCartItems([]);
                    }}
                  >
                    Done
                  </Button>
                </div>
              </div>
            ) : checkoutStep === 'checkout' ? (
              <div className="p-6">
                <div className="bg-minecraft-accent/5 border border-minecraft-accent/20 rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-minecraft-green mb-4">Billing Information</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full bg-minecraft-dark border border-minecraft-accent/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-minecraft-accent"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full bg-minecraft-dark border border-minecraft-accent/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-minecraft-accent"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="w-full bg-minecraft-dark border border-minecraft-accent/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-minecraft-accent"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-full bg-minecraft-dark border border-minecraft-accent/30 rounded px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-minecraft-accent"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button
                    variant="secondary"
                    onClick={() => setCheckoutStep('cart')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    variant="accent"
                    onClick={handleCheckout}
                    className="flex-1"
                  >
                    Confirm Payment
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-6">
                {cartItems.length === 0 ? (
                  <p className="text-center text-gray-400 py-8">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-minecraft-accent/5 border border-minecraft-accent/20 rounded-lg p-4 flex justify-between items-center"
                        >
                          <div>
                            <h4 className="font-bold text-minecraft-green">{item.name}</h4>
                            <p className="text-sm text-gray-400">${item.price} each</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="hover:bg-minecraft-accent/20 p-1 rounded"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="hover:bg-minecraft-accent/20 p-1 rounded"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-minecraft-red hover:text-minecraft-red/80 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-minecraft-accent/20 pt-4 mb-6">
                      <div className="flex justify-between text-lg font-bold mb-4">
                        <span>Total:</span>
                        <span className="text-minecraft-accent">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      variant="accent"
                      onClick={() => setCheckoutStep('checkout')}
                      className="w-full"
                    >
                      Proceed to Checkout
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <button
        onClick={() => setShowCart(!showCart)}
        className="fixed bottom-8 left-8 z-40 p-4 bg-minecraft-accent rounded-full hover:shadow-neon-cyan transition-all group"
      >
        <ShoppingCart className="text-minecraft-dark group-hover:scale-110 transition-transform" size={24} />
        {cartItems.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-minecraft-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            {cartItems.length}
          </span>
        )}
      </button>
    </div>
  );
}
