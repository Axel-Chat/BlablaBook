import React, { useState } from "react";
import { RatingDistribution } from "./RatingDistribution";
import { AverageRating } from "./AverageRating";
import { ReviewHighlight } from "./ReviewHighlight";
import { ReviewActions } from "./ReviewActions";
import { ReviewModal } from "./ReviewModal";

export const ReviewSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-24 relative font-body">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-title text-4xl text-center mb-12 text-black">
          Les notes et avis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <RatingDistribution />
          </div>

          <div className="flex items-center justify-center">
            <AverageRating value={4.3} subtitle="46 Ratings" />
          </div>

          <div className="flex items-center justify-center">
            <ReviewActions onClick={() => setIsModalOpen(true)} />
          </div>
        </div>

        <div className="border-b border-gray-200 mt-16 pb-8">
          <ReviewHighlight
            username="john.doe"
            date="Nov 01, 2023"
            rating={5}
            review="I recently had the opportunity to explore Pagedone's UI design system, and it left a lasting impression on my workflow. The system seamlessly blends user-friendly features with a robust set of design components, making it a go-to for creating visually stunning and consistent interfaces."
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-8">
          <p className="text-lg text-black">46 reviews</p>
        </div>
      </div>
      
      {/* Modale */}
      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
