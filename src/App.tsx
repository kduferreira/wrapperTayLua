import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Music, Clock, Camera, Sparkles, Eye, Smile, Star, ChevronDown, ChevronUp } from 'lucide-react';
import foto1 from './imgs/foto1.jpg';
import foto2 from './imgs/foto2.jpg';
import foto3 from './imgs/foto3.jpg';
import foto4 from './imgs/foto4.jpg';
import avatar from './imgs/avatar.jpg';
import qualidade1 from './imgs/qualidade1.jpg';
import qualidade2 from './imgs/qualidade2.jpg';
import qualidade3 from './imgs/qualidade3.jpg';
import qualidade4 from './imgs/qualidade4.jpg';
import qualidade5 from './imgs/qualidade5.jpg';
import qualidade6 from './imgs/qualidade6.jpg';
import qualidade7 from './imgs/qualidade7.jpg';
import qualidade8 from './imgs/qualidade8.jpg';
import qualidade9 from './imgs/qualidade9.jpg';
import albumCover from './imgs/album-cover.jpg';
import elvis from './music/elvis.mp3'
const PHOTOS = [foto1, foto2, foto3, foto4];

const MUSIC = [elvis];
const QUALIDADE_PHOTOS = [
  qualidade1,
  qualidade2,
  qualidade3,
  qualidade4,
  qualidade5,
  qualidade6,
  qualidade7,
  qualidade8,
  qualidade9,
];

const START_DATE = new Date(2024, 3, 10);

function calculateTimeTogether() {
  const now = new Date();
  const diff = now.getTime() - START_DATE.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));
  const seconds = Math.floor(diff / 1000);
  return { days, hours, minutes, seconds };
}

function AnimatedNumber({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setDisplayValue(Math.floor(progress * value));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <span>{displayValue.toLocaleString('pt-BR')}</span>;
}

function CoverSlide({ onEnter }: { onEnter: () => void }) {
  const [time, setTime] = useState(calculateTimeTogether());

  useEffect(() => {
    const interval = setInterval(() => setTime(calculateTimeTogether()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-6 md:left-10 w-48 md:w-64 h-48 md:h-64 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-6 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1000ms' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-80 h-64 md:h-80 bg-orange-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-md w-full px-2">
        <div className="relative mb-6 md:mb-8 float-anim">
          <div className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full overflow-hidden ring-2 md:ring-4 ring-orange-500/50 shadow-2xl shadow-orange-500/20">
            <img
              src={avatar}
              alt="Eduardo & Taylana"
              className="w-full h-full object-cover bg-gradient-to-br from-orange-500 to-pink-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center"><span class="text-4xl md:text-5xl">❤️</span></div>';
              }}
            />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              2024
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl lg:text-7xl font-black mb-2 md:mb-3 bg-gradient-to-r from-orange-400 via-pink-500 to-violet-500 bg-clip-text text-transparent leading-tight">
          Nossa Retrospectiva
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
          Taylana <Heart className="inline w-5 h-5 md:w-6 md:h-6 text-pink-500 animate-pulse" /> Eduardo
        </p>
        <p className="text-white/60 mb-6 md:mb-8 text-sm md:text-base">10 de Abril de 2024</p>

        <div className="mb-8 md:mb-10 bg-white/5 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-5 border border-white/10">
          <p className="text-white/60 text-xs md:text-sm mb-2">Tempo juntos agora</p>
          <div className="flex justify-center gap-2 md:gap-4 text-center">
            <div>
              <span className="text-xl md:text-2xl lg:text-3xl font-bold text-orange-400">{time.days}</span>
              <p className="text-white/40 text-xs">dias</p>
            </div>
            <span className="text-white/20 text-lg md:text-2xl">:</span>
            <div>
              <span className="text-xl md:text-2xl lg:text-3xl font-bold text-pink-400">{time.hours % 24}</span>
              <p className="text-white/40 text-xs">horas</p>
            </div>
            <span className="text-white/20 text-lg md:text-2xl">:</span>
            <div>
              <span className="text-xl md:text-2xl lg:text-3xl font-bold text-violet-400">{time.minutes % 60}</span>
              <p className="text-white/40 text-xs">min</p>
            </div>
            <span className="text-white/20 text-lg md:text-2xl">:</span>
            <div>
              <span className="text-xl md:text-2xl lg:text-3xl font-bold text-green-400">{time.seconds % 60}</span>
              <p className="text-white/40 text-xs">seg</p>
            </div>
          </div>
        </div>

        <button
          onClick={onEnter}
          className="group bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-3 md:py-4 px-8 md:px-10 rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 active:scale-95 text-sm md:text-base"
        >
          <span className="flex items-center gap-2">
            Começar a jornada
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
          </span>
        </button>

        <p className="mt-6 md:mt-8 text-white/40 text-xs md:text-sm animate-bounce flex items-center justify-center gap-1">
          <ChevronDown className="w-4 h-4" /> Deslize para começar
        </p>
      </div>
    </div>
  );
}

function StatsSlide() {
  const time = calculateTimeTogether();

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-[#0a0a0a] to-pink-600/20" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500" />

      <div className="relative z-10 text-center max-w-md w-full px-2">
        <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-400 text-xs md:text-sm font-semibold px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-6 md:mb-8">
          <Clock className="w-3 h-3 md:w-4 md:h-4" />
          ESTATÍSTICAS
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 md:mb-10">
          Tempo <span className="text-orange-400">Juntos</span>
        </h2>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 md:p-8 mb-4 md:mb-6 border border-white/10 shadow-xl">
          <div className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent mb-2">
            <AnimatedNumber value={time.days} />
          </div>
          <p className="text-white/70 text-lg md:text-xl">dias de amor</p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl md:rounded-2xl p-4 md:p-5 border border-green-500/20">
            <div className="text-2xl md:text-3xl font-bold text-green-400 mb-1">
              <AnimatedNumber value={time.hours} />
            </div>
            <p className="text-white/50 text-xs md:text-sm">horas felizes</p>
          </div>
          <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 rounded-xl md:rounded-2xl p-4 md:p-5 border border-pink-500/20">
            <div className="text-2xl md:text-3xl font-bold text-pink-400 mb-1">
              <AnimatedNumber value={time.minutes} />
            </div>
            <p className="text-white/50 text-xs md:text-sm">minutos de alegria</p>
          </div>
        </div>

        <div className="bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4 border border-white/5">
          <p className="text-white/60 text-xs md:text-sm">
            <span className="text-orange-400 font-semibold">Desde 10 de Abril de 2024</span>
            <br />
            O dia em que duas histórias se tornaram uma
          </p>
        </div>
      </div>
    </div>
  );
}

function MusicSlide() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = percent * duration;
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#191414] via-[#121212] to-[#0a0a0a]" />

      <div className="relative z-10 text-center max-w-md w-full px-2">
        <div className="relative mb-6 md:mb-8">
          <div
            className={`w-56 h-56 md:w-72 md:h-72 mx-auto rounded-lg shadow-2xl overflow-hidden ${isPlaying ? 'animate-pulse-slow' : ''}`}
          >
            <img
              src={albumCover}
              alt="Album Cover"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = `
                  <div class="w-full h-full bg-gradient-to-br from-violet-600 to-pink-600 flex items-center justify-center">
                    <svg class="w-24 h-24 text-white/30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                  </div>
                `;
              }}
            />
          </div>
        </div>

        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-1">I Can't Help Falling in Love</h2>
          <p className="text-sm md:text-base text-white/60 font-medium">Elvis Presley</p>
        </div>

        <div className="mb-6 md:mb-8">
          <div
            ref={progressRef}
            className="w-full h-1 bg-white/20 rounded-full cursor-pointer group"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-[#1DB954] rounded-full relative transition-all duration-100"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-xs text-white/50">{formatTime(currentTime)}</span>
            <span className="text-xs text-white/50">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 md:gap-8 mb-6 md:mb-8">
          <button className="text-white/60 hover:text-white transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>

          <button
            onClick={handlePlay}
            className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-xl"
          >
            {isPlaying ? (
              <svg className="w-6 h-6 md:w-7 md:h-7 text-[#191414]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 md:w-7 md:h-7 text-[#191414] ml-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <button className="text-white/60 hover:text-white transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
          <Music className="w-4 h-4 text-[#1DB954]" />
          <span className="text-xs text-[#1DB954] font-semibold uppercase tracking-wider">Nossa Música</span>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10">
          <p className="text-white/80 italic leading-relaxed text-center text-sm md:text-base">
            "Pegue minha mão,<br />
            Tome minha vida inteira também,<br />
            Porque eu não consigo evitar<br />
            Me apaixonar por você."
          </p>
        </div>

        <div className="mt-4 md:mt-6 flex justify-center gap-2 md:gap-3">
          <span className="text-2xl md:text-3xl animate-pulse">&#x1F496;</span>
          <span className="text-2xl md:text-3xl animate-pulse" style={{ animationDelay: '100ms' }}>&#x1F3B5;</span>
          <span className="text-2xl md:text-3xl animate-pulse" style={{ animationDelay: '200ms' }}>&#x1F495;</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={MUSIC[0]}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />
    </div>
  );
}

function PhotosSlide() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => setCurrentIndex((prev) => (prev + 1) % PHOTOS.length);
  const prevPhoto = () => setCurrentIndex((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length);

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 via-[#0a0a0a] to-orange-900/20" />

      <div className="relative z-10 text-center max-w-md w-full">
        <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-400 text-xs md:text-sm font-semibold px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-6 md:mb-8">
          <Camera className="w-3 h-3 md:w-4 md:h-4" />
          MEMÓRIAS
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8">
          Nossos <span className="text-rose-400">Momentos</span>
        </h2>

        <div className="relative mb-4 md:mb-6">
          <div className="aspect-square rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-rose-500/20 ring-2 ring-white/10">
            <img
              src={PHOTOS[currentIndex]}
              alt={`Foto ${currentIndex + 1}`}
              className="w-full h-full object-cover bg-gradient-to-br from-rose-500/50 to-orange-500/50"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.parentElement!.innerHTML = `
                  <div class="w-full h-full bg-gradient-to-br from-rose-500/30 to-orange-500/30 flex items-center justify-center">
                    <div class="text-center text-white/40">
                      <svg class="w-12 md:w-16 h-12 md:h-16 mx-auto mb-2 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                      <p class="text-xs md:text-sm">Adicione ${PHOTOS[currentIndex]}</p>
                    </div>
                  </div>
                `;
              }}
            />
          </div>

          <div className="absolute inset-y-0 left-0 flex items-center">
            <button
              onClick={prevPhoto}
              className="ml-1 md:ml-2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button
              onClick={nextPhoto}
              className="mr-1 md:mr-2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-1 md:gap-2 mb-3 md:mb-4">
          {PHOTOS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-6 md:w-8 bg-gradient-to-r from-rose-500 to-orange-500'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <p className="text-white/40 text-xs md:text-sm">{currentIndex + 1} / {PHOTOS.length}</p>
      </div>
    </div>
  );
}

function LoveMeterSlide() {
  const [meterValue, setMeterValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMeterValue((prev) => prev + 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-[#0a0a0a] to-pink-900/30" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 md:w-[600px] h-64 md:h-[600px] bg-red-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-48 md:w-[400px] h-48 md:h-[400px] bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '500ms' }} />
      </div>

      <div className="relative z-10 text-center max-w-md w-full">
        <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 text-xs md:text-sm font-semibold px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-6 md:mb-8">
          <Heart className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
          MEDIDOR
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
          Quanto eu amo <span className="text-pink-400">Taylana</span>?
        </h2>

        <div className="relative mb-8 md:mb-10">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl">
            <div className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-red-400 via-pink-500 to-red-400 bg-clip-text text-transparent mb-3 md:mb-4">
              {formatNumber(meterValue)}
            </div>

            <div className="relative h-3 md:h-4 bg-white/10 rounded-full overflow-hidden mb-3 md:mb-4">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-500 via-pink-500 to-red-500 rounded-full transition-all duration-100"
                style={{ width: `${Math.min((meterValue % 1000) / 10, 100)}%` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>

            <p className="text-white/60 text-base md:text-lg">e contando...</p>
          </div>

          <Heart className="absolute -top-4 md:-top-6 left-6 md:left-10 w-6 h-6 md:w-8 md:h-8 text-pink-400 opacity-60 float-anim" />
          <Heart className="absolute -bottom-3 md:-bottom-4 right-6 md:right-10 w-5 h-5 md:w-6 md:h-6 text-red-400 opacity-60 float-anim" style={{ animationDelay: '0.5s' }} />
          <Heart className="absolute top-1/2 -right-6 md:-right-8 w-4 h-4 md:w-5 md:h-5 text-pink-300 opacity-40 float-anim" />
        </div>

        <div className="relative">
          <div className="text-5xl md:text-6xl animate-pulse">∞</div>
          <p className="text-white/40 text-xs md:text-sm mt-3 md:mt-4">Não há limite para esse amor</p>
        </div>
      </div>
    </div>
  );
}


function StarScore({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-1 flex-shrink-0">
      {[...Array(count)].map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 md:w-6 md:h-6"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="#f59e0b"
            stroke="#f59e0b"
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}

function WhatILoveSlide() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [animating, setAnimating] = useState(false);
  const touchStartX = useRef(0);

  const attributes = [
    {  title: 'Maravilhosa', photo: QUALIDADE_PHOTOS[0], color: 'from-orange-500 to-pink-500' },
    {  title: 'Carinhosa', photo: QUALIDADE_PHOTOS[1], color: 'from-pink-500 to-rose-400' },
    {  title: 'Inteligente', photo: QUALIDADE_PHOTOS[2], color: 'from-violet-500 to-pink-500' },
    {  title: 'Companheira', photo: QUALIDADE_PHOTOS[3], color: 'from-teal-400 to-cyan-500' },
    {  title: 'Cheirosa', photo: QUALIDADE_PHOTOS[4], color: 'from-rose-400 to-pink-600' },
    {  title: 'Gationa', photo: QUALIDADE_PHOTOS[5], color: 'from-amber-400 to-orange-500' },
    {  title: 'Totosa', photo: QUALIDADE_PHOTOS[6], color: 'from-fuchsia-500 to-pink-500' },
    {  title: 'Cuidadosa com Edu', photo: QUALIDADE_PHOTOS[7], color: 'from-sky-400 to-blue-500' },
    {  title: 'Temente ao Senhor', photo: QUALIDADE_PHOTOS[8], color: 'from-orange-400 to-amber-500' },
  ];

  const navigate = (dir: 'left' | 'right') => {
    if (animating) return;
    const next = dir === 'right'
      ? (current + 1) % attributes.length
      : (current - 1 + attributes.length) % attributes.length;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(next);
      setAnimating(false);
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) navigate(diff > 0 ? 'right' : 'left');
  };

  const attr = attributes[current];

  return (
    <div className="h-full flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0d1117]" />
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col h-full py-8 px-4">
        <div className="text-center flex-shrink-0 mb-5">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/30 to-pink-500/30 border border-orange-500/40 text-orange-300 text-xs font-bold tracking-widest px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-3 h-3" />
            QUALIDADES
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
            O que mais amo
            <br />
            na <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Taylana</span>
          </h2>
        </div>

        <div
          className="flex-1 flex flex-col min-h-0"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex-1 relative rounded-3xl overflow-hidden shadow-2xl min-h-0"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating
                ? `translateX(${direction === 'right' ? '-30px' : '30px'})`
                : 'translateX(0)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            <img
              key={current}
              src={attr.photo}
              alt={attr.title}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.style.display = 'none';
                const fallback = t.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-br ${attr.color} opacity-60 hidden items-center justify-center`}
              style={{ display: 'none' }}
            >
              <span className="text-8xl">{attr.icon}</span>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-4xl mb-2 block">{attr.icon}</span>
                  <h3 className="text-white font-black text-2xl md:text-3xl leading-tight mb-2">
                    {attr.title}
                  </h3>
                  <StarScore />
                </div>
                <div className="text-right text-white/40 text-sm font-medium pb-1">
                  {current + 1} / {attributes.length}
                </div>
              </div>

              <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${attr.color}`} />
            </div>

            <button
              onClick={() => navigate('left')}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('right')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center gap-1.5 mt-4 pb-2 flex-shrink-0">
            {attributes.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > current ? 'right' : 'left'); setCurrent(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? `w-5 bg-gradient-to-r ${attr.color}`
                    : 'w-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FavoritesSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-[#0a0a0a] to-pink-900/20" />

      <div className="relative z-10 text-center max-w-md w-full">
        <div className="inline-flex items-center gap-2 bg-cyan-500/20 text-cyan-400 text-xs md:text-sm font-semibold px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-6 md:mb-8">
          <Heart className="w-3 h-3 md:w-4 md:h-4" />
          FAVORITOS
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 md:mb-10">
          O que me <span className="text-pink-400">encanta</span>
        </h2>

        <div className="grid grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-10">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
              <Eye className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">Seus Olhos</h3>
            <p className="text-white/50 text-xs md:text-sm">Que brilham como estrelas no céu</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-6 border border-white/10 hover:border-pink-500/30 transition-all duration-300 group">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
              <Smile className="w-8 h-8 md:w-10 md:h-10 text-pink-400" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">Seu Sorriso</h3>
            <p className="text-white/50 text-xs md:text-sm">Ilumina todos os meus dias</p>
          </div>
        </div>

        <div className="relative">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/30 animate-pulse">
            <Heart className="w-10 h-10 md:w-12 md:h-12 text-white fill-white" />
          </div>
          <div className="absolute inset-0 rounded-full bg-pink-500/50 blur-xl -z-10 animate-pulse" />
        </div>

        <p className="mt-4 md:mt-6 text-white/60 text-xs md:text-sm">Cada detalhe seu é perfeito para mim</p>
      </div>
    </div>
  );
}

function LoveLetterSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900/30 via-[#0a0a0a] to-pink-900/30" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 md:w-[600px] h-64 md:h-[600px] bg-rose-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-48 md:w-[400px] h-48 md:h-[400px] bg-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '500ms' }} />
      </div>

      <div className="relative z-10 text-center max-w-md w-full">
        <div className="inline-flex items-center gap-2 bg-rose-500/20 text-rose-400 text-xs md:text-sm font-semibold px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6">
          <Heart className="w-3 h-3 md:w-4 md:h-4" />
          CARTA DE AMOR
        </div>

        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8">
          Minha <span className="text-rose-400">Declaração</span>
        </h2>

        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl md:rounded-3xl p-5 md:p-8 border border-white/20 shadow-2xl relative">
          <div className="absolute top-3 md:top-4 right-3 md:right-4 text-2xl md:text-4xl opacity-30">💌</div>

          <div className="text-white/90 text-xs md:text-sm lg:text-base leading-relaxed text-left space-y-3 md:space-y-4">
            <p className="text-center text-white/30 text-xs md:text-sm">
//              Amor, você é a razão do meu sorriso e a inspiração por trás de cada palavra que escrevo. Neste dia dos namorados, quero que saiba o quanto você é amado e valorizado. Sua presença ilumina minha vida de maneiras que palavras não conseguem expressar, sei que somos casados, mas voce é minha eterna namorada, lembro do dia que fiz uma carta de 4 folhas para voce pedindo em namoro, com medo de voce nao aceitar, acho que foi a maior coisa que ja fiz por uma pessoa, e desde de la ja estamos a 2 anos juntos e somando, e cada dia eu te amo, falo que te amo, demonstro que te amo, penso em como te amo, e sou muito grato em ter voce em minha vida, sou abençoado por ter voce em minha vida, o Senhor foi bom comigo te amo minha lua.
            </p>
          </div>

          <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/10 text-right">
            <p className="text-rose-400 font-semibold italic text-sm md:text-base">Com todo meu amor,</p>
            <p className="text-white font-bold text-base md:text-lg">Eduardo</p>
          </div>
        </div>

        <div className="mt-6 md:mt-8 flex justify-center gap-3 md:gap-4">
          <Heart className="w-6 h-6 md:w-8 md:h-8 text-rose-500 fill-rose-500 animate-pulse" />
          <Heart className="w-8 h-8 md:w-10 md:h-10 text-pink-500 fill-pink-500 animate-pulse" style={{ animationDelay: '300ms' }} />
          <Heart className="w-6 h-6 md:w-8 md:h-8 text-rose-500 fill-rose-500 animate-pulse" style={{ animationDelay: '500ms' }} />
        </div>
      </div>
    </div>
  );
}

function FinalSlide() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a]" />

      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-orange-400/40 to-pink-400/40 float-anim"
            style={{
              left: `${(i * 37 + 13) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
              animationDelay: `${(i * 0.15) % 2}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-orange-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '500ms' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-80 h-48 md:h-80 bg-violet-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1000ms' }} />
      </div>

      <div className="relative z-10 text-center max-w-md w-full">
        <div className="relative mb-6 md:mb-10">
          <div className="w-24 h-24 md:w-36 md:h-36 mx-auto relative">
            <div className="absolute inset-0 rounded-full border-2 md:border-4 border-orange-500/40 animate-pulse" />
            <div className="absolute inset-2 md:inset-4 rounded-full border-2 md:border-4 border-pink-500/40 animate-pulse" style={{ animationDelay: '300ms' }} />
            <div className="absolute inset-4 md:inset-8 rounded-full border-2 md:border-4 border-violet-500/40 animate-pulse" style={{ animationDelay: '700ms' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-8 h-8 md:w-12 md:h-12 text-pink-400 fill-pink-400 float-anim" />
            </div>
          </div>
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 md:mb-4">
          Para sempre
        </h2>
        <p className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-violet-500 bg-clip-text text-transparent mb-4 md:mb-6">
          Eduardo & Taylana
        </p>

        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg rounded-full px-4 md:px-6 py-2 md:py-3 mb-6 md:mb-8">
          <Heart className="w-4 h-4 md:w-5 md:h-5 text-rose-400 fill-rose-400" />
          <span className="text-white/80 font-semibold text-sm md:text-base">10 de Abril de 2024</span>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/10 mb-6 md:mb-8 max-w-sm mx-auto">
          <p className="text-white/80 leading-relaxed text-sm md:text-base">
            "Deus nos uniu para algo especial. Cada dia ao seu lado é uma bênção.
            <br /><br />
            <span className="text-orange-400 font-semibold">Eu te amo mais que palavras podem expressar.</span>"
          </p>
        </div>

        <div className="flex justify-center items-center gap-2 md:gap-4 mb-6 md:mb-8">
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30 float-anim">
            <Star className="w-4 h-4 md:w-6 md:h-6 text-white fill-white" />
          </div>
          <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/30 float-anim" style={{ animationDelay: '0.3s' }}>
            <Heart className="w-5 h-5 md:w-8 md:h-8 text-white fill-white" />
          </div>
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center shadow-lg shadow-violet-500/30 float-anim" style={{ animationDelay: '0.6s' }}>
            <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-white fill-white" />
          </div>
        </div>

        <div className="mt-6 md:mt-8">
          <div className="w-16 md:w-20 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 mx-auto rounded-full mb-3 md:mb-4" />
          <p className="text-white/40 text-xs md:text-sm italic">Nossa história continua...</p>
          <p className="text-white/20 text-xs mt-3 md:mt-4">Com todo amor, Eduardo</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(-1);
  const [slideDirection, setSlideDirection] = useState<'down' | 'up'>('down');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);

  const slides = [
    StatsSlide,
    MusicSlide,
    PhotosSlide,
    LoveMeterSlide,
    WhatILoveSlide,
    FavoritesSlide,
    LoveLetterSlide,
    FinalSlide,
  ];

  const goToSlide = (index: number, direction: 'down' | 'up' = 'down') => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSlideDirection(direction);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1, 'down');
    }
  };

  const prevSlide = () => {
    if (currentSlide > -1) {
      goToSlide(currentSlide - 1, 'up');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) nextSlide();
        else prevSlide();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.changedTouches[0].screenY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].screenY;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  const progressPercentage = currentSlide === -1 ? 0 : ((currentSlide + 1) / slides.length) * 100;

  return (
    <div
      ref={containerRef}
      className="h-screen w-screen overflow-hidden bg-[#0a0a0a] relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {currentSlide >= 0 && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-white/10 z-50">
          <div
            className="h-full bg-gradient-to-r from-orange-500 via-pink-500 to-violet-500 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      )}

      <div className="h-full w-full relative">
        <div
          key={currentSlide}
          className={`absolute inset-0 ${slideDirection === 'down' ? 'slide-in-down' : 'slide-in-up'}`}
        >
          {currentSlide === -1 ? (
            <CoverSlide onEnter={() => goToSlide(0, 'down')} />
          ) : (
            (() => {
              const SlideComponent = slides[currentSlide];
              return <SlideComponent />;
            })()
          )}
        </div>

        {currentSlide > -1 && (
          <button
            onClick={prevSlide}
            className="fixed top-2 md:top-4 left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-40"
          >
            <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        )}
        {currentSlide < slides.length - 1 && (
          <button
            onClick={nextSlide}
            className="fixed bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 z-40"
          >
            <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        )}

        <div className="fixed right-2 md:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 md:gap-2 z-40">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index, index > currentSlide ? 'down' : 'up')}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-2 h-6 md:h-8 bg-gradient-to-b from-orange-500 to-pink-500'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
