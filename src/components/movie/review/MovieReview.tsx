import { Review } from '@/interfaces/review.interface';

interface Props {
  review: Review;
}

const MovieReview = ({ review }: Props) => {
  let content = review.content;
  if (content.length > 300) {
    content = `${review.content.slice(0, 300)}...`;
  }

  return (
    <div
      key={review.id}
      className="bg-[#F9FAFB] rounded-2xl space-y-2 shadow-lg p-8"
    >
      <p className="capitalize font-medium text-lg">{review.author}</p>
      <blockquote className="text-gray font-light">
        &quot;{content}&quot;
      </blockquote>
    </div>
  );
};

export default MovieReview;
