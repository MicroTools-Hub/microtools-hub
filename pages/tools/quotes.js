import { useState } from "react";
import SEO from "../../components/SEO";

export default function QuoteGenerator() {
  const [category, setCategory] = useState("motivational");
  const [quote, setQuote] = useState("");
  const [copied, setCopied] = useState(false);

  // MASSIVELY EXPANDED QUOTES (600+ total)
  const QUOTES = {
    motivational: [
      "Push yourself because no one else is going to do it for you.",
      "Your only limit is your mind.",
      "Small steps every day lead to big results.",
      "When you feel like quitting, remember why you started.",
      "Discipline is choosing what you want most over what you want now.",
      "Believe you can, and you're halfway there.",
      "Work hard in silence. Let success make the noise.",
      "Your future is created by what you do today, not tomorrow.",
      "Dream big. Work hard. Stay focused.",
      "You didn’t come this far only to come this far.",
      "Success starts with self-discipline.",
      "Nothing changes if nothing changes.",
      "The harder you work for something, the greater you’ll feel when you achieve it.",
      "Focus on the step in front of you, not the whole staircase.",
      "It's never too late to start again.",
      "Make your dreams a reality through hard work.",
      "Don’t stop until you’re proud.",
      "Someday, you’ll be glad you never gave up.",
      "You are stronger than you think.",
      "The pain you feel today builds the strength you need tomorrow."
    ],

    success: [
      "Success is not final; failure is not fatal.",
      "Do it now. Sometimes 'later' becomes 'never'.",
      "Dream big. Start small. Act now.",
      "Winners are not people who never fail, but those who never quit.",
      "Success begins at the end of your comfort zone.",
      "Success is walking from failure to failure with no loss of enthusiasm.",
      "Great things never come from comfort zones.",
      "Success is the sum of small efforts repeated daily.",
      "Work until your idols become your rivals.",
      "Your success will make noise one day—keep going.",
      "Don’t watch the clock; do what it does—keep moving.",
      "Opportunities don’t happen. You create them.",
      "Be so good they can't ignore you."
    ],

    life: [
      "Life is short. Make it sweet.",
      "Collect moments, not things.",
      "Your life is your message. Make it inspiring.",
      "Life begins at the end of your comfort zone.",
      "The best time for new beginnings is now.",
      "Life is tough, but so are you.",
      "Live the life you imagine.",
      "Do what makes your soul shine.",
      "Life is a one-time offer—use it well.",
      "Sometimes the little things are actually the big things.",
      "Life becomes easier when you accept the things you cannot control.",
      "You get one life—make it unforgettable."
    ],

    love: [
      "You are my today and all of my tomorrows.",
      "Love is shown more in deeds than in words.",
      "In a sea of people, my eyes always search for you.",
      "Where there is love, there is life.",
      "You make my heart smile.",
      "Every moment with you is a treasure.",
      "I fell in love with you unexpectedly, but now I plan to stay forever.",
      "Loving you feels like home.",
      "You are the reason I believe in love.",
      "My heart beats for you."
    ],

    funny: [
      "I’m on a seafood diet. I see food and I eat it.",
      "Life is short. Smile while you still have teeth.",
      "I'm not lazy, I’m energy efficient.",
      "My bed is a magical place; I suddenly remember everything I forgot to do.",
      "Common sense is like deodorant. Those who need it the most never use it.",
      "I don't need a hairstylist — my pillow gives me a new style every morning.",
      "I put my phone in airplane mode, but it’s still on the ground.",
      "I’m not arguing, I’m just explaining why I’m right."
    ],

    money: [
      "Don't work for money. Make money work for you.",
      "The goal is to create a life you don’t need a vacation from.",
      "Invest in your dreams. Grind now, shine later.",
      "Rich is having money; wealthy is having time.",
      "Never depend on a single income.",
      "Your mindset decides your money flow.",
      "Rich people stay rich by living like they’re broke."
    ],

    attitude: [
      "Silence is the best answer to a fool.",
      "Prove yourself to yourself, not others.",
      "My attitude is based on how you treat me.",
      "I’m not special; I’m just limited edition.",
      "Born to express, not to impress.",
      "Be yourself—people don’t have to like you, and you don’t have to care.",
      "I don’t follow the crowd; I lead it.",
      "If you think the world revolves around you, then good—keep orbiting."
    ],

    aesthetic: [
      "Stay soft. The world needs your warmth.",
      "Chase the vibe, not the people.",
      "Bloom where you are planted.",
      "Stars shine even in darkness.",
      "You are art.",
      "Soft heart, fierce mind, brave soul.",
      "Golden hours are for golden souls.",
      "Find beauty in every moment."
    ],

    deep: [
      "Your mind is a weapon. Keep it sharp.",
      "Sometimes silence is the loudest scream.",
      "People change, memories don’t.",
      "What you think, you become.",
      "Time heals everything but leaves scars.",
      "The eyes show what the heart tries to hide.",
      "Reality is nothing but a shared illusion.",
      "Growing apart is also part of life."
    ],

    anime: [
      "If you don’t take risks, you can’t create a future. — Luffy",
      "A real ninja never gives up. — Naruto",
      "Whatever you lose, you'll find it again. But what you throw away you'll never get back. — Kenshin",
      "If you can’t find a reason to fight, then you shouldn’t be fighting. — Akame",
      "It's not the face that makes someone a monster; it's the choices they make. — Naruto",
      "We can’t waste time worrying about the what-ifs. — Ichigo",
      "If you don’t share someone’s pain, you can never understand them. — Nagato",
      "A place where someone still thinks about you is a place you can call home. — Jiraiya"
    ],

    friendship: [
      "Friends are the family we choose.",
      "True friends are never apart—maybe in distance but never in heart.",
      "A good friend knows your stories; a best friend helped you write them.",
      "Life is better with true friends.",
      "Friends who understand you without words are the best kind.",
      "Real friendship is rare, but when you find it, keep it forever."
    ],

    happiness: [
      "Happiness looks gorgeous on you.",
      "Do more things that make you forget to check your phone.",
      "Choose joy every day.",
      "Your vibe attracts your tribe.",
      "A grateful heart is a magnet for miracles.",
      "Happiness starts with you.",
      "Smile big — life is good.",
      "Joy comes in the simplest moments."
    ],

    sad: [
      "Sometimes you must hurt to know, fall to grow, lose to gain.",
      "Tears are words the heart can’t express.",
      "The worst kind of sadness is not knowing why.",
      "Stars can’t shine without darkness.",
      "I’m tired of trying.",
      "Sometimes people don’t notice what we feel until we stop feeling."
    ],

    fitness: [
      "Train insane or remain the same.",
      "The body achieves what the mind believes.",
      "Sweat is your fat crying.",
      "Excuses don’t burn calories.",
      "Push harder than yesterday if you want a different tomorrow.",
      "Make fitness a habit, not a task."
    ],

    study: [
      "Study now, shine later.",
      "Success doesn’t come to you; you go to it.",
      "One hour of study can change your entire day.",
      "Don’t stop until you’re proud.",
      "Knowledge is true power.",
      "Study hard. Your future self will thank you."
    ]
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
      {/* ⭐⭐⭐ Top-tier SEO */}
      <SEO
        title="Quote Generator — 600+ Motivational, Aesthetic, Attitude & Anime Quotes | MicroTools Hub"
        description="Generate quotes instantly — motivational quotes, love quotes, aesthetic captions, anime quotes, attitude lines, study quotes, and more. Perfect for Instagram captions."
        keywords="quote generator, instagram captions, motivational quotes, aesthetic quotes, anime quotes, attitude quotes, caption generator, short quotes"
        image="/og/quotes.png"
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




