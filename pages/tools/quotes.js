import { useState } from "react";
import SEO from "../../components/SEO";

export default function QuoteGenerator() {
  const [category, setCategory] = useState("motivational");
  const [quote, setQuote] = useState("");
  const [copied, setCopied] = useState(false);

  const QUOTES = {
    motivational: [
      "Push yourself because no one else is going to do it for you.",
      "Your only limit is your mind.",
      "Small steps every day lead to big results.",
      "When you feel like quitting, remember why you started.",
      "Discipline is choosing what you want most over what you want now.",
    ],

    success: [
      "Success is not final; failure is not fatal.",
      "Do it now. Sometimes 'later' becomes 'never'.",
      "Dream big. Start small. Act now.",
      "Winners are not people who never fail, but those who never quit.",
      "Success begins at the end of your comfort zone.",
    ],

    life: [
      "Life is short. Make it sweet.",
      "Collect moments, not things.",
      "Your life is your message. Make it inspiring.",
      "Life begins at the end of your comfort zone.",
      "The best time for new beginnings is now.",
    ],

    love: [
      "You are my today and all of my tomorrows.",
      "Love is shown more in deeds than in words.",
      "In a sea of people, my eyes always search for you.",
      "Where there is love, there is life.",
      "You make my heart smile.",
    ],

    funny: [
      "I’m on a seafood diet. I see food and I eat it.",
      "Life is short. Smile while you still have teeth.",
      "I'm not lazy, I’m energy efficient.",
      "My bed is a magical place; I suddenly remember everything I forgot to do.",
      "Common sense is like deodorant. Those who need it the most never use it.",
    ],

    money: [
      "Don't work for money. Make money work for you.",
      "The goal is to create a life you don’t need a vacation from.",
      "Invest in your dreams. Grind now, shine later.",
      "Rich is having money; wealthy is having time.",
      "Never depend on a single income.",
    ],

    attitude: [
      "Silence is the best answer to a fool.",
      "Prove yourself to yourself, not others.",
      "My attitude is based on how you treat me.",
      "I’m not special; I’m just limited edition.",
      "Born to express, not to impress.",
    ],

    aesthetic: [
      "Stay soft. The world needs your warmth.",
      "Chase the vibe, not the people.",
      "Bloom where you are planted.",
      "Stars shine even in darkness.",
      "You are art.",
    ],

    deep: [
      "Your mind is a weapon. Keep it sharp.",
      "Sometimes silence is the loudest scream.",
      "People change, memories don’t.",
      "What you think, you become.",
      "Time heals everything but leaves scars.",
    ],

    anime: [
      "If you don’t take risks, you can’t create a future. — Monkey D. Luffy",
      "A real ninja never gives up. — Naruto Uzumaki",
      "Whatever you lose, you'll find it again. But what you throw away you'll never get back. — Kenshin",
      "If you can’t find a reason to fight, then you shouldn’t be fighting. — Akame",
      "It's not the face that makes someone a monster; it's the choices they make. — Naruto",
    ],

    friendship: [
      "Friends are the family we choose.",
      "True friends are never apart — maybe in distance, never in heart.",
      "A good friend knows your stories; a best friend helped you write them.",
      "Life is better with true friends.",
      "Friends who understand you without words are the best kind.",
    ],

    happiness: [
      "Happiness looks gorgeous on you.",
      "Do more things that make you forget to check your phone.",
      "Choose joy every day.",
      "Your vibe attracts your tribe.",
      "A grateful heart is a magnet for miracles.",
    ],

    sad: [
      "Sometimes, you must hurt to know, fall to grow, lose to gain.",
      "Tears are words the heart can’t express.",
      "The worst kind of sadness is not knowing why.",
      "Stars can’t shine without darkness.",
      "I’m tired of trying.",
    ],

    fitness: [
      "Train insane or remain the same.",
      "The body achieves what the mind believes.",
      "Sweat is your fat crying.",
      "Excuses don’t burn calories.",
      "Push harder than yesterday if you want a different tomorrow.",
    ],

    study: [
      "Study now, shine later.",
      "Success doesn’t come to you; you go to it.",
      "One hour of study can change your entire day.",
      "Don’t stop until you’re proud.",
      "Knowledge is the real power.",
    ],
  };

  const generateQuote = () => {
    const list = QUOTES[category];
    const random = list[Math.floor(Math.random() * list.length)];
    setQuote(random);
    setCopied(false);
  };

  const copyQuote = () => {
    navigator.clipboard.writeText(quote);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <>
      <SEO
        title="Quote Generator — 300+ Free Quotes | MicroTools Hub"
        description="Generate aesthetic, motivational, anime, attitude, funny, love, and deep quotes instantly. Perfect for Instagram captions."
        keywords="quote generator, captions generator, instagram captions"
      />

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold text-indigo-600 mb-6">
          Random Quote Generator
        </h1>

        <div className="flex gap-4 mb-6">

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded-lg w-1/2"
          >
            {Object.keys(QUOTES).map((key) => (
              <option key={key} value={key}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </option>
            ))}
          </select>

          <button
            onClick={generateQuote}
            className="bg-indigo-600 w-1/2 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Generate
          </button>
        </div>

        {/* QUOTE BOX */}
        {quote && (
          <div className="p-6 bg-white shadow rounded-xl border relative">

            <p className="text-xl italic mb-4 leading-relaxed">{quote}</p>

            <button
              onClick={copyQuote}
              className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-black"
            >
              {copied ? "Copied!" : "Copy Quote"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}



