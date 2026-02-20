'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Smooth scroll for better reading experience
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector((e.target as HTMLAnchorElement).getAttribute('href')!);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });

    // Hide scroll indicator after first scroll
    let scrolled = false;
    const handleScroll = () => {
      if (!scrolled && window.scrollY > 100) {
        scrolled = true;
        const indicator = document.querySelector('.scroll-indicator') as HTMLElement;
        if (indicator) {
          indicator.style.opacity = '0';
        }
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Fade-in animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.story-card, .impact-item, .talent-card, .value-card, .tier').forEach(el => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(30px)';
      (el as HTMLElement).style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: var(--font-archivo), 'Helvetica Neue', Arial, sans-serif;
            background: #0a0a0a;
            color: #e8e4dc;
            overflow-x: hidden;
            line-height: 1.6;
        }

        body::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: #C41E3A;
            z-index: 10000;
        }

        :root {
            --boxing-red: #C41E3A;
            --boxing-crimson: #9B1B30;
            --boxing-dark-red: #6B0F1A;
            --fight-gold: #D4A843;
            --championship-gold: #FFD700;
            --steel: #5a6068;
            --charcoal: #1a1a1a;
            --concrete: #242424;
        }

        .section {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 60px 40px;
            position: relative;
            scroll-snap-align: start;
        }

        .container {
            max-width: 1200px;
            width: 100%;
            position: relative;
            z-index: 2;
        }

        h1 {
            font-size: clamp(3.5rem, 10vw, 8rem);
            font-weight: 400;
            line-height: 0.95;
            margin-bottom: 25px;
            letter-spacing: 0.08em;
            font-family: var(--font-bebas), sans-serif;
            text-transform: uppercase;
            color: #fff;
        }

        h2 {
            font-size: clamp(2rem, 4vw, 3.5rem);
            font-weight: 600;
            line-height: 1.15;
            margin-bottom: 25px;
            letter-spacing: 0.04em;
            font-family: var(--font-oswald), sans-serif;
            text-transform: uppercase;
            color: #fff;
        }

        h3 {
            font-size: clamp(1.3rem, 2.5vw, 2rem);
            font-weight: 600;
            margin-bottom: 20px;
            font-family: var(--font-oswald), sans-serif;
            text-transform: uppercase;
            letter-spacing: 0.03em;
        }

        p {
            font-size: clamp(1.05rem, 1.8vw, 1.25rem);
            line-height: 1.75;
            margin-bottom: 20px;
            font-weight: 400;
            color: #b8b2a8;
        }

        .highlight {
            color: var(--boxing-red);
            font-weight: 700;
        }

        .gold {
            color: var(--fight-gold);
        }

        .kdh-blue {
            color: var(--fight-gold);
        }

        .kdh-purple {
            color: var(--boxing-red);
        }

        .subtitle {
            font-size: clamp(1.1rem, 2vw, 1.5rem);
            font-weight: 400;
            opacity: 0.7;
            margin-bottom: 40px;
            letter-spacing: 0.15em;
            font-family: var(--font-oswald), sans-serif;
            text-transform: uppercase;
            color: #888;
        }

        /* Hero Section */
        #hero {
            background: #080808;
            text-align: center;
        }

        #hero h1 {
            margin-bottom: 0;
            animation: fadeInUp 1s ease-out;
        }

        #hero .subtitle {
            animation: fadeInUp 1.2s ease-out;
        }

        .hero-tagline {
            font-size: clamp(0.95rem, 1.6vw, 1.15rem);
            font-weight: 400;
            opacity: 0.45;
            margin-top: 30px;
            animation: fadeInUp 1.4s ease-out;
            font-style: italic;
            letter-spacing: 0.03em;
        }

        /* The Story Section */
        #story {
            background: #0c0c0c;
        }

        .story-grid {
            display: grid;
            gap: 30px;
            margin-top: 50px;
        }

        .story-card {
            background: rgba(255,255,255,0.02);
            padding: 40px;
            border-radius: 0;
            border-left: 4px solid var(--boxing-red);
        }

        .story-card h3 {
            color: var(--fight-gold);
            margin-bottom: 15px;
        }

        /* Seoul Section */
        #seoul {
            background: #080808;
            text-align: center;
        }

        .seoul-highlight {
            background: rgba(196, 30, 58, 0.05);
            padding: 50px;
            border-radius: 0;
            margin: 40px 0;
            border: 2px solid var(--boxing-red);
        }

        .countdown {
            font-size: clamp(1.6rem, 3vw, 2.5rem);
            font-weight: 700;
            color: var(--fight-gold);
            margin: 40px 0;
            font-family: var(--font-bebas), sans-serif;
            letter-spacing: 0.1em;
        }

        /* Talent Section */
        #talent {
            background: #0c0c0c;
        }

        .talent-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
            gap: 30px;
            margin-top: 50px;
        }

        .talent-card {
            background: rgba(255,255,255,0.02);
            padding: 35px;
            border-radius: 0;
            border-top: 3px solid var(--boxing-red);
        }

        .talent-card h3 {
            color: var(--fight-gold);
            margin-bottom: 20px;
            font-size: 1.2rem;
        }

        .talent-card ul {
            list-style: none;
            padding-left: 0;
        }

        .talent-card ul li {
            padding: 8px 0;
            padding-left: 22px;
            position: relative;
            font-size: 1.05rem;
            color: #b8b2a8;
        }

        .talent-card ul li:before {
            content: "—";
            position: absolute;
            left: 0;
            color: var(--boxing-red);
            font-weight: 700;
        }

        /* Opportunity Section */
        #opportunity {
            background: #080808;
        }

        .opportunity-tiers {
            display: grid;
            gap: 30px;
            margin-top: 50px;
        }

        .tier {
            background: rgba(255,255,255,0.02);
            padding: 40px;
            border-radius: 0;
            border-left: 4px solid var(--fight-gold);
        }

        .tier h3 {
            color: var(--fight-gold);
            margin-bottom: 20px;
        }

        .tier ul {
            list-style: none;
            padding-left: 0;
        }

        .tier ul li {
            padding: 10px 0;
            padding-left: 25px;
            position: relative;
            font-size: 1.05rem;
            line-height: 1.65;
            color: #b8b2a8;
        }

        .tier ul li:before {
            content: "●";
            position: absolute;
            left: 0;
            color: var(--fight-gold);
            font-size: 0.6rem;
            top: 16px;
        }

        /* Partnership Section */
        #partnership {
            background: #0c0c0c;
        }

        .partnership-box {
            background: rgba(196, 30, 58, 0.04);
            padding: 50px;
            border-radius: 0;
            border: 2px solid var(--boxing-crimson);
            margin-top: 50px;
        }

        .partnership-box ul {
            list-style: none;
            padding-left: 0;
        }

        .partnership-box ul li {
            padding: 12px 0;
            padding-left: 30px;
            position: relative;
            font-size: 1.1rem;
            line-height: 1.7;
            color: #b8b2a8;
        }

        .partnership-box ul li:before {
            content: "→";
            position: absolute;
            left: 0;
            color: var(--boxing-red);
            font-size: 1.2rem;
            font-weight: bold;
        }

        /* CTA */
        .cta {
            display: inline-block;
            padding: 18px 50px;
            background: var(--boxing-red);
            color: #fff;
            text-decoration: none;
            font-size: 1.1rem;
            font-weight: 600;
            border-radius: 0;
            margin-top: 40px;
            transition: all 0.25s ease;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-family: var(--font-oswald), sans-serif;
            border: 2px solid var(--boxing-red);
        }

        .cta:hover {
            background: transparent;
            color: var(--boxing-red);
        }

        /* Scroll Indicator */
        .scroll-indicator {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.8rem;
            opacity: 0.35;
            animation: bounce 2s infinite;
            letter-spacing: 0.15em;
            font-family: var(--font-oswald), sans-serif;
            text-transform: uppercase;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateX(-50%) translateY(0);
            }
            40% {
                transform: translateX(-50%) translateY(-10px);
            }
            60% {
                transform: translateX(-50%) translateY(-5px);
            }
        }

        /* Responsive */
        @media (max-width: 768px) {
            .section {
                padding: 40px 20px;
            }

            .seoul-highlight {
                padding: 30px 20px;
            }

            .partnership-box {
                padding: 30px 20px;
            }

            .tier ul li,
            .partnership-box ul li {
                font-size: 1rem;
            }
        }
      `}</style>

      {/* HERO SECTION */}
      <section id="hero" className="section" style={{position: 'relative'}}>
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url("giotop.png")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15, pointerEvents: 'none'}}></div>
        <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px', background: 'linear-gradient(to top, #080808, transparent)', pointerEvents: 'none'}}></div>
        <div className="container">
          <h1>Giovanni Cabrera</h1>
          <div style={{width: '80px', height: '4px', background: 'var(--boxing-red)', margin: '0 auto 30px'}}></div>
          <p className="subtitle">An <span className="highlight">Untold Original</span></p>
          <p style={{fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto', color: '#999', letterSpacing: '0.05em'}}>
            World #8 Boxer • Actor • Comedian • Singer
          </p>
          <p className="hero-tagline">
            A fighter who chooses values over everything.
          </p>
          <div className="scroll-indicator">↓ Scroll to explore ↓</div>
        </div>
      </section>

      {/* THE STORY */}
      <section id="story" className="section" style={{position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: 0, right: 0, width: '300px', height: '100%', background: 'linear-gradient(to left, rgba(196, 30, 58, 0.03), transparent)', pointerEvents: 'none'}}></div>
        <div style={{position: 'absolute', bottom: '-50px', left: '-50px', width: '300px', height: '300px', border: '2px solid rgba(196, 30, 58, 0.08)', transform: 'rotate(15deg)', pointerEvents: 'none'}}></div>
        <div className="container">
          <h2>Where <span className="kdh-blue">Boxing</span> Meets <span className="kdh-purple">Storytelling</span></h2>
          <p className="subtitle">When values transcend boundaries, new possibilities emerge</p>

          <div className="story-grid">
            <div className="story-card fade-in">
              <h3>The Bridge</h3>
              <p>When Giovanni stood up for his community during ICE raids, speaking out against injustice, the Los Angeles boxing establishment responded harshly.</p>
              <p>Gyms refused him entry. Trainers wouldn&apos;t work with him. His career was threatened for standing out.</p>
              <p>Just when the industry tried to silence him, South Korea offered him a WBA title fight. The timing was in-yeon. He&apos;s grateful for the opportunity and is training for April 5, 2026. Fighting with honor for his community and his values.</p>
            </div>

            <div className="story-card fade-in">
              <h3>The Professional Boxer</h3>
              <p style={{marginTop: '20px'}}><strong>Refusing to be Silenced</strong></p>
              <p>When the industry tried to punish Giovanni for caring about his community, they expected him to break. Instead, he found a path forward. His values weren&apos;t his weakness. They were his compass.</p>
              <p>The Los Angeles boxing establishment tried to suppress his voice and his career: gyms refused to let him in, trainers wouldn&apos;t work with him. They wanted to make an example of him, to show other fighters what happens when you speak out. Giovanni refused to be silenced. That&apos;s not stubbornness, that&apos;s principle.</p>
            </div>

            <div className="story-card fade-in">
              <h3>The Artist</h3>
              <p>Actor • Comedian • Singer/Songwriter</p>
              <p>Featured in multiple award winning shorts. Performing standup at iconic Hollywood venues.</p>
              <p>As a singer and songwriter, Giovanni creates music with emotional lyrics and timeless lyrical themes, perfect for collaboration with K-pop producers. His authentic storytelling through music resonates with themes of perseverance, loyalty, and overcoming adversity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEOUL SHOWDOWN */}
      <section id="seoul" className="section" style={{position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', bottom: 0, left: 0, width: '100%', height: '150px', background: 'linear-gradient(to top, rgba(196, 30, 58, 0.03) 0%, transparent 100%)', pointerEvents: 'none'}}></div>
        <div className="container">
          <h2>April 5, 2026</h2>
          <p className="subtitle">The Seoul Showdown</p>

          <div className="seoul-highlight">
            <p style={{fontSize: '1.4rem', lineHeight: 1.9, color: '#c8c2b8'}}>
              Giovanni is grateful to South Korea for welcoming him when others turned away.
              He&apos;s honored to have the opportunity to fight for a WBA title in Seoul.
            </p>
            <div className="countdown">
              WBA Asia Title Match • 12 Rounds<br/>
              Seoul, South Korea • vs. Siro Choi<br/>
              61.23 KG Lightweight Division
            </div>
            <div style={{marginTop: '40px', padding: '40px', background: 'rgba(196, 30, 58, 0.06)', borderLeft: '6px solid var(--boxing-red)'}}>
              <p style={{fontSize: '1.6rem', lineHeight: 1.9, textAlign: 'left', fontWeight: 600}}>
                <span style={{color: 'var(--fight-gold)', fontSize: '1.8rem', fontWeight: 700, fontFamily: "var(--font-oswald), sans-serif", textTransform: 'uppercase' as const, letterSpacing: '0.03em'}}>This is the story of someone who transcends oppression.</span>
                <br/><br/>
                <span style={{color: 'rgba(232, 228, 220, 0.8)'}}>The industry tried to silence him for caring.</span>
                <br/>
                <span style={{color: 'var(--boxing-red)', fontSize: '1.7rem', fontWeight: 700}}>He&apos;s answering them in Seoul on the world stage.</span>
              </p>
            </div>
          </div>

          <div style={{marginTop: '60px', position: 'relative', padding: '60px 20px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.05)'}}>
            <p style={{fontSize: '1.6rem', marginBottom: '50px', textAlign: 'center', fontWeight: 600, color: 'var(--fight-gold)', letterSpacing: '2px', fontFamily: "var(--font-oswald), sans-serif", textTransform: 'uppercase' as const}}>
              The Journey • 인연
            </p>

            <div style={{position: 'absolute', top: '180px', left: '5%', right: '5%', height: '2px', background: 'linear-gradient(to right, var(--boxing-red) 0%, var(--boxing-crimson) 50%, var(--fight-gold) 100%)', opacity: 0.3}}></div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '30px', position: 'relative', zIndex: 1}}>
              {/* Stage 1: Standing Up */}
              <div style={{textAlign: 'center'}}>
                <div style={{position: 'relative', width: '100px', height: '100px', margin: '0 auto 20px'}}>
                  <div style={{width: '100%', height: '100%', border: '3px solid var(--boxing-red)', borderRadius: '50%', position: 'relative', overflow: 'hidden'}}>
                    <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, var(--boxing-red), transparent)'}}></div>
                  </div>
                  <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40px', height: '40px', background: 'var(--boxing-red)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                </div>
                <p style={{fontSize: '1.1rem', fontWeight: 600, color: 'var(--boxing-red)'}}>Standing Up</p>
              </div>

              {/* Stage 2: Oppression */}
              <div style={{textAlign: 'center'}}>
                <div style={{position: 'relative', width: '100px', height: '100px', margin: '0 auto 20px'}}>
                  <div style={{width: '100%', height: '100%', border: '3px solid var(--steel)', position: 'relative'}}>
                    <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(90, 96, 104, 0.3) 10px, rgba(90, 96, 104, 0.3) 20px)'}}></div>
                  </div>
                  <div style={{position: 'absolute', top: '50%', left: 0, right: 0, height: '3px', background: 'var(--steel)'}}></div>
                </div>
                <p style={{fontSize: '1.1rem', fontWeight: 600, color: 'var(--steel)'}}>Oppression</p>
              </div>

              {/* Stage 3: Refusal */}
              <div style={{textAlign: 'center'}}>
                <div style={{position: 'relative', width: '100px', height: '100px', margin: '0 auto 20px'}}>
                  <div style={{width: '100%', height: '100%', border: '3px solid var(--boxing-crimson)', transform: 'rotate(45deg)', position: 'relative'}}>
                    <div style={{position: 'absolute', top: '50%', left: '50%', width: '60%', height: '60%', background: 'var(--boxing-crimson)', transform: 'translate(-50%, -50%)'}}></div>
                  </div>
                  <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '30px', height: '30px', border: '3px solid var(--boxing-crimson)', borderRadius: '50%', background: 'rgba(155, 27, 48, 0.2)'}}></div>
                </div>
                <p style={{fontSize: '1.1rem', fontWeight: 600, color: 'var(--boxing-crimson)'}}>Refusal</p>
              </div>

              {/* Stage 4: New Path (In-yeon) */}
              <div style={{textAlign: 'center'}}>
                <div style={{position: 'relative', width: '100px', height: '100px', margin: '0 auto 20px'}}>
                  <div style={{width: '100%', height: '100%', border: '3px solid var(--fight-gold)', borderRadius: '50%', position: 'relative'}}>
                    <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--fight-gold)', opacity: 0.8}}>인연</div>
                  </div>
                  <div style={{position: 'absolute', top: '-5px', right: '-5px', width: '20px', height: '20px', background: 'var(--fight-gold)', borderRadius: '50%'}}></div>
                </div>
                <p style={{fontSize: '1.1rem', fontWeight: 600, color: 'var(--fight-gold)'}}>New Path</p>
              </div>

              {/* Stage 5: WBA Title Fight */}
              <div style={{textAlign: 'center'}}>
                <div style={{position: 'relative', width: '100px', height: '100px', margin: '0 auto 20px'}}>
                  <div style={{width: '100%', height: '100%', position: 'relative'}}>
                    <div style={{width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--championship-gold), #FFD700, var(--championship-gold))', clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'}}></div>
                    <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '2rem', fontWeight: 900, color: '#000'}}>4.5</div>
                  </div>
                </div>
                <p style={{fontSize: '1.1rem', fontWeight: 600, color: 'var(--championship-gold)'}}>4.5 WBA Title Fight</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE TALENT */}
      <section id="talent" className="section">
        <div className="container">
          <h2>Beyond the <span className="kdh-blue">Ring</span></h2>
          <p className="subtitle">Multi-Platform Talent</p>

          <div className="talent-grid">
            <div className="talent-card">
              <h3>Acting & Performance</h3>
              <ul>
                <li>Featured in multiple award winning shorts</li>
                <li>Natural charisma and screen presence</li>
                <li>Experience in action choreography</li>
              </ul>
            </div>

            <div className="talent-card">
              <h3>Comedy & Performance</h3>
              <ul>
                <li>Cross cultural appeal across US, Korea, and Latin America</li>
                <li>Natural stage presence and timing</li>
              </ul>
            </div>

            <div className="talent-card">
              <h3>Music & Songwriting</h3>
              <ul>
                <li>Singer and songwriter with cross cultural appeal</li>
                <li>Digital platform content and fan engagement opportunities</li>
                <li>Musical collaborations bridging Latin American, American, and Korean audiences</li>
              </ul>
            </div>

            <div className="talent-card">
              <h3>Public Speaking</h3>
              <ul>
                <li>Advocate for fighter rights and mental health</li>
                <li>Compelling storyteller with authentic narrative</li>
                <li>Cross cultural communication skills</li>
                <li>Natural media presence</li>
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* THE OPPORTUNITY */}
      <section id="opportunity" className="section" style={{position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', bottom: '100px', right: 0, width: '250px', height: '250px', borderLeft: '3px solid rgba(212, 168, 67, 0.1)', borderBottom: '3px solid rgba(212, 168, 67, 0.1)', pointerEvents: 'none'}}></div>
        <div className="container">
          <h2>The <span className="gold">Opportunity</span></h2>

          <div className="opportunity-tiers">
            <div className="tier">
              <h3>Reality Entertainment</h3>
              <p>Giovanni&apos;s multiplatform talent in Seoul programming:</p>
              <ul>
                <li><strong>Athletic Competition Variety:</strong> Shows like &quot;Physical: 100&quot; or &quot;Iron Squad&quot; where Giovanni competes alongside Korean celebrities, showcasing boxing skills and cross-cultural athleticism</li>
                <li><strong>Cultural Exchange Series:</strong> &quot;Giovanni&apos;s Seoul Journey&quot; - following a Mexican American fighter adapting to Korean life, learning the language, training in Seoul gyms, discovering Korean food and customs</li>
                <li><strong>Celebrity Challenge Shows:</strong> Korean variety formats where Giovanni teaches boxing to Korean celebrities or participates in comedy challenges, music performances, and cultural missions</li>
                <li><strong>Music & Performance Programs:</strong> Guest appearances on Korean music shows performing original songs, collaborating with Korean artists, blending Latin rhythms with K-pop production</li>
                <li><strong>Entertainment Formats:</strong> Panel shows, talk shows, and variety programs where Giovanni brings humor, storytelling, and unique perspective as a Latino boxer in Seoul</li>
              </ul>
            </div>

            <div className="tier">
              <h3>Unscripted & Documentary</h3>
              <p>Universal themes told through cultural bridges:</p>
              <ul>
                <li><strong>Unscripted Series:</strong> Following a Mexican American professional fighter finding a new home in Seoul, navigating language, culture, and training for a championship fight</li>
                <li><strong>Feature Documentary:</strong> Honor and perseverance across cultures, when one country welcomes what another rejected</li>
                <li><strong>Dramatic Series:</strong> The human story of standing up, facing consequences, finding acceptance abroad</li>
                <li><strong>Music Documentary:</strong> Giovanni&apos;s songwriting journey blending Korean, American, and Latin musical traditions</li>
                <li><strong>Short Form Content:</strong> Korean, American, and Latin voices exploring loyalty, community, and courage</li>
              </ul>
            </div>

            <div className="tier">
              <h3>Cultural Brand Collaborations</h3>
              <p>Partnerships that connect communities:</p>
              <ul>
                <li>Korean entertainment and music brands partnering with a multiplatform artist — boxer, comedian, actor, singer/songwriter</li>
                <li>Korean brands reaching US and Latin American audiences through authentic cultural storytelling</li>
                <li>Athletic and lifestyle brands celebrating cross cultural perseverance</li>
                <li>Music collaborations between Korean, Latin, and American artists</li>
                <li>Community organizations building bridges between Korean, Latin, and American communities</li>
              </ul>
            </div>
          </div>

          <div style={{marginTop: '60px', padding: '50px 30px', borderLeft: '4px solid var(--fight-gold)', background: 'rgba(212, 168, 67, 0.03)'}}>
            <p style={{fontSize: '1.6rem', textAlign: 'left', lineHeight: 1.9, fontWeight: 600}}>
              <span style={{color: 'var(--fight-gold)', fontSize: '1.8rem', fontWeight: 700, fontFamily: "var(--font-oswald), sans-serif", textTransform: 'uppercase' as const, letterSpacing: '0.02em'}}>Finding the familiar within the unfamiliar.</span>
              <br/><br/>
              <span style={{color: '#b8b2a8'}}>Connecting cultures through a story of </span>
              <span style={{color: 'var(--fight-gold)'}}>honor</span>,
              <span style={{color: 'var(--boxing-red)'}}> loyalty</span>, and
              <span style={{color: '#e8e4dc'}}> standing up for what truly matters</span>.
            </p>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP VISION */}
      <section id="partnership" className="section" style={{position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, top: '30%', width: '80px', height: '40%', background: 'linear-gradient(to right, rgba(196, 30, 58, 0.08) 0%, transparent 100%)', pointerEvents: 'none'}}></div>
        <div className="container">
          <h2>The <span className="kdh-blue">Collaboration</span></h2>
          <p className="subtitle">Building Empathy Across Borders</p>

          <p style={{fontSize: '1.35rem', lineHeight: 1.9, marginBottom: '50px', color: '#b8b2a8'}}>
            Giovanni represents something rare: a bridge between worlds. A Mexican American athlete going to Seoul
            for the opportunity of a lifetime. The power of empathy transcends boundaries, expanding overlooked perspectives
            into endless possibilities. A fighter who acts. A comedian who competes. <span className="highlight">Someone who refuses
            to stay in one lane.</span>
          </p>

          <div className="partnership-box">
            <h3 style={{color: 'var(--fight-gold)', marginBottom: '30px'}}>Seeking Partners Who Think Beyond Boundaries:</h3>
            <ul>
              <li>Korean brands ready to connect with US and Latin American markets through authentic storytelling</li>
              <li>Artists and creatives who see sport as culture, and culture as universal language</li>
              <li>Filmmakers and content creators exploring cross cultural narratives</li>
              <li>Fashion and lifestyle collaborators interested in the athlete-entertainer space</li>
              <li>Innovators who understand that the best stories happen at the intersection of different worlds</li>
            </ul>
          </div>

          <p style={{fontSize: '1.35rem', lineHeight: 1.9, marginTop: '60px', color: '#b8b2a8'}}>
            The April 5, 2026 fight is a platform for collaboration — telling stories that connect LA to Seoul, boxing to comedy to music, compassion to action.
          </p>

          <div style={{marginTop: '50px', padding: '40px', background: 'rgba(196, 30, 58, 0.04)', border: '2px solid var(--boxing-crimson)'}}>
            <p style={{fontSize: '1.6rem', lineHeight: 1.8, textAlign: 'center', fontWeight: 700}}>
              <span style={{color: 'var(--fight-gold)', fontSize: '1.8rem', fontFamily: "var(--font-oswald), sans-serif", textTransform: 'uppercase' as const, letterSpacing: '0.05em'}}>Let&apos;s create together</span>
            </p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '30px'}}>
              <div style={{textAlign: 'center', padding: '20px'}}>
                <div style={{fontSize: '2.5rem', marginBottom: '15px'}}>🌐</div>
                <p style={{fontSize: '1.1rem', fontWeight: 600, color: 'var(--boxing-red)', lineHeight: 1.6}}>Content that transcends boundaries</p>
              </div>
              <div style={{textAlign: 'center', padding: '20px'}}>
                <div style={{fontSize: '2.5rem', marginBottom: '15px'}}>🤝</div>
                <p style={{fontSize: '1.1rem', fontWeight: 600, color: 'var(--fight-gold)', lineHeight: 1.6}}>Collaborations built on empathy</p>
              </div>
              <div style={{textAlign: 'center', padding: '20px'}}>
                <div style={{fontSize: '2.5rem', marginBottom: '15px'}}>✨</div>
                <p style={{fontSize: '1.1rem', fontWeight: 600, color: '#e8e4dc', lineHeight: 1.6}}>Stories that open up new possibilities across cultures</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section" style={{position: 'relative', background: '#080808'}}>
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url("giobottom.png")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2, pointerEvents: 'none'}}></div>
        <div className="container" style={{textAlign: 'center'}}>
          <h2>Giovanni <span className="kdh-purple">Cabrera</span></h2>

          <p style={{fontSize: '1.2rem', fontWeight: 400, opacity: 0.8, lineHeight: 1.8, marginTop: '30px', letterSpacing: '0.05em'}}>
            World #8 Lightweight • Actor • Comedian • Singer • Humanitarian
          </p>

          <div style={{marginTop: '30px'}}>
            <a href="https://instagram.com/giocabreraboxing" target="_blank" rel="noopener noreferrer" style={{color: 'var(--fight-gold)', textDecoration: 'none', fontSize: '1.1rem', fontFamily: "var(--font-oswald), sans-serif", letterSpacing: '0.1em', textTransform: 'uppercase' as const, borderBottom: '1px solid var(--fight-gold)', paddingBottom: '2px', transition: 'opacity 0.25s ease', opacity: 0.8}}>@giocabreraboxing</a>
          </div>

          <div style={{marginTop: '40px'}}>
            <a href="mailto:jimmydesmondbrown@gmail.com" className="cta">Start the Conversation</a>
          </div>
        </div>
      </section>
    </>
  );
}
