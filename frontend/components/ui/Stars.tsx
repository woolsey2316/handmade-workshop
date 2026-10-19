export const Stars = ({ rating = 0 }: { rating?: number }) => {
  const filled = Math.floor(rating);
  const hasHalfRating = rating % 1 !== 0;
  return (
    <div className="flex items-center justify-center gap-0.5 text-[18px] text-[#f0b429]">
      {Array.from({ length: filled + (hasHalfRating ? 1 : 0) }).map((_, i) => (
        i < filled ?
        <svg
        key={i}
        className="w-4 h-4"
        viewBox="0 0 24 24"
        xmlns="http://w3.org"
        >
          <path stroke="#f0b429" fill="#f0b429" strokeWidth="1" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      :
        <svg
        key={i}
        className="w-4 h-4"
        viewBox="0 0 24 24"
        xmlns="http://w3.org"
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#f0b429" />
              <stop offset="50%" stopColor="#d1d5db" /> {/* gray-300 */}
            </linearGradient>
          </defs>
          <path
            fill="url(#half)"
            stroke="#f0b429"
            strokeWidth="1"
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      ))}
      <span className="sr-only">Rated {rating} out of 5</span>
    </div>
  );
};
