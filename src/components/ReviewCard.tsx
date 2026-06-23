import React from 'react';
import { Star } from 'lucide-react';
import type { Review } from '../types';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-bg-pure border border-border-light p-6 md:p-8 flex flex-col justify-between h-full font-sans transition-all duration-300 hover:border-text-muted">
      <div>
        {/* Rating & Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-text-dark">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < review.rating ? 'currentColor' : 'none'}
                strokeWidth={1.5}
                className={i < review.rating ? 'text-text-dark' : 'text-border-subtle'}
              />
            ))}
          </div>
          <span className="text-[11px] uppercase tracking-wider text-text-muted">
            {review.date}
          </span>
        </div>

        {/* Product context if provided */}
        {review.productName && (
          <div className="text-[10px] uppercase tracking-wider font-semibold text-text-muted mb-2">
            Ref: {review.productName}
          </div>
        )}

        {/* Review Title */}
        <h4 className="text-sm font-semibold text-text-dark tracking-wide mb-3">
          “{review.title}”
        </h4>

        {/* Review Content */}
        <p className="text-xs md:text-sm leading-relaxed text-text-secondary">
          {review.content}
        </p>
      </div>

      {/* Author Details */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border-light text-[11px] uppercase tracking-wider">
        <span className="font-semibold text-text-dark">{review.author}</span>
        {review.verified && (
          <span className="text-text-muted flex items-center gap-1 font-light">
            <span className="w-1 h-1 rounded-full bg-green-600 inline-block"></span>
            Verified Ritualist
          </span>
        )}
      </div>
    </div>
  );
};
export default ReviewCard;
