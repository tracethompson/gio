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
            font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
            background: #000;
            color: #fff;
            overflow-x: hidden;
            line-height: 1.6;
        }

        /* Brand Colors - CJ ENM Inspired */
        :root {
            --cj-magenta: #FF0084;
            --cj-pink: #FF1493;
            --cj-electric-blue: #00D9FF;
            --cj-cyan: #00BFFF;
            --cj-purple: #9D00FF;
            --cj-orange: #FF6B35;
            --cj-gold: #FFD700;
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
            font-size: clamp(2.5rem, 6vw, 5rem);
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 30px;
            letter-spacing: 0.02em;
            font-family: 'Bebas Neue', 'Oswald', sans-serif;
            text-transform: uppercase;
        }

        h2 {
            font-size: clamp(2rem, 4vw, 3.5rem);
            font-weight: 600;
            line-height: 1.2;
            margin-bottom: 25px;
            letter-spacing: 0.01em;
            font-family: 'Oswald', sans-serif;
            text-transform: uppercase;
        }

        h3 {
            font-size: clamp(1.5rem, 3vw, 2.5rem);
            font-weight: 600;
            margin-bottom: 20px;
            font-family: 'Oswald', 'Inter', sans-serif;
        }

        p {
            font-size: clamp(1.1rem, 2vw, 1.4rem);
            line-height: 1.7;
            margin-bottom: 20px;
            font-weight: 300;
        }

        .highlight {
            color: var(--cj-magenta);
            font-weight: 600;
        }

        .cj-red {
            color: var(--cj-red);
        }

        .gold {
            color: var(--cj-orange);
        }

        .kdh-blue {
            color: var(--kdh-electric-blue);
        }

        .kdh-purple {
            color: var(--cj-magenta);
        }

        .neon-accent {
            color: var(--kdh-neon-green);
        }

        .subtitle {
            font-size: clamp(1.2rem, 2.5vw, 1.8rem);
            font-weight: 300;
            opacity: 0.9;
            margin-bottom: 40px;
            letter-spacing: 0.02em;
        }

        /* Hero Section */
        #hero {
            background: linear-gradient(135deg, #000 0%, #1a0033 50%, #2d0a4d 100%);
            text-align: center;
        }

        #hero h1 {
            margin-bottom: 20px;
            animation: fadeInUp 1s ease-out;
        }

        #hero .subtitle {
            animation: fadeInUp 1.2s ease-out;
        }

        .hero-tagline {
            font-size: clamp(1rem, 2vw, 1.3rem);
            font-weight: 400;
            opacity: 0.7;
            margin-top: 30px;
            animation: fadeInUp 1.4s ease-out;
        }

        /* The Story Section */
        #story {
            background: linear-gradient(to bottom, #000 0%, #0a0a0a 100%);
        }

        .story-grid {
            display: grid;
            gap: 40px;
            margin-top: 50px;
        }

        .story-card {
            background: rgba(255,255,255,0.03);
            padding: 40px;
            border-radius: 12px;
            border-left: 4px solid var(--kdh-electric-blue);
            backdrop-filter: blur(10px);
        }

        .story-card h3 {
            color: var(--kdh-electric-blue);
            margin-bottom: 15px;
        }

        /* Humanitarian Section */
        #humanitarian {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #2d0a4d 100%);
        }

        .quote-box {
            background: rgba(157, 0, 255, 0.15);
            border-left: 6px solid var(--cj-magenta);
            padding: 40px;
            margin: 40px 0;
            border-radius: 8px;
            font-style: italic;
            font-size: clamp(1.3rem, 2.5vw, 1.8rem);
            line-height: 1.8;
        }

        .impact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-top: 50px;
        }

        .impact-item {
            text-align: center;
            padding: 30px;
            background: rgba(255,255,255,0.02);
            border-radius: 10px;
        }

        .impact-item h3 {
            color: var(--kdh-electric-blue);
            font-size: 2.5rem;
            margin-bottom: 10px;
        }

        /* The Resilience Section */
        #resilience {
            background: linear-gradient(to bottom, #000 0%, #0a0a0a 100%);
        }

        .resilience-points {
            display: grid;
            gap: 30px;
            margin-top: 40px;
        }

        .resilience-card {
            background: rgba(157, 0, 255, 0.1);
            padding: 35px;
            border-radius: 10px;
            border-left: 4px solid var(--cj-magenta);
        }

        .resilience-card h3 {
            color: var(--cj-magenta);
            margin-bottom: 15px;
        }

        /* Seoul Section */
        #seoul {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #2d0a4d 100%);
            text-align: center;
        }

        .seoul-highlight {
            background: rgba(31, 142, 241, 0.1);
            padding: 50px;
            border-radius: 15px;
            margin: 40px 0;
            border: 2px solid var(--kdh-electric-blue);
        }

        .countdown {
            font-size: clamp(2rem, 4vw, 3rem);
            font-weight: 700;
            color: var(--cj-orange);
            margin: 40px 0;
            font-family: 'Bebas Neue', sans-serif;
            letter-spacing: 0.05em;
        }

        /* Talent Section */
        #talent {
            background: linear-gradient(to bottom, #000 0%, #0a0a0a 100%);
        }

        .talent-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 35px;
            margin-top: 50px;
        }

        .talent-card {
            background: rgba(255,255,255,0.03);
            padding: 35px;
            border-radius: 12px;
            border-top: 3px solid var(--kdh-electric-blue);
        }

        .talent-card h3 {
            color: var(--kdh-electric-blue);
            margin-bottom: 20px;
        }

        .talent-card ul {
            list-style: none;
            padding-left: 0;
        }

        .talent-card ul li {
            padding: 8px 0;
            padding-left: 25px;
            position: relative;
            font-size: 1.1rem;
        }

        .talent-card ul li:before {
            content: "▸";
            position: absolute;
            left: 0;
            color: var(--kdh-electric-blue);
        }

        /* Values Section */
        #values {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #2d0a4d 100%);
        }

        .values-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            margin-top: 50px;
        }

        .value-card {
            text-align: center;
            padding: 40px 30px;
            background: rgba(157, 0, 255, 0.1);
            border-radius: 12px;
            border: 1px solid rgba(157, 0, 255, 0.3);
        }

        .value-card h3 {
            color: var(--cj-magenta);
            margin-bottom: 15px;
            font-size: 1.8rem;
        }

        /* Opportunity Section */
        #opportunity {
            background: linear-gradient(to bottom, #000 0%, #0a0a0a 100%);
        }

        .opportunity-tiers {
            display: grid;
            gap: 40px;
            margin-top: 50px;
        }

        .tier {
            background: rgba(255,255,255,0.03);
            padding: 40px;
            border-radius: 12px;
            border-left: 4px solid var(--cj-orange);
        }

        .tier h3 {
            color: var(--cj-orange);
            margin-bottom: 20px;
        }

        .tier ul {
            list-style: none;
            padding-left: 0;
        }

        .tier ul li {
            padding: 10px 0;
            padding-left: 30px;
            position: relative;
            font-size: 1.15rem;
            line-height: 1.6;
        }

        .tier ul li:before {
            content: "●";
            position: absolute;
            left: 0;
            color: var(--cj-orange);
            font-size: 1.5rem;
        }

        /* Parallel Section */
        #parallel {
            background: linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #2d0a4d 100%);
        }

        .comparison-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 40px;
            margin-top: 50px;
        }

        .comparison-card {
            padding: 40px;
            border-radius: 12px;
            background: rgba(255,255,255,0.03);
        }

        .comparison-card.kdh {
            border: 2px solid var(--cj-magenta);
        }

        .comparison-card.kdh h3 {
            color: var(--cj-magenta);
        }

        .comparison-card.gio {
            border: 2px solid var(--kdh-electric-blue);
        }

        .comparison-card.gio h3 {
            color: var(--kdh-electric-blue);
        }

        .parallel-points {
            list-style: none;
            padding-left: 0;
        }

        .parallel-points li {
            padding: 12px 0;
            font-size: 1.15rem;
            line-height: 1.6;
        }

        /* Partnership Section */
        #partnership {
            background: linear-gradient(to bottom, #000 0%, #0a0a0a 100%);
        }

        .partnership-box {
            background: rgba(31, 142, 241, 0.1);
            padding: 50px;
            border-radius: 15px;
            border: 2px solid var(--kdh-electric-blue);
            margin-top: 50px;
        }

        .partnership-box ul {
            list-style: none;
            padding-left: 0;
        }

        .partnership-box ul li {
            padding: 15px 0;
            padding-left: 35px;
            position: relative;
            font-size: 1.2rem;
            line-height: 1.7;
        }

        .partnership-box ul li:before {
            content: "→";
            position: absolute;
            left: 0;
            color: var(--kdh-electric-blue);
            font-size: 1.5rem;
            font-weight: bold;
        }

        /* Closing Section */
        #closing {
            background: linear-gradient(135deg, #000 0%, #1a0033 50%, #2d0a4d 100%);
            text-align: center;
        }

        .cta {
            display: inline-block;
            padding: 20px 50px;
            background: var(--cj-orange);
            color: #000;
            text-decoration: none;
            font-size: 1.3rem;
            font-weight: 700;
            border-radius: 50px;
            margin-top: 40px;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .cta:hover {
            background: #fff;
            transform: scale(1.05);
        }

        /* Scroll Indicator */
        .scroll-indicator {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.9rem;
            opacity: 0.6;
            animation: bounce 2s infinite;
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

            .comparison-grid {
                grid-template-columns: 1fr;
            }

            .tier ul li,
            .partnership-box ul li {
                font-size: 1rem;
            }
        }
      `}</style>

      {/* HERO SECTION */}
      <section id="hero" className="section" style={{position: 'relative'}}>
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url("giotop.png")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2, pointerEvents: 'none'}}></div>
        <div className="container">
          <h1>Giovanni Cabrera</h1>
          <p className="subtitle">An <span className="highlight">Untold Original</span></p>
          <p style={{fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto'}}>
            World #9 Boxer • Actor • Comedian • Singer
          </p>
          <p className="hero-tagline">
            A fighter who chooses values over everything.
          </p>
          <div className="scroll-indicator">↓ Scroll to explore ↓</div>
        </div>
      </section>

      {/* THE STORY */}
      <section id="story" className="section" style={{position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'linear-gradient(135deg, rgba(157, 0, 255, 0.1) 0%, transparent 70%)', transform: 'rotate(45deg)', pointerEvents: 'none'}}></div>
        <div style={{position: 'absolute', bottom: '-50px', left: '-50px', width: '300px', height: '300px', border: '2px solid rgba(31, 142, 241, 0.15)', transform: 'rotate(15deg)', pointerEvents: 'none'}}></div>
        <div className="container">
          <h2>Where <span className="kdh-blue">Boxing</span> Meets <span className="kdh-purple">Storytelling</span></h2>
          <p className="subtitle">When values transcend boundaries, new possibilities emerge</p>

          <div className="story-grid">
            <div className="story-card fade-in">
              <h3>The Bridge</h3>
              <p>When Giovanni stood up for his community during ICE raids, speaking out against injustice, the Los Angeles boxing establishment responded harshly.</p>
              <p>Gyms refused him entry. Trainers wouldn&apos;t work with him. His career was threatened for standing up.</p>
              <p>Just when the industry tried to silence him, South Korea offered him a two-fight WBA contract. The timing was in-yeon. He&apos;s grateful for the opportunity and is training for January 24, 2026. Fighting with honor for his community and his values.</p>
            </div>

            <div className="story-card fade-in">
              <h3>The Professional Boxer</h3>
              <p style={{marginTop: '20px'}}><strong>Refusing to be Silenced</strong></p>
              <p>When the industry tried to punish Giovanni for caring about his community, they expected him to break. Instead, he found a path forward. His values weren&apos;t his weakness. They were his compass.</p>
              <p>The Los Angeles boxing establishment tried to suppress his voice and his career: gyms refused to let him in, trainers wouldn&apos;t work with him. They wanted to make an example of him, to show other fighters what happens when you speak out. Giovanni refused to be silenced. That&apos;s not stubbornness, that&apos;s principle.</p>
            </div>

            <div className="story-card fade-in">
              <h3>The Artist</h3>
              <p>Actor • Standup Comedian • Singer/Songwriter</p>
              <p>Featured in multiple award winning shorts. Performing standup at iconic Hollywood venues including The Comedy Store, The Laugh Factory, and other legendary stages.</p>
              <p>As a singer and songwriter, Giovanni creates music with emotional lyrics and timeless lyrical themes, perfect for collaboration with K-pop producers. His authentic storytelling through music resonates with themes of perseverance, loyalty, and overcoming adversity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEOUL SHOWDOWN */}
      <section id="seoul" className="section" style={{position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', bottom: 0, left: 0, width: '100%', height: '150px', background: 'linear-gradient(to top, rgba(157, 0, 255, 0.05) 0%, transparent 100%)', pointerEvents: 'none'}}></div>
        <div style={{position: 'absolute', top: '20%', right: '50px', width: '60px', height: '200px', background: 'linear-gradient(to bottom, rgba(31, 142, 241, 0.1), rgba(31, 142, 241, 0.02))', clipPath: 'polygon(0 0, 100% 20%, 100% 100%, 0 80%)', pointerEvents: 'none'}}></div>
        <div className="container">
          <h2>January 24, 2026</h2>
          <p className="subtitle">The Seoul Showdown</p>

          <div className="seoul-highlight">
            <p style={{fontSize: '1.5rem', lineHeight: 1.9}}>
              Giovanni is grateful to South Korea for welcoming him when others turned away.
              He&apos;s honored to have the opportunity to fight for a WBA title in Seoul.
            </p>
            <div className="countdown">
              WBA Asia Title Match • 12 Rounds<br/>
              Seoul, South Korea • vs. Siro Choi<br/>
              61.23 KG Lightweight Division
            </div>
            <div style={{marginTop: '40px', padding: '40px', background: 'linear-gradient(135deg, rgba(255, 0, 132, 0.15), rgba(0, 217, 255, 0.15))', borderRadius: '20px', border: '2px solid rgba(255, 0, 132, 0.4)', boxShadow: '0 0 40px rgba(255, 0, 132, 0.3)'}}>
              <p style={{fontSize: '1.8rem', lineHeight: 1.9, textAlign: 'center', fontWeight: 600}}>
                <span style={{background: 'linear-gradient(120deg, var(--cj-magenta), var(--cj-electric-blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '2rem', fontWeight: 700}}>This is the story of someone who transcends oppression.</span>
                <br/><br/>
                <span style={{color: 'rgba(255, 255, 255, 0.9)'}}>The industry tried to silence him for caring.</span>
                <br/>
                <span style={{color: 'var(--cj-electric-blue)', textShadow: '0 0 20px rgba(0, 217, 255, 0.5)', fontSize: '1.9rem', fontWeight: 700}}>He&apos;s answering them in Seoul on the world stage.</span>
              </p>
            </div>
          </div>

          <div style={{marginTop: '60px', position: 'relative', padding: '60px 20px', background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.5), rgba(26, 0, 51, 0.3))', borderRadius: '20px'}}>
            <p style={{fontSize: '1.8rem', marginBottom: '50px', textAlign: 'center', fontWeight: 600, color: 'var(--cj-orange)', letterSpacing: '2px'}}>
              The Journey • 인연
            </p>

            <div style={{position: 'absolute', top: '180px', left: '5%', right: '5%', height: '2px', background: 'linear-gradient(to right, var(--cj-magenta) 0%, var(--cj-orange) 50%, var(--cj-electric-blue) 100%)', opacity: 0.3}}></div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '30px', position: 'relative', zIndex: 1}}>
              {/* Stage 1: Standing Up */}
              <div style={{textAlign: 'center'}}>
                <div style={{position: 'relative', width: '100px', height: '100px', margin: '0 auto 20px'}}>
                  <div style={{width: '100%', height: '100%', border: '3px solid var(--cj-pink)', borderRadius: '50%', position: 'relative', overflow: 'hidden'}}>
                    <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, var(--cj-pink), transparent)'}}></div>
                  </div>
                  <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40px', height: '40px', background: 'var(--cj-pink)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'}}></div>
                </div>
                <p style={{fontSize: '1.1rem', fontWeight: 600, color: 'var(--cj-pink)'}}>Standing Up</p>
              </div>

              {/* Stage 2: Oppression */}
              <div style={{textAlign: 'center'}}>
                <div style={{position: 'relative', width: '100px', height: '100px', margin: '0 auto 20px'}}>
                  <div style={{width: '100%', height: '100%', border: '3px solid var(--cj-orange)', position: 'relative'}}>
                    <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(229, 57, 53, 0.3) 10px, rgba(229, 57, 53, 0.3) 20px)'}}></div>
                  </div>
                  <div style={{position: 'absolute', top: '50%', left: 0, right: 0, height: '3px', background: 'var(--cj-orange)'}}></div>
                </div>
                <p style={{fontSize: '1.1rem', fontWeight: 600, color: 'var(--cj-orange)'}}>Oppression</p>
              </div>

              {/* Stage 3: Refusal */}
              <div style={{textAlign: 'center'}}>
                <div style={{position: 'relative', width: '100px', height: '100px', margin: '0 auto 20px'}}>
                  <div style={{width: '100%', height: '100%', border: '3px solid var(--cj-orange)', transform: 'rotate(45deg)', position: 'relative'}}>
                    <div style={{position: 'absolute', top: '50%', left: '50%', width: '60%', height: '60%', background: 'var(--cj-orange)', transform: 'translate(-50%, -50%)'}}></div>
                  </div>
                  <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '30px', height: '30px', border: '3px solid var(--cj-orange)', borderRadius: '50%', background: 'rgba(243, 156, 18, 0.2)'}}></div>
                </div>
                <p style={{fontSize: '1.1rem', fontWeight: 600, color: 'var(--cj-orange)'}}>Refusal</p>
              </div>

              {/* Stage 4: New Path (In-yeon) */}
              <div style={{textAlign: 'center'}}>
                <div style={{position: 'relative', width: '100px', height: '100px', margin: '0 auto 20px'}}>
                  <div style={{width: '100%', height: '100%', border: '3px solid var(--cj-electric-blue)', borderRadius: '50%', position: 'relative'}}>
                    <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--cj-electric-blue)', opacity: 0.8}}>인연</div>
                  </div>
                  <div style={{position: 'absolute', top: '-5px', right: '-5px', width: '20px', height: '20px', background: 'var(--cj-electric-blue)', borderRadius: '50%', boxShadow: '0 0 15px var(--cj-electric-blue)'}}></div>
                </div>
                <p style={{fontSize: '1.1rem', fontWeight: 600, color: 'var(--cj-electric-blue)'}}>New Path</p>
              </div>

              {/* Stage 5: WBA Title Fight */}
              <div style={{textAlign: 'center'}}>
                <div style={{position: 'relative', width: '100px', height: '100px', margin: '0 auto 20px'}}>
                  <div style={{width: '100%', height: '100%', position: 'relative'}}>
                    <div style={{width: '100%', height: '100%', background: 'linear-gradient(135deg, var(--cj-gold), #FFD700, var(--cj-gold))', clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', boxShadow: '0 0 30px rgba(255, 215, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.4)'}}></div>
                    <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '2rem', fontWeight: 900, color: '#000', textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'}}>1.24</div>
                  </div>
                </div>
                <p style={{fontSize: '1.1rem', fontWeight: 600, color: 'var(--cj-gold)', textShadow: '0 0 10px rgba(255, 215, 0, 0.3)'}}>WBA Title Fight</p>
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
                <li>Standup Comedian performing at iconic Hollywood clubs</li>
                <li>Cross cultural appeal (US/Korea/Latin America)</li>
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
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '200px', background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, transparent 100%)', clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 80%)', pointerEvents: 'none'}}></div>
        <div style={{position: 'absolute', bottom: '100px', right: 0, width: '250px', height: '250px', borderLeft: '3px solid rgba(243, 156, 18, 0.2)', borderBottom: '3px solid rgba(243, 156, 18, 0.2)', pointerEvents: 'none'}}></div>
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
                <li><strong>Comedy & Entertainment Formats:</strong> Panel shows, talk shows, and variety programs where Giovanni brings humor, storytelling, and unique perspective as a Latino boxer in Seoul</li>
              </ul>
            </div>

            <div className="tier">
              <h3>Scripted & Documentary</h3>
              <p>Universal themes told through cultural bridges:</p>
              <ul>
                <li><strong>Reality Series:</strong> Following a Mexican American professional fighter finding a new home in Seoul, navigating language, culture, and training for a championship fight</li>
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
                <li>Korean entertainment and music brands partnering with a multiplatform artist (boxer, comedian, actor, singer/songwriter)</li>
                <li>Korean brands reaching US and Latin American audiences through authentic cultural storytelling</li>
                <li>Athletic and lifestyle brands celebrating cross cultural perseverance</li>
                <li>Music collaborations between Korean, Latin, and American artists</li>
                <li>Community organizations building bridges between Korean, Latin, and American communities</li>
              </ul>
            </div>
          </div>

          <div style={{marginTop: '60px', padding: '50px 30px', background: 'radial-gradient(circle at center, rgba(255, 0, 132, 0.15), transparent 70%)', borderRadius: '20px'}}>
            <p style={{fontSize: '1.8rem', textAlign: 'center', lineHeight: 1.9, fontWeight: 600}}>
              <span style={{background: 'linear-gradient(120deg, var(--cj-magenta), var(--cj-electric-blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '2rem', fontWeight: 700}}>Finding the familiar within the unfamiliar.</span>
              <br/><br/>
              <span style={{color: 'var(--cj-electric-blue)', textShadow: '0 0 20px rgba(0, 217, 255, 0.3)'}}>Connecting cultures through a story of </span>
              <span style={{color: 'var(--cj-gold)', textShadow: '0 0 20px rgba(255, 215, 0, 0.3)'}}>honor</span>,
              <span style={{color: 'var(--cj-magenta)', textShadow: '0 0 20px rgba(255, 0, 132, 0.3)'}}> loyalty</span>, and
              <span style={{color: 'var(--cj-orange)', textShadow: '0 0 20px rgba(255, 107, 53, 0.3)'}}> standing up for what truly matters</span>.
            </p>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP VISION */}
      <section id="partnership" className="section" style={{position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: 0, top: '30%', width: '80px', height: '40%', background: 'linear-gradient(to right, rgba(157, 0, 255, 0.15) 0%, rgba(157, 0, 255, 0.08) 50%, transparent 100%)', clipPath: 'polygon(0 0, 100% 10%, 100% 90%, 0 100%)', pointerEvents: 'none'}}></div>
        <div className="container">
          <h2>The <span className="kdh-blue">Collaboration</span></h2>
          <p className="subtitle">Building Empathy Across Borders</p>

          <p style={{fontSize: '1.5rem', lineHeight: 1.9, marginBottom: '50px'}}>
            Giovanni represents something rare: a bridge between worlds. A Mexican American athlete going to Seoul
            for the opportunity of a lifetime. The power of empathy transcends boundaries, expanding overlooked perspectives
            into endless possibilities. A fighter who acts. A comedian who competes. <span className="highlight">Someone who refuses
            to stay in one lane.</span>
          </p>

          <div className="partnership-box">
            <h3 style={{color: 'var(--cj-orange)', marginBottom: '30px'}}>Seeking Partners Who Think Beyond Boundaries:</h3>
            <ul>
              <li>Korean brands ready to connect with US and Latin American markets through authentic storytelling</li>
              <li>Artists and creatives who see sport as culture, and culture as universal language</li>
              <li>Filmmakers and content creators exploring cross cultural narratives</li>
              <li>Fashion and lifestyle collaborators interested in the athlete entertainer space</li>
              <li>Innovators who understand that the best stories happen at the intersection of different worlds</li>
            </ul>
          </div>

          <p style={{fontSize: '1.5rem', lineHeight: 1.9, marginTop: '60px'}}>
            The January 24, 2026 fight is the beginning of a two-fight contract, not the ending. It&apos;s a platform for collaboration—
            telling stories that connect LA to Seoul, boxing to comedy to music, compassion to action.
          </p>

          <div style={{marginTop: '50px', padding: '40px', background: 'linear-gradient(135deg, rgba(255, 0, 132, 0.1), rgba(0, 217, 255, 0.1))', borderRadius: '20px', border: '2px solid rgba(255, 0, 132, 0.3)', boxShadow: '0 0 40px rgba(255, 0, 132, 0.2), 0 0 80px rgba(0, 217, 255, 0.2)'}}>
            <p style={{fontSize: '1.8rem', lineHeight: 1.8, textAlign: 'center', fontWeight: 700}}>
              <span style={{background: 'linear-gradient(90deg, var(--cj-magenta), var(--cj-electric-blue), var(--cj-magenta))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: '2rem'}}>Let&apos;s create together</span>
            </p>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '30px'}}>
              <div style={{textAlign: 'center', padding: '20px'}}>
                <div style={{fontSize: '3rem', marginBottom: '15px', filter: 'drop-shadow(0 0 10px var(--cj-magenta)'}}>🌐</div>
                <p style={{fontSize: '1.2rem', fontWeight: 600, color: 'var(--cj-magenta)', lineHeight: 1.6}}>Content that transcends boundaries</p>
              </div>
              <div style={{textAlign: 'center', padding: '20px'}}>
                <div style={{fontSize: '3rem', marginBottom: '15px', filter: 'drop-shadow(0 0 10px var(--cj-electric-blue)'}}>🤝</div>
                <p style={{fontSize: '1.2rem', fontWeight: 600, color: 'var(--cj-electric-blue)', lineHeight: 1.6}}>Collaborations built on empathy</p>
              </div>
              <div style={{textAlign: 'center', padding: '20px'}}>
                <div style={{fontSize: '3rem', marginBottom: '15px', filter: 'drop-shadow(0 0 10px var(--cj-orange)'}}>✨</div>
                <p style={{fontSize: '1.2rem', fontWeight: 600, color: 'var(--cj-orange)', lineHeight: 1.6}}>Stories that open up new possibilities across cultures</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section" style={{position: 'relative', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #2d0a4d 100%)'}}>
        <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url("giobottom.png")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25, pointerEvents: 'none'}}></div>
        <div className="container" style={{textAlign: 'center'}}>
          <h2>Giovanni <span className="kdh-purple">Cabrera</span></h2>

          <p style={{fontSize: '1.3rem', fontWeight: 400, opacity: 0.9, lineHeight: 1.8, marginTop: '30px'}}>
            World #9 Lightweight • Actor • Comedian • Singer • Humanitarian
          </p>

          <div style={{marginTop: '50px'}}>
            <a href="mailto:jimmydesmondbrown@gmail.com" className="cta">Start the Conversation</a>
          </div>
        </div>
      </section>
    </>
  );
}
